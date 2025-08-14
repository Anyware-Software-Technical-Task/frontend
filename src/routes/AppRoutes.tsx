import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import RequireAuth from "../hoc/requireAuth";
import RootRedirect from "../components/RootRedirect";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Announcements from "../pages/Announcements";
import Quizzes from "../pages/Quizzes";

const AppRoutes = () => (
  <Routes>
    {/* Root redirect - authenticated users go to dashboard, unauthenticated to home */}
    <Route 
      path="/" 
      element={<RootRedirect />}
    />
    
    <Route path="/home" element={<MainLayout />}>
      <Route 
        index 
        element={
          <RequireAuth requireAuth={false}>
            <Home />
          </RequireAuth>
        } 
      />
    </Route>
    
    {/* Login route with MainLayout */}
    <Route path="/login" element={<MainLayout />}>
      <Route 
        index 
        element={
          <RequireAuth requireAuth={false}>
            <Login />
          </RequireAuth>
        } 
      />
    </Route>

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route
        index
        element={
          <RequireAuth requireAuth={true}>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="announcements"
        element={
          <RequireAuth requireAuth={true}>
            <Announcements />
          </RequireAuth>
        }
      />
      <Route
        path="quizzes"
        element={
          <RequireAuth requireAuth={true}>
            <Quizzes />
          </RequireAuth>
        }
      />
    </Route>
    
    {/* Catch-all route for 404 */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
