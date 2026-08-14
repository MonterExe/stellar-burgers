import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useSelector } from '../../services/store';
import { TIngredient } from '../../utils/types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const { items: ingredients } = useSelector((state) => state.ingredients);
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (number) {
      getOrderByNumberApi(Number(number))
        .then((res) => {
          setOrderData(res.orders[0]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);
    const ingredientsInfo: { [key: string]: TIngredient & { count: number } } =
      {};

    orderData.ingredients.forEach((id: string) => {
      if (!ingredientsInfo[id]) {
        const ingredient = ingredients.find(
          (ing: TIngredient) => ing._id === id
        );
        if (ingredient) {
          ingredientsInfo[id] = { ...ingredient, count: 1 };
        }
      } else {
        ingredientsInfo[id].count++;
      }
    });

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item: TIngredient & { count: number }) =>
        acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (loading) return <Preloader />;
  if (!orderInfo) return <div>Заказ не найден</div>;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
