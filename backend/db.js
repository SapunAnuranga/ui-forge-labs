import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'data', 'db.json');

const defaultData = {
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    // default password "admin123" (hashed on first run)
    passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10),
  },
  categories: [
    { id: 1, name: 'Dashboard Kits' },
    { id: 2, name: 'Landing Pages' },
    { id: 3, name: 'E-Commerce' },
    { id: 4, name: 'Portfolio' },
    { id: 5, name: 'SaaS' },
    { id: 6, name: 'Blog' },
  ],
  templates: [
    {
      id: 1,
      title: 'Nova Portfolio',
      category: 'Portfolio',
      price: 39,
      description: 'A minimalist dark portfolio with bold typography and silky motion.',
      icon: '🎨',
      downloads: 1240,
      rating: 4.9,
      active: true,
      tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Atlas SaaS',
      category: 'SaaS',
      price: 49,
      description: 'Modern SaaS landing with pricing, testimonials and feature grid.',
      icon: '🚀',
      downloads: 890,
      rating: 4.8,
      active: true,
      tags: ['React', 'Vite', 'Tailwind', 'TypeScript'],
      date: '2024-01-20',
    },
    {
      id: 3,
      title: 'Lumen Shop',
      category: 'E-Commerce',
      price: 59,
      description: 'Premium e-commerce storefront with product detail and cart.',
      icon: '🛒',
      downloads: 2100,
      rating: 4.9,
      active: true,
      tags: ['React', 'Vite', 'Tailwind', 'Zustand'],
      date: '2024-02-01',
    },
    {
      id: 4,
      title: 'Stellar Dashboard',
      category: 'Dashboard Kits',
      price: 79,
      description: 'Analytics dashboard with charts, tables and dark mode.',
      icon: '📊',
      downloads: 567,
      rating: 4.7,
      active: false,
      tags: ['React', 'Vite', 'Tailwind', 'Recharts'],
      date: '2024-02-10',
    },
    {
      id: 5,
      title: 'Launchpad Landing',
      category: 'Landing Pages',
      price: 29,
      description: 'Modern startup landing page with animations and forms.',
      icon: '📦',
      downloads: 3450,
      rating: 4.9,
      active: true,
      tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
      date: '2024-02-15',
    },
    {
      id: 6,
      title: 'Medium Blog',
      category: 'Blog',
      price: 34,
      description: 'Clean blog template with MDX support and reading list.',
      icon: '📝',
      downloads: 789,
      rating: 4.6,
      active: false,
      tags: ['React', 'Vite', 'Tailwind', 'MDX'],
      date: '2024-02-20',
    },
  ],
  messages: [],
  orders: [],
};

function ensureDb() {
  if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2));
  }
}

export function readDb() {
  ensureDb();
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw);
}

export function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}
