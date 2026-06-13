import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import { connectDB } from './db.js';
import { Admin, Category, Template, Message, Order } from './models/index.js';

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

/* ---------------------------- AUTH MIDDLEWARE ---------------------------- */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Wrap async route handlers so errors are caught automatically
const wrap = (fn) => (req, res) => fn(req, res).catch((err) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

/* -------------------------------- AUTH API -------------------------------- */

app.post('/api/auth/login', wrap(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ error: 'Invalid username or password' });

  const ok = bcrypt.compareSync(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid username or password' });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, username });
}));

app.post('/api/auth/change-credentials', requireAuth, wrap(async (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;

  const admin = await Admin.findOne({ username: req.admin.username });
  if (!admin) return res.status(404).json({ error: 'Admin not found' });

  const ok = bcrypt.compareSync(currentPassword || '', admin.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Current password is incorrect' });

  if (newUsername && newUsername.trim()) admin.username = newUsername.trim();
  if (newPassword && newPassword.trim()) admin.passwordHash = bcrypt.hashSync(newPassword.trim(), 10);

  await admin.save();
  res.json({ success: true, username: admin.username });
}));

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username });
});

/* ----------------------------- CATEGORIES API ----------------------------- */

app.get('/api/categories', wrap(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
}));

app.post('/api/categories', requireAuth, wrap(async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  const exists = await Category.findOne({ name: new RegExp(`^${name.trim()}$`, 'i') });
  if (exists) return res.status(409).json({ error: 'Category already exists' });

  const newCat = await Category.create({ name: name.trim() });
  res.status(201).json(newCat);
}));

app.delete('/api/categories/:id', requireAuth, wrap(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

/* ----------------------------- TEMPLATES API ------------------------------ */

app.get('/api/templates', wrap(async (req, res) => {
  const templates = await Template.find({ active: true }).sort({ date: -1 });
  res.json(templates);
}));

app.get('/api/admin/templates', requireAuth, wrap(async (req, res) => {
  const templates = await Template.find().sort({ date: -1 });
  res.json(templates);
}));

app.get('/api/templates/:id', wrap(async (req, res) => {
  const tpl = await Template.findById(req.params.id);
  if (!tpl) return res.status(404).json({ error: 'Template not found' });
  res.json(tpl);
}));

app.post('/api/admin/templates', requireAuth, wrap(async (req, res) => {
  const body = req.body;
  if (!body.title || !body.description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  const newTpl = await Template.create({
    title: body.title.trim(),
    category: body.category || 'Uncategorized',
    price: parseInt(body.price) || 0,
    description: body.description.trim(),
    icon: body.icon || '🌐',
    tags: Array.isArray(body.tags) ? body.tags : [],
    active: body.active ?? true,
    rating: 5.0,
    downloads: 0,
  });
  res.status(201).json(newTpl);
}));

app.put('/api/admin/templates/:id', requireAuth, wrap(async (req, res) => {
  const updated = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Template not found' });
  res.json(updated);
}));

app.delete('/api/admin/templates/:id', requireAuth, wrap(async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

/* ------------------------------ MESSAGES API ------------------------------ */

app.post('/api/messages', wrap(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  const newMsg = await Message.create({
    name: name.trim(),
    email: email.trim(),
    subject: (subject || '').trim(),
    message: message.trim(),
  });
  res.status(201).json(newMsg);
}));

app.get('/api/admin/messages', requireAuth, wrap(async (req, res) => {
  const messages = await Message.find().sort({ date: -1 });
  res.json(messages);
}));

app.delete('/api/admin/messages/:id', requireAuth, wrap(async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

/* ------------------------------ PAYMENT API -------------------------------- */

app.post('/api/payment/create-checkout-session', wrap(async (req, res) => {
  const { templateId } = req.body;
  const tpl = await Template.findById(templateId);
  if (!tpl) return res.status(404).json({ error: 'Template not found' });

  if (!stripe) {
    return res.status(500).json({
      error: 'Stripe is not configured. Add STRIPE_SECRET_KEY in backend/.env',
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: tpl.title, description: tpl.description },
          unit_amount: tpl.price * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${FRONTEND_URL}/template/${tpl._id}?payment=success`,
    cancel_url: `${FRONTEND_URL}/template/${tpl._id}?payment=cancelled`,
  });

  await Order.create({
    templateId: tpl._id,
    title: tpl.title,
    price: tpl.price,
    sessionId: session.id,
    status: 'pending',
  });

  res.json({ url: session.url });
}));

app.get('/api/admin/orders', requireAuth, wrap(async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
}));

/* --------------------------------------------------------------------------- */

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ LumenUI backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to database:', err.message);
    process.exit(1);
  });