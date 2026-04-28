import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiStar, FiUsers, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import { Course } from '@/types';
import toast from 'react-hot-toast';

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    sort: 'newest'
  });

  useEffect(() => {
    fetchCourses();
  }, [searchParams, filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const search = searchParams.get('search') || '';
      const params = new URLSearchParams({
        ...(search && { search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.level && { level: filters.level }),
        sort: filters.sort
      });

      const { data } = await api.get(`/courses?${params}`);
      setCourses(data.courses);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi tải khóa học');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Programming', 'Design', 'Business', 'Marketing', 'Photography', 'Music'];
  const levels = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Học tập hiệu quả cùng TinH-c
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Khám phá hàng ngàn khóa học chất lượng cao từ các giảng viên hàng đầu
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Bắt đầu học ngay
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Tất cả cấp độ</option>
              <option value="beginner">Cơ bản</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Mới nhất</option>
              <option value="popular">Phổ biến</option>
              <option value="rating">Đánh giá cao</option>
              <option value="price-low">Giá thấp</option>
              <option value="price-high">Giá cao</option>
            </select>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <div className="skeleton h-48 w-full" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Không tìm thấy khóa học nào
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={`/courses/${course._id}`}
                  className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    {course.isFree && (
                      <span className="absolute top-2 right-2 px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                        Miễn phí
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <FiStar className="text-yellow-400" />
                        <span>{course.rating.toFixed(1)}</span>
                        <span>({course.reviewCount})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiUsers />
                        <span>{course.enrolledStudents.length}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {course.isFree ? 'Miễn phí' : `${course.price.toLocaleString('vi-VN')}đ`}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                        {course.level === 'beginner' ? 'Cơ bản' : course.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
