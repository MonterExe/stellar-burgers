import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, RootState } from '../services/store';

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactElement;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ onlyUnAuth = false, children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.profile);
  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
