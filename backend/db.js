import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin, Category, Template } from './models/index.js';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set in backend/.env');
  }
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');
  await seedDefaults();
}

async function seedDefaults() {
  // Seed admin account
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    await Admin.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10),
    });
    console.log('Seeded default admin account (admin / admin123)');
  }

  // Seed categories
  const catCount = await Category.countDocuments();
  if (catCount === 0) {
    await Category.insertMany([
      { name: 'Dashboard Kits' },
      { name: 'Landing Pages' },
      { name: 'E-Commerce' },
      { name: 'Portfolio' },
      { name: 'SaaS' },
      { name: 'Blog' },
    ]);
    console.log('Seeded default categories');
  }

  // Seed templates
  const tplCount = await Template.countDocuments();
  if (tplCount === 0) {
    await Template.insertMany([
      {
        title: 'Nova Portfolio',
        category: 'Portfolio',
        price: 39,
        description: 'A minimalist dark portfolio with bold typography and silky motion.',
        icon: '🎨',
        downloads: 1240,
        rating: 4.9,
        active: true,
        tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
      },
      {
        title: 'Atlas SaaS',
        category: 'SaaS',
        price: 49,
        description: 'Modern SaaS landing with pricing, testimonials and feature grid.',
        icon: '🚀',
        downloads: 890,
        rating: 4.8,
        active: true,
        tags: ['React', 'Vite', 'Tailwind', 'TypeScript'],
      },
      {
        title: 'Lumen Shop',
        category: 'E-Commerce',
        price: 59,
        description: 'Premium e-commerce storefront with product detail and cart.',
        icon: '🛒',
        downloads: 2100,
        rating: 4.9,
        active: true,
        tags: ['React', 'Vite', 'Tailwind', 'Zustand'],
      },
      {
        title: 'Stellar Dashboard',
        category: 'Dashboard Kits',
        price: 79,
        description: 'Analytics dashboard with charts, tables and dark mode.',
        icon: '📊',
        downloads: 567,
        rating: 4.7,
        active: false,
        tags: ['React', 'Vite', 'Tailwind', 'Recharts'],
      },
      {
        title: 'Launchpad Landing',
        category: 'Landing Pages',
        price: 29,
        description: 'Modern startup landing page with animations and forms.',
        icon: '📦',
        downloads: 3450,
        rating: 4.9,
        active: true,
        tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
      },
      {
        title: 'Medium Blog',
        category: 'Blog',
        price: 34,
        description: 'Clean blog template with MDX support and reading list.',
        icon: '📝',
        downloads: 789,
        rating: 4.6,
        active: false,
        tags: ['React', 'Vite', 'Tailwind', 'MDX'],
      },
    ]);
    console.log('Seeded default templates');
  }
}