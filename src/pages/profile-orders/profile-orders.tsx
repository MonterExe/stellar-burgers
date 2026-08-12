import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/profileSlice';
import { ProfileOrdersUI } from '../../components/ui/pages/profile-orders';
import { Preloader } from '../../components/ui/preloader';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) return <Preloader />;
  if (error) return <div className="text text_type_main-medium pt-4">{error}</div>;

  return <ProfileOrdersUI orders={orders} />;
};
