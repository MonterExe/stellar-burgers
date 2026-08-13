import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { removeIngredient, moveIngredient } from '../../services/constructorSlice';
import { createOrder, clearOrder } from '../../services/orderSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { BurgerConstructorUI } from '../ui/burger-constructor';
import { TConstructorIngredient } from '../../utils/types';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { bun, ingredients } = useSelector((state) => state.constructor);
  const { order, orderRequest } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.profile);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (!bun) return;
    const ids = [bun._id, ...ingredients.map((item: TConstructorIngredient) => item._id)];
    dispatch(createOrder(ids));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    let sum = 0;
    if (bun) sum += bun.price * 2;
    ingredients.forEach((item: TConstructorIngredient) => (sum += item.price));
    return sum;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
