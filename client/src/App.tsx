import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import InstructorProfile from './pages/InstructorProfile';
import Gallery from './pages/Gallery';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCourses from './pages/admin/Courses';
import AdminCourseForm from './pages/admin/CourseForm';
import AdminLessons from './pages/admin/Lessons';
import AdminLessonForm from './pages/admin/LessonForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="instructors/:id" element={<InstructorProfile />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute roles={['admin', 'instructor']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/courses"
          element={
            <ProtectedRoute roles={['admin', 'instructor']}>
              <AdminCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/courses/new"
          element={
            <ProtectedRoute roles={['admin', 'instructor']}>
              <AdminCourseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/courses/:id/edit"
          element={
            <ProtectedRoute roles={['admin', 'instructor']}>
              <AdminCourseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/courses/:courseId/lessons"
          element={
            <ProtectedRoute roles={['admin', 'instructor']}>
              <AdminLessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/courses/:courseId/lessons/new"
          element={
            <ProtectedRoute roles={['admin', 'instructor']}>
              <AdminLessonForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/courses/:courseId/lessons/:id/edit"
          element={
            <ProtectedRoute roles={['admin', 'instructor']}>
              <AdminLessonForm />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
