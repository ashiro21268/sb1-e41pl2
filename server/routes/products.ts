import express from 'express';
import { randomUUID } from 'crypto';
import db from '../db';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products WHERE user_id = ?')
      .all(req.user.id);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticateToken, (req, res) => {
  try {
    const { name, price, description, supplier } = req.body;
    const productId = randomUUID();

    db.prepare(`
      INSERT INTO products (id, name, price, description, supplier, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(productId, name, price, description, supplier, req.user.id);

    const product = db.prepare('SELECT * FROM products WHERE id = ?')
      .get(productId);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

export default router;