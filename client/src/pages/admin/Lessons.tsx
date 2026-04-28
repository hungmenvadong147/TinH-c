import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import api from '@/lib/axios';
import { Lesson } from '@/types';
import toast from 'react-hot-toast';

const AdminLessons = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const fetchLessons = async () => {
    try {
      const { data } = await api.get(`/lessons?courseId=${courseId}`);
      setLessons(data.lessons);
    } catch (error) {
      toast.error('Lỗi khi tải bài học');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa bài học này?')) return;

    try {
      await api.delete(`/lessons/${id}`);
      toast.success('Đã xóa bài học');
      fetchLessons();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa bài học');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quản lý bài học
          </h1>
          <Link
            to={`/admin/courses/${courseId}/lessons/new`}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <FiPlus />
            <span>Thêm bài học</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {lesson.order}. {lesson.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {lesson.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/admin/courses/${courseId}/lessons/${lesson._id}/edit`}
                    className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg"
                  >
                    <FiEdit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLessons;
