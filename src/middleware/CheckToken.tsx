import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const CheckToken = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const checkToken = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  if (!checkToken()) {
    return (
      <Navigate
        to={isAdmin ? "/admin/login" : "/user/login"}
        state={{ message: "لطفاً ابتدا وارد شوید" }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default CheckToken;
