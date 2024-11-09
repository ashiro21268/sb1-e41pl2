import express from 'express';
import { randomUUID } from 'crypto';
import db from '../db';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT o.*, GROUP_CONCAT(p.id) as product_ids
      FROM orders o
      LEFT JOIN order_products op ON o.id = op.order_id
      LEFT JOIN products p ON op.product_id = p.id
      WHERE o.user_id = ?
      GROUP BY o.id
    `).all(req.user.id);

    const ordersWithProducts = orders.map(order => ({
      ...order,
      products: order.product_ids ? 
        db.prepare('SELECT * FROM products WHERE id IN (?)')
          .all(order.product_ids.split(',')) : 
        []
    }));

    res.json(ordersWithProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticateToken, (req, res) => {
  try {
    const { productIds, customerDetails } = req.body;
    const orderId = randomUUID();

    db.prepare(`
      INSERT INTO orders (id, user_id, customer_details)
      VALUES (?, ?, ?)
    `).run(orderId, req.user.id, JSON.stringify(customerDetails));

    const insertOrderProduct = db.prepare(`
      INSERT INTO order_products (order_id, product_id)
      VALUES (?, ?)
    `);

    productIds.forEach((productId: string) => {
      insertOrderProduct.run(orderId, productId);
    });

    const order = db.prepare('SELECT * FROM orders WHERE id = ?')
      .get(orderId);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

export default router;