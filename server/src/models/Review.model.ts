import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  course: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Vui lòng đánh giá'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Vui lòng nhập nhận xét'],
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

// One review per user per course
reviewSchema.index({ course: 1, user: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', reviewSchema);
