// server.js - Backend implementation
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Mock database
let users = [];
let items = [
  { id: 1, name: "Wireless Headphones", price: 99.99, category: "electronics", image: "https://via.placeholder.com/300x200?text=Headphones" },
  { id: 2, name: "Running Shoes", price: 79.99, category: "sports", image: "https://via.placeholder.com/300x200?text=Shoes" },
  { id: 3, name: "Coffee Maker", price: 49.99, category: "home", image: "https://via.placeholder.com/300x200?text=Coffee+Maker" },
  { id: 4, name: "Smart Watch", price: 199.99, category: "electronics", image: "https://via.placeholder.com/300x200?text=Smart+Watch" },
  { id: 5, name: "Yoga Mat", price: 29.99, category: "sports", image: "https://via.placeholder.com/300x200?text=Yoga+Mat" },
  { id: 6, name: "Desk Lamp", price: 39.99, category: "home", image: "https://via.placeholder.com/300x200?text=Lamp" }
];

const SECRET_KEY = 'your-secret-key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth APIs
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, email, password: hashedPassword, name };
    users.push(user);
    
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch {
    res.status(500).send();
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }
  
  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// Items CRUD APIs
app.get('/api/items', (req, res) => {
  let filteredItems = [...items];
  
  // Filter by category
  if (req.query.category) {
    filteredItems = filteredItems.filter(item => item.category === req.query.category);
  }
  
  // Filter by price range
  if (req.query.minPrice) {
    filteredItems = filteredItems.filter(item => item.price >= parseFloat(req.query.minPrice));
  }
  
  if (req.query.maxPrice) {
    filteredItems = filteredItems.filter(item => item.price <= parseFloat(req.query.maxPrice));
  }
  
  res.json(filteredItems);
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Add to cart API (protected)
app.post('/api/cart', authenticateToken, (req, res) => {
  // In a real app, we would save to database
  // For this demo, we'll just return success
  res.json({ message: 'Item added to cart' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});