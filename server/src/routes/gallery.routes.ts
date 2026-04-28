import express from 'express';
import {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage
} from '../controllers/gallery.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', protect, createGalleryImage);
router.delete('/:id', protect, deleteGalleryImage);

export default router;
