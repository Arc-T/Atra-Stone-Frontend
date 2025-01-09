import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const CheckToken = ({ children }: ProtectedRouteProps) => {
  const message = "ابتدا باید وارد سایت شوید !";

  const checkToken = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  if (!checkToken()) {
    return <Navigate to={"/user/login"} state={message} />;
  }

  return <>{children}</>;
};

export default CheckToken;
