import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/feedSlice';
import { FeedUI } from '../../components/ui/pages/feed';
import { Preloader } from '../../components/ui/preloader';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (loading) return <Preloader />;
  if (error)
    return <div className='text text_type_main-medium pt-4'>{error}</div>;
  if (!orders.length)
    return <div className='text text_type_main-medium pt-4'>Нет заказов</div>;

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
