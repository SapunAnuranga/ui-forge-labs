import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import { readDb, writeDb } from './db.js';

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

/* -------------------------------- AUTH API -------------------------------- */

// Admin login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDb();

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (username !== db.admin.username) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const ok = bcrypt.compareSync(password, db.admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, username });
});

// Change admin username/password (requires current password)
app.post('/api/auth/change-credentials', requireAuth, (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;
  const db = readDb();

  const ok = bcrypt.compareSync(currentPassword || '', db.admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  if (newUsername && newUsername.trim()) {
    db.admin.username = newUsername.trim();
  }
  if (newPassword && newPassword.trim()) {
    db.admin.passwordHash = bcrypt.hashSync(newPassword.trim(), 10);
  }

  writeDb(db);
  res.json({ success: true, username: db.admin.username });
});

// Verify token (used by frontend on app load)
app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ username: req.admin.username });
});

/* ----------------------------- CATEGORIES API ----------------------------- */

app.get('/api/categories', (req, res) => {
  const db = readDb();
  res.json(db.categories);
});

app.post('/api/categories', requireAuth, (req, res) => {
  const db = readDb();
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Category name is required' });
  }
  const exists = db.categories.some(
    (c) => c.name.toLowerCase() === name.trim().toLowerCase()
  );
  if (exists) {
    return res.status(409).json({ error: 'Category already exists' });
  }
  const newCat = { id: Date.now(), name: name.trim() };
  db.categories.push(newCat);
  writeDb(db);
  res.status(201).json(newCat);
});

app.delete('/api/categories/:id', requireAuth, (req, res) => {
  const db = readDb();
  const id = Number(req.params.id);
  db.categories = db.categories.filter((c) => c.id !== id);
  writeDb(db);
  res.json({ success: true });
});

/* ----------------------------- TEMPLATES API ------------------------------ */

// Public: only active templates
app.get('/api/templates', (req, res) => {
  const db = readDb();
  res.json(db.templates.filter((t) => t.active));
});

// Admin: all templates (active + inactive)
app.get('/api/admin/templates', requireAuth, (req, res) => {
  const db = readDb();
  res.json(db.templates);
});

// Public: single template by id
app.get('/api/templates/:id', (req, res) => {
  const db = readDb();
  const tpl = db.templates.find((t) => t.id === Number(req.params.id));
  if (!tpl) return res.status(404).json({ error: 'Template not found' });
  res.json(tpl);
});

// Admin: create
app.post('/api/admin/templates', requireAuth, (req, res) => {
  const db = readDb();
  const body = req.body;
  if (!body.title || !body.description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  const newTpl = {
    id: Date.now(),
    title: body.title.trim(),
    category: body.category || 'Uncategorized',
    price: parseInt(body.price) || 0,
    description: body.description.trim(),
    icon: body.icon || '🌐',
    tags: Array.isArray(body.tags) ? body.tags : [],
    active: body.active ?? true,
    rating: 5.0,
    downloads: 0,
    date: new Date().toISOString(),
  };
  db.templates.push(newTpl);
  writeDb(db);
  res.status(201).json(newTpl);
});

// Admin: update
app.put('/api/admin/templates/:id', requireAuth, (req, res) => {
  const db = readDb();
  const id = Number(req.params.id);
  const idx = db.templates.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Template not found' });

  db.templates[idx] = { ...db.templates[idx], ...req.body, id };
  writeDb(db);
  res.json(db.templates[idx]);
});

// Admin: delete
app.delete('/api/admin/templates/:id', requireAuth, (req, res) => {
  const db = readDb();
  const id = Number(req.params.id);
  db.templates = db.templates.filter((t) => t.id !== id);
  writeDb(db);
  res.json({ success: true });
});

/* ------------------------------ MESSAGES API ------------------------------ */

// Public: submit contact message
app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  const db = readDb();
  const newMsg = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    subject: (subject || '').trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  };
  db.messages.push(newMsg);
  writeDb(db);
  res.status(201).json(newMsg);
});

// Admin: get all messages
app.get('/api/admin/messages', requireAuth, (req, res) => {
  const db = readDb();
  res.json(db.messages);
});

// Admin: delete a message
app.delete('/api/admin/messages/:id', requireAuth, (req, res) => {
  const db = readDb();
  const id = Number(req.params.id);
  db.messages = db.messages.filter((m) => m.id !== id);
  writeDb(db);
  res.json({ success: true });
});

/* ------------------------------ PAYMENT API -------------------------------- */

// Create a Stripe Checkout session for a template purchase
app.post('/api/payment/create-checkout-session', async (req, res) => {
  const { templateId } = req.body;
  const db = readDb();
  const tpl = db.templates.find((t) => t.id === Number(templateId));
  if (!tpl) return res.status(404).json({ error: 'Template not found' });

  if (!stripe) {
    return res.status(500).json({
      error: 'Stripe is not configured. Add STRIPE_SECRET_KEY in backend/.env',
    });
  }

  try {
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
      success_url: `${FRONTEND_URL}/template/${tpl.id}?payment=success`,
      cancel_url: `${FRONTEND_URL}/template/${tpl.id}?payment=cancelled`,
    });

    db.orders.push({
      id: Date.now(),
      templateId: tpl.id,
      title: tpl.title,
      price: tpl.price,
      sessionId: session.id,
      status: 'pending',
      date: new Date().toISOString(),
    });
    writeDb(db);

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: list orders
app.get('/api/admin/orders', requireAuth, (req, res) => {
  const db = readDb();
  res.json(db.orders);
});

/* --------------------------------------------------------------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ LumenUI backend running on http://localhost:${PORT}`);
});
