import express from 'express';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/review.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', getReviews);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
