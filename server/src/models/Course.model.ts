import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  thumbnail: string;
  introVideo?: string;
  price: number;
  isFree: boolean;
  instructor: mongoose.Types.ObjectId;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessons: mongoose.Types.ObjectId[];
  enrolledStudents: mongoose.Types.ObjectId[];
  rating: number;
  reviewCount: number;
  duration: number; // in minutes
  language: string;
  requirements: string[];
  whatYouWillLearn: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Vui lòng nhập tên khóa học'],
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      required: [true, 'Vui lòng nhập mô tả'],
      maxlength: 2000
    },
    thumbnail: {
      type: String,
      required: [true, 'Vui lòng upload ảnh thumbnail']
    },
    introVideo: {
      type: String
    },
    price: {
      type: Number,
      default: 0,
      min: 0
    },
    isFree: {
      type: Boolean,
      default: false
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      required: [true, 'Vui lòng chọn danh mục'],
      enum: ['Programming', 'Design', 'Business', 'Marketing', 'Photography', 'Music', 'Other']
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    lessons: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }],
    enrolledStudents: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    language: {
      type: String,
      default: 'Tiếng Việt'
    },
    requirements: [{
      type: String
    }],
    whatYouWillLearn: [{
      type: String
    }],
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Index for search
courseSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<ICourse>('Course', courseSchema);
