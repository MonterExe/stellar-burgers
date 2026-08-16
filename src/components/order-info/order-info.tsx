import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  clearOrderInfo
} from '../../services/orderInfoSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '../../utils/types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderInfo);
  const { items: ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
    return () => {
      dispatch(clearOrderInfo());
    };
  }, [number, dispatch]);

  if (loading) return <Preloader />;
  if (error)
    return <div className='text text_type_main-medium pt-4'>{error}</div>;
  if (!order)
    return (
      <div className='text text_type_main-medium pt-4'>Заказ не найден</div>
    );

  const ingredientsInfo: { [key: string]: TIngredient & { count: number } } =
    {};
  order.ingredients.forEach((id: string) => {
    if (!ingredientsInfo[id]) {
      const ingredient = ingredients.find((ing) => ing._id === id);
      if (ingredient) {
        ingredientsInfo[id] = { ...ingredient, count: 1 };
      }
    } else {
      ingredientsInfo[id].count++;
    }
  });

  const total = Object.values(ingredientsInfo).reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const date = new Date(order.createdAt);

  const orderInfo = {
    ...order,
    ingredientsInfo,
    date,
    total
  };

  return <OrderInfoUI orderInfo={orderInfo} />;
};
