import { Link } from 'react-router-dom';
import { FiBook, FiUsers, FiVideo, FiStar } from 'react-icons/fi';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Quản trị
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Khóa học</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
              <FiBook className="w-12 h-12 text-primary-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Học viên</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
              <FiUsers className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Bài học</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
              <FiVideo className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Đánh giá</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
              <FiStar className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/courses"
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow"
          >
            <FiBook className="w-12 h-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Quản lý khóa học
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Thêm, sửa, xóa khóa học và quản lý nội dung
            </p>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
            <FiUsers className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Quản lý học viên
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Xem danh sách học viên và tiến độ học tập
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
