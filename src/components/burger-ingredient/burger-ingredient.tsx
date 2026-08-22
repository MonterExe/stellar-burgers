import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/burgerConstructorSlice';
import { BurgerIngredientUI } from '../ui/burger-ingredient';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <div data-testid='ingredient-card'>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
        {/* Добавляем data-testid на кнопку "Добавить" (если кнопка внутри BurgerIngredientUI, то нужно добавить в UI-компонент) */}
      </div>
    );
  }
);
