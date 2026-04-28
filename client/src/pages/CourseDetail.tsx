import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiUsers, FiClock, FiPlay, FiCheck } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import api from '@/lib/axios';
import { Course, Review, Lesson } from '@/types';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  
  const { isAuthenticated, user } = useAuthStore();
  const isEnrolled = user?.enrolledCourses.includes(id || '');

  useEffect(() => {
    fetchCourse();
    fetchReviews();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data.course);
      if (data.course.lessons.length > 0) {
        setSelectedLesson(data.course.lessons[0]);
      }
    } catch (error: any) {
      toast.error('Lỗi khi tải khóa học');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews?courseId=${id}`);
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để đăng ký khóa học');
      return;
    }

    try {
      setEnrolling(true);
      await api.post(`/courses/${id}/enroll`);
      toast.success('Đăng ký khóa học thành công!');
      fetchCourse();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi đăng ký khóa học');
    } finally {
      setEnrolling(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để đánh giá');
      return;
    }

    try {
      await api.post('/reviews', {
        course: id,
        rating: newReview.rating,
        comment: newReview.comment
      });
      toast.success('Đánh giá thành công!');
      setNewReview({ rating: 5, comment: '' });
      fetchReviews();
      fetchCourse();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi đánh giá');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-96 w-full mb-8" />
          <div className="skeleton h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Không tìm thấy khóa học</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            {selectedLesson && (
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video">
                  <ReactPlayer
                    url={selectedLesson.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedLesson.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedLesson.description}
                  </p>
                </div>
              </div>
            )}

            {/* Course Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {course.title}
              </h1>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <FiStar className="text-yellow-400" />
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {course.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({course.reviewCount} đánh giá)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiUsers className="text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {course.enrolledStudents.length} học viên
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {course.description}
              </p>

              {/* Instructor */}
              <Link
                to={`/instructors/${course.instructor._id}`}
                className="flex items-center space-x-4 mb-6 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors"
              >
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Giảng viên</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {course.instructor.name}
                  </p>
                </div>
              </Link>

              {/* What you'll learn */}
              {course.whatYouWillLearn.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Bạn sẽ học được gì
                  </h3>
                  <ul className="space-y-2">
                    {course.whatYouWillLearn.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <FiCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Đánh giá
              </h3>

              {isEnrolled && (
                <form onSubmit={handleSubmitReview} className="mb-8">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Đánh giá của bạn
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none"
                        >
                          <FiStar
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Nhận xét của bạn..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Gửi đánh giá
                  </button>
                </form>
              )}

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {review.user.name}
                          </h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enroll Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg sticky top-24">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                {course.isFree ? 'Miễn phí' : `${course.price.toLocaleString('vi-VN')}đ`}
              </div>
              
              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {enrolling ? 'Đang đăng ký...' : 'Đăng ký ngay'}
                </button>
              ) : (
                <div className="px-6 py-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg text-center font-semibold">
                  Đã đăng ký
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Cấp độ</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {course.level === 'beginner' ? 'Cơ bản' : course.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Số bài học</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {course.lessons.length} bài
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Ngôn ngữ</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {course.language}
                  </span>
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Nội dung khóa học
              </h3>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson._id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedLesson?._id === lesson._id
                        ? 'bg-primary-50 dark:bg-primary-900 border-2 border-primary-500'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {lesson.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <FiClock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            {Math.floor(lesson.duration / 60)} phút
                          </span>
                          {lesson.isFree && (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Miễn phí
                            </span>
                          )}
                        </div>
                      </div>
                      <FiPlay className="text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
