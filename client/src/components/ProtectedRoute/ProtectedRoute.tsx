import React, { ReactNode, useEffect, useState } from "react";
import { checkAuth } from "../../utils/Auth";
import { Navigate, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}
//#TODO: Fix types problems
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const authenticated = await checkAuth();
      setIsAuthenticated(authenticated);
    };
    verifyAuth();
  }, []);

  return isAuthenticated ? children : navigate("/login");
};

export default ProtectedRoute;
