import { Response } from 'express';
import Gallery from '../models/Gallery.model';
import { AuthRequest } from '../middleware/auth';

export const getGalleryImages = async (req: AuthRequest, res: Response) => {
  try {
    const images = await Gallery.find()
      .populate('user', 'name avatar')
      .populate('course', 'title')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: images.length,
      images
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createGalleryImage = async (req: AuthRequest, res: Response) => {
  try {
    const imageData = {
      ...req.body,
      user: req.user?._id
    };

    const image = await Gallery.create(imageData);

    res.status(201).json({
      success: true,
      image
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryImage = async (req: AuthRequest, res: Response) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Không tìm thấy ảnh' });
    }

    // Check ownership
    if (image.user.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền xóa ảnh này' });
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Đã xóa ảnh'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
