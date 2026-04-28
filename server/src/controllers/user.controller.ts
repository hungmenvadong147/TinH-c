import { Response } from 'express';
import User from '../models/User.model';
import { AuthRequest } from '../middleware/auth';

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('createdCourses')
      .populate('enrolledCourses');

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getInstructors = async (req: AuthRequest, res: Response) => {
  try {
    const instructors = await User.find({ role: 'instructor' })
      .select('-password')
      .populate('createdCourses');

    res.json({
      success: true,
      count: instructors.length,
      instructors
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
