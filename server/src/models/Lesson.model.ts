import mongoose, { Document, Schema } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in seconds
  content: string;
  order: number;
  course: mongoose.Types.ObjectId;
  isFree: boolean;
  resources: {
    title: string;
    url: string;
    type: 'pdf' | 'video' | 'link' | 'other';
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: [true, 'Vui lòng nhập tên bài học'],
      trim: true
    },
    description: {
      type: String,
      maxlength: 1000
    },
    videoUrl: {
      type: String,
      required: [true, 'Vui lòng upload video']
    },
    duration: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      required: true
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    isFree: {
      type: Boolean,
      default: false
    },
    resources: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['pdf', 'video', 'link', 'other']
      }
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ILesson>('Lesson', lessonSchema);
