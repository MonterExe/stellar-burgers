import { forwardRef, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '../../utils/types';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    (state) => state.constructor
  );

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    constructorIngredients.forEach((item: TIngredient) => {
      if (!counters[item._id]) counters[item._id] = 0;
      counters[item._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [constructorIngredients, bun]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
