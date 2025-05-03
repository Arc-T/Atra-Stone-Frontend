import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const CheckToken = ({ children }: ProtectedRouteProps) => {
  const message = "ابتدا باید وارد سایت شوید !";

  const checkToken = () => {
    const token = localStorage.getItem("atra-user");
    return !!token;
  };

  if (!checkToken()) {
    return <Navigate to={"/admin/login"} state={message} />;
  }

  return <>{children}</>;
};

export default CheckToken;
