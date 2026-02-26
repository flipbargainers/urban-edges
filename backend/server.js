const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'Air Max Velocity', category: 'sneakers', price: 189, originalPrice: 229, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop'], sizes: ['US 7', 'US 8', 'US 9', 'US 10'], colors: ['black', 'white'], rating: 4.8, description: 'Engineered for speed.', collection: 'summer' },
  { id: 2, name: 'Street Runner Pro', category: 'sneakers', price: 159, originalPrice: 199, images: ['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop'], sizes: ['US 8', 'US 9'], colors: ['white'], rating: 4.6, description: 'Lightweight and durable.', collection: 'night' },
  { id: 3, name: 'Urban Bomber Jacket', category: 'apparel', price: 249, originalPrice: 299, images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop'], sizes: ['M', 'L', 'XL'], colors: ['black'], rating: 4.9, description: 'Premium bomber.', collection: 'heritage' },
  { id: 4, name: 'Tech Fleece Hoodie', category: 'apparel', price: 129, originalPrice: 159, images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop'], sizes: ['S', 'M', 'L'], colors: ['black'], rating: 4.7, description: 'Ultra-soft fleece.', collection: 'tech' },
  { id: 5, name: 'Classic Combat Boots', category: 'accessories', price: 179, originalPrice: 219, images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop'], sizes: ['US 9', 'US 10'], colors: ['black'], rating: 4.5, description: 'Rugged boots.', collection: 'heritage' },
  { id: 6, name: 'Performance Runners', category: 'sneakers', price: 199, originalPrice: 249, images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop'], sizes: ['US 9', 'US 10'], colors: ['white'], rating: 4.8, description: 'High performance.', collection: 'night' },
  { id: 7, name: 'Oversized Street Tee', category: 'apparel', price: 59, originalPrice: 79, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'], sizes: ['M', 'L'], colors: ['white'], rating: 4.4, description: 'Relaxed fit.', collection: 'summer' },
  { id: 8, name: 'Premium Watch', category: 'accessories', price: 299, originalPrice: 399, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'], sizes: ['One Size'], colors: ['black'], rating: 4.9, description: 'Minimalist timepiece.', collection: 'tech' }
];

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop' },
  { src: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop' },
  { src: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=400&fit=crop' }
];

const reviews = [
  { id: 1, name: 'Alex M.', avatar: 'https://i.pravatar.cc/100?img=1', rating: 5, text: 'Love my new sneakers!', date: '2 days ago' },
  { id: 2, name: 'Sarah K.', avatar: 'https://i.pravatar.cc/100?img=5', rating: 5, text: 'Bomber jacket exceeded expectations.', date: '1 week ago' },
  { id: 3, name: 'Mike T.', avatar: 'https://i.pravatar.cc/100?img=3', rating: 4, text: 'Solid quality and fast shipping.', date: '2 weeks ago' }
];

const subscribers = [];
const sessions = [];
const orders = [];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'urban-edges-backend' });
});

app.get('/api/bootstrap', (_req, res) => {
  res.json({ products, heroImages, reviews });
});

app.get('/api/products', (_req, res) => {
  res.json(products);
});

app.get('/api/reviews', (_req, res) => {
  res.json(reviews);
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body || {};
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  const token = `sess_${Date.now()}`;
  sessions.push({ token, email, createdAt: new Date().toISOString() });
  return res.json({ token, email, message: 'Login successful.' });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body || {};
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  const alreadyExists = subscribers.includes(email.toLowerCase());
  if (!alreadyExists) {
    subscribers.push(email.toLowerCase());
  }

  return res.json({ ok: true, subscribed: !alreadyExists });
});

app.post('/api/orders', (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order items are required.' });
  }

  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const order = {
    id: `ord_${Date.now()}`,
    items,
    total,
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  return res.status(201).json({ ok: true, order });
});

app.use(express.static(path.resolve(__dirname, '../frontend')));
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

