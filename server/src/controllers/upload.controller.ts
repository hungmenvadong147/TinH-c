import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';

const uploadToCloudinary = (buffer: Buffer, folder: string, resourceType: 'image' | 'video'): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `tinh-c/${folder}`,
        resource_type: resourceType
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn file' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'images', 'image');

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadVideo = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn file' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'videos', 'video');

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFile = async (req: AuthRequest, res: Response) => {
  try {
    const { publicId, resourceType } = req.body;

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType || 'image' });

    res.json({
      success: true,
      message: 'Đã xóa file'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
