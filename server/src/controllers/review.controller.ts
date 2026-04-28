import { Response } from 'express';
import Review from '../models/Review.model';
import Course from '../models/Course.model';
import { AuthRequest } from '../middleware/auth';

export const getReviews = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.query;
    
    const query = courseId ? { course: courseId } : {};
    const reviews = await Review.find(query)
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { course, rating, comment } = req.body;

    // Check if already reviewed
    const existingReview = await Review.findOne({
      course,
      user: req.user?._id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Bạn đã đánh giá khóa học này rồi' });
    }

    const review = await Review.create({
      course,
      user: req.user?._id,
      rating,
      comment
    });

    // Update course rating
    const reviews = await Review.find({ course });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Course.findByIdAndUpdate(course, {
      rating: avgRating,
      reviewCount: reviews.length
    });

    res.status(201).json({
      success: true,
      review
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }

    // Check ownership
    if (review.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa đánh giá này' });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Update course rating
    const reviews = await Review.find({ course: review?.course });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Course.findByIdAndUpdate(review?.course, {
      rating: avgRating
    });

    res.json({
      success: true,
      review
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }

    // Check ownership
    if (review.user.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền xóa đánh giá này' });
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update course rating
    const reviews = await Review.find({ course: review.course });
    const avgRating = reviews.length > 0 
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length 
      : 0;

    await Course.findByIdAndUpdate(review.course, {
      rating: avgRating,
      reviewCount: reviews.length
    });

    res.json({
      success: true,
      message: 'Đã xóa đánh giá'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
