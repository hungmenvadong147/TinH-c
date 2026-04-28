import { Response } from 'express';
import Lesson from '../models/Lesson.model';
import Course from '../models/Course.model';
import { AuthRequest } from '../middleware/auth';

export const getLessons = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.query;
    
    const query = courseId ? { course: courseId } : {};
    const lessons = await Lesson.find(query).sort({ order: 1 });

    res.json({
      success: true,
      count: lessons.length,
      lessons
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLesson = async (req: AuthRequest, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');

    if (!lesson) {
      return res.status(404).json({ message: 'Không tìm thấy bài học' });
    }

    res.json({
      success: true,
      lesson
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLesson = async (req: AuthRequest, res: Response) => {
  try {
    const lesson = await Lesson.create(req.body);

    // Add to course
    await Course.findByIdAndUpdate(req.body.course, {
      $push: { lessons: lesson._id }
    });

    res.status(201).json({
      success: true,
      lesson
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLesson = async (req: AuthRequest, res: Response) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Không tìm thấy bài học' });
    }

    res.json({
      success: true,
      lesson
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLesson = async (req: AuthRequest, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: 'Không tìm thấy bài học' });
    }

    // Remove from course
    await Course.findByIdAndUpdate(lesson.course, {
      $pull: { lessons: lesson._id }
    });

    await Lesson.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Đã xóa bài học'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
