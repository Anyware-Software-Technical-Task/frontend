import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const RootRedirect: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // This component now just handles the redirect logic
  // The RequireAuth wrapper handles the authentication check
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default RootRedirect;
