// src/routes/PublicOnlyRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const PublicOnlyRoute = () => {
  const isAuthenticated = useAppSelector(state => state.auth.token);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
