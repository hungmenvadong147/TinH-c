import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  imageUrl: string;
  user: mongoose.Types.ObjectId;
  course?: mongoose.Types.ObjectId;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      required: [true, 'Vui lòng nhập tiêu đề'],
      trim: true
    },
    imageUrl: {
      type: String,
      required: [true, 'Vui lòng upload ảnh']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    description: {
      type: String,
      maxlength: 300
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IGallery>('Gallery', gallerySchema);
