# 🚀 Hướng dẫn cài đặt và chạy dự án TinH-c

## 📋 Yêu cầu hệ thống

- Node.js >= 18.x
- MongoDB >= 6.x
- Git
- Tài khoản Cloudinary (để upload ảnh/video)

## 🔧 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/hungmenvadong147/TinH-c.git
cd TinH-c
```

### 2. Cài đặt Backend

```bash
cd server
npm install
```

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường trong file `.env`:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/tinh-c

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
CLIENT_URL=http://localhost:5173
```

### 3. Cài đặt Frontend

```bash
cd ../client
npm install
```

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật:

```env
VITE_API_URL=http://localhost:5000/api
```

## ▶️ Chạy dự án

### Chạy Backend

```bash
cd server
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

### Chạy Frontend

Mở terminal mới:

```bash
cd client
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

## 👤 Tài khoản mặc định

Sau khi chạy, bạn cần đăng ký tài khoản mới.

Để tạo tài khoản Admin/Instructor, đăng ký với role tương ứng.

## 📁 Cấu trúc dự án

```
TinH-c/
├── client/                 # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/    # Components tái sử dụng
│   │   ├── pages/         # Các trang
│   │   ├── store/         # Zustand stores
│   │   ├── lib/           # Utilities
│   │   └── types/         # TypeScript types
│   └── package.json
│
├── server/                # Backend Node.js + TypeScript
│   ├── src/
│   │   ├── config/       # Cấu hình
│   │   ├── controllers/  # Controllers
│   │   ├── middleware/   # Middleware
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── index.ts      # Entry point
│   └── package.json
│
└── README.md
```

## 🎨 Tính năng chính

### Học viên
- ✅ Đăng ký/Đăng nhập
- ✅ Xem danh sách khóa học
- ✅ Tìm kiếm và lọc khóa học
- ✅ Đăng ký khóa học
- ✅ Xem video bài học
- ✅ Theo dõi tiến độ học tập
- ✅ Đánh giá khóa học
- ✅ Xem gallery

### Giảng viên/Admin
- ✅ Tất cả tính năng của học viên
- ✅ Tạo/Sửa/Xóa khóa học
- ✅ Tạo/Sửa/Xóa bài học
- ✅ Upload ảnh/video lên Cloudinary
- ✅ Quản lý học viên
- ✅ Dashboard thống kê

## 🌙 Dark Mode

Ứng dụng hỗ trợ Dark Mode, click vào icon mặt trời/mặt trăng ở header để chuyển đổi.

## 📱 Responsive

Giao diện được thiết kế responsive, hoạt động tốt trên:
- 📱 Mobile
- 💻 Tablet
- 🖥️ Desktop

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user
- `PUT /api/auth/profile` - Cập nhật profile

### Courses
- `GET /api/courses` - Lấy danh sách khóa học
- `GET /api/courses/:id` - Lấy chi tiết khóa học
- `POST /api/courses` - Tạo khóa học (Instructor/Admin)
- `PUT /api/courses/:id` - Cập nhật khóa học (Instructor/Admin)
- `DELETE /api/courses/:id` - Xóa khóa học (Instructor/Admin)
- `POST /api/courses/:id/enroll` - Đăng ký khóa học

### Lessons
- `GET /api/lessons` - Lấy danh sách bài học
- `GET /api/lessons/:id` - Lấy chi tiết bài học
- `POST /api/lessons` - Tạo bài học (Instructor/Admin)
- `PUT /api/lessons/:id` - Cập nhật bài học (Instructor/Admin)
- `DELETE /api/lessons/:id` - Xóa bài học (Instructor/Admin)

### Reviews
- `GET /api/reviews` - Lấy danh sách đánh giá
- `POST /api/reviews` - Tạo đánh giá
- `PUT /api/reviews/:id` - Cập nhật đánh giá
- `DELETE /api/reviews/:id` - Xóa đánh giá

### Upload
- `POST /api/upload/image` - Upload ảnh
- `POST /api/upload/video` - Upload video
- `DELETE /api/upload/file` - Xóa file

### Gallery
- `GET /api/gallery` - Lấy danh sách ảnh
- `POST /api/gallery` - Thêm ảnh
- `DELETE /api/gallery/:id` - Xóa ảnh

## 🐛 Troubleshooting

### MongoDB không kết nối được
- Kiểm tra MongoDB đã chạy chưa: `mongod --version`
- Kiểm tra MONGODB_URI trong file `.env`

### Port đã được sử dụng
- Thay đổi PORT trong file `.env` của server
- Thay đổi port trong `vite.config.ts` của client

### Cloudinary không hoạt động
- Kiểm tra credentials trong file `.env`
- Đăng ký tài khoản miễn phí tại: https://cloudinary.com

## 📝 License

MIT

## 👨‍💻 Author

hungmenvadong147

## 🤝 Contributing

Pull requests are welcome!
