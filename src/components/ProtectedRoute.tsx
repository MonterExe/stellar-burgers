import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import {
  isLoadingSelector,
  isAuthenticatedSelector
} from '../services/profileSlice';
import { Preloader } from '@ui';

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactElement;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isLoading = useSelector(isLoadingSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
