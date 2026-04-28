import express from 'express';
import { getUsers, getUser, getInstructors } from '../controllers/user.controller';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', protect, authorize('admin'), getUsers);
router.get('/instructors', getInstructors);
router.get('/:id', getUser);

export default router;
