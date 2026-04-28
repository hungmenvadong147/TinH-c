import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';
import api from '@/lib/axios';
import { User, Course } from '@/types';
import toast from 'react-hot-toast';

const InstructorProfile = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstructor();
  }, [id]);

  const fetchInstructor = async () => {
    try {
      const { data } = await api.get(`/users/${id}`);
      setInstructor(data.user);
      
      const coursesData = await api.get(`/courses?instructor=${id}`);
      setCourses(coursesData.data.courses);
    } catch (error) {
      toast.error('Lỗi khi tải thông tin giảng viên');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">Loading...</div>;
  }

  if (!instructor) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">Không tìm thấy giảng viên</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {instructor.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{instructor.bio}</p>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <FiBook />
                  <span>{instructor.createdCourses.length} khóa học</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Khóa học của giảng viên
        </h2>

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
      </div>
    </div>
  );
};

export default InstructorProfile;
