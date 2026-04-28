import express from 'express';
import { uploadImage, uploadVideo, deleteFile } from '../controllers/upload.controller';
import { protect, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

router.post('/image', protect, authorize('instructor', 'admin'), upload.single('file'), uploadImage);
router.post('/video', protect, authorize('instructor', 'admin'), upload.single('file'), uploadVideo);
router.delete('/file', protect, authorize('instructor', 'admin'), deleteFile);

export default router;
