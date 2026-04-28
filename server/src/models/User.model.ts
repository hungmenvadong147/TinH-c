import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  bio?: string;
  enrolledCourses: mongoose.Types.ObjectId[];
  createdCourses: mongoose.Types.ObjectId[];
  progress: {
    courseId: mongoose.Types.ObjectId;
    completedLessons: mongoose.Types.ObjectId[];
    progressPercentage: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập mật khẩu'],
      minlength: 6,
      select: false
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/demo/image/upload/avatar-default.png'
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student'
    },
    bio: {
      type: String,
      maxlength: 500
    },
    enrolledCourses: [{
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }],
    createdCourses: [{
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }],
    progress: [{
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      },
      completedLessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
      }],
      progressPercentage: {
        type: Number,
        default: 0
      }
    }]
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
