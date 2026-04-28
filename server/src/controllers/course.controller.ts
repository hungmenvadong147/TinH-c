import { Response } from 'express';
import Course from '../models/Course.model';
import User from '../models/User.model';
import { AuthRequest } from '../middleware/auth';

export const getCourses = async (req: AuthRequest, res: Response) => {
  try {
    const { search, category, level, sort } = req.query;
    
    let query: any = { isPublished: true };

    // Search
    if (search) {
      query.$text = { $search: search as string };
    }

    // Filter
    if (category) query.category = category;
    if (level) query.level = level;

    let courses = Course.find(query)
      .populate('instructor', 'name avatar bio')
      .select('-enrolledStudents');

    // Sort
    if (sort === 'popular') {
      courses = courses.sort({ enrolledStudents: -1 });
    } else if (sort === 'rating') {
      courses = courses.sort({ rating: -1 });
    } else if (sort === 'newest') {
      courses = courses.sort({ createdAt: -1 });
    } else if (sort === 'price-low') {
      courses = courses.sort({ price: 1 });
    } else if (sort === 'price-high') {
      courses = courses.sort({ price: -1 });
    }

    const result = await courses;

    res.json({
      success: true,
      count: result.length,
      courses: result
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourse = async (req: AuthRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio')
      .populate('lessons');

    if (!course) {
      return res.status(404).json({ message: 'Không tìm thấy khóa học' });
    }

    res.json({
      success: true,
      course
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req: AuthRequest, res: Response) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user?._id
    };

    const course = await Course.create(courseData);

    // Add to user's created courses
    await User.findByIdAndUpdate(req.user?._id, {
      $push: { createdCourses: course._id }
    });

    res.status(201).json({
      success: true,
      course
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req: AuthRequest, res: Response) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Không tìm thấy khóa học' });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa khóa học này' });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      course
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req: AuthRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Không tìm thấy khóa học' });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền xóa khóa học này' });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Đã xóa khóa học'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const enrollCourse = async (req: AuthRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Không tìm thấy khóa học' });
    }

    // Check if already enrolled
    const user = await User.findById(req.user?._id);
    if (user?.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ message: 'Bạn đã đăng ký khóa học này rồi' });
    }

    // Add to enrolled courses
    await User.findByIdAndUpdate(req.user?._id, {
      $push: { enrolledCourses: course._id }
    });

    await Course.findByIdAndUpdate(course._id, {
      $push: { enrolledStudents: req.user?._id }
    });

    res.json({
      success: true,
      message: 'Đăng ký khóa học thành công'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markLessonComplete = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, lessonId } = req.body;

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Find or create progress
    let progress = user.progress.find(p => p.courseId.toString() === courseId);
    
    if (!progress) {
      user.progress.push({
        courseId,
        completedLessons: [lessonId],
        progressPercentage: 0
      });
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
    }

    // Calculate progress percentage
    const course = await Course.findById(courseId);
    if (course) {
      const totalLessons = course.lessons.length;
      const completedLessons = progress?.completedLessons.length || 0;
      if (progress) {
        progress.progressPercentage = Math.round((completedLessons / totalLessons) * 100);
      }
    }

    await user.save();

    res.json({
      success: true,
      message: 'Đã đánh dấu hoàn thành',
      progress: user.progress
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
