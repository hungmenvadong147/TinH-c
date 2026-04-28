import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';
import api from '@/lib/axios';
import { Course } from '@/types';
import toast from 'react-hot-toast';

const MyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const { data } = await api.get('/auth/me');
      const enrolledIds = data.user.enrolledCourses;
      
      const coursesData = await Promise.all(
        enrolledIds.map((id: string) => api.get(`/courses/${id}`))
      );
      
      setCourses(coursesData.map(res => res.data.course));
    } catch (error: any) {
      toast.error('Lỗi khi tải khóa học');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Khóa học của tôi
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-lg" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <FiBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Bạn chưa đăng ký khóa học nào
            </p>
            <Link
              to="/"
              className="mt-4 inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Khám phá khóa học
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
