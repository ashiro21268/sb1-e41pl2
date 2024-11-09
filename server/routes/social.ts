import express from 'express';
import { randomUUID } from 'crypto';
import db from '../db';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/metrics', authenticateToken, (req, res) => {
  try {
    const metrics = db.prepare('SELECT * FROM social_metrics WHERE user_id = ?')
      .all(req.user.id);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/post', authenticateToken, (req, res) => {
  try {
    const { content, platforms } = req.body;
    const postId = randomUUID();

    db.prepare(`
      INSERT INTO social_posts (id, content, platforms, user_id)
      VALUES (?, ?, ?, ?)
    `).run(postId, content, JSON.stringify(platforms), req.user.id);

    const post = db.prepare('SELECT * FROM social_posts WHERE id = ?')
      .get(postId);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input' });
  }
});

export default router;