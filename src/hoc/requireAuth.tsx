import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface RequireAuthProps {
  children: React.ReactNode;
  requireAuth?: boolean; // New prop to determine if route requires authentication
  redirectTo?: string; // Where to redirect if auth requirement not met
}

const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  requireAuth = true, // Default to requiring auth
  redirectTo 
}) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle public routes (requireAuth = false)
  if (!requireAuth) {
    if (isAuthenticated) {
      // If user is authenticated and trying to access public route, redirect to dashboard
      return <Navigate to="/dashboard" replace />;
    }
    // If user is not authenticated and accessing public route, allow access
    return <>{children}</>;
  }

  // Handle protected routes (requireAuth = true)
  if (!isAuthenticated) {
    // If user is not authenticated and trying to access protected route, redirect to login
    const redirectPath = redirectTo || "/login";
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // User is authenticated and accessing protected route, allow access
  return <>{children}</>;
};

export default RequireAuth;
