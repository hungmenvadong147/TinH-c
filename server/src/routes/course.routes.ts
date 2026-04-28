import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  markLessonComplete
} from '../controllers/course.controller';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', protect, authorize('instructor', 'admin'), createCourse);
router.put('/:id', protect, authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteCourse);
router.post('/:id/enroll', protect, enrollCourse);
router.post('/progress/complete', protect, markLessonComplete);

export default router;
