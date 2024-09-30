import { appRoutes } from 'appConstants';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getMe } from 'services';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMe();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Handle loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Always return JSX or null here
  }

  // If authenticated, return the children elements, otherwise redirect
  return isAuthenticated ? <>{children}</> : <Navigate to={appRoutes.signin} />; // Return a valid JSX or null
};

export default ProtectedRoute;
