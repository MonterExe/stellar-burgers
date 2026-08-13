import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/profileSlice';
import { ProfileMenuUI } from '../ui/profile-menu';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(console.error);
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
