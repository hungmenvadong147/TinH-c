import express from 'express';
import {
  getLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson
} from '../controllers/lesson.controller';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getLessons);
router.get('/:id', getLesson);
router.post('/', protect, authorize('instructor', 'admin'), createLesson);
router.put('/:id', protect, authorize('instructor', 'admin'), updateLesson);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteLesson);

export default router;
