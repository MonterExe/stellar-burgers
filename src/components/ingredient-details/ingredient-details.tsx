import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items: ingredients, loading } = useSelector(
    (state) => state.ingredients
  );

  if (loading) return <Preloader />;
  if (!ingredients.length) return <div>Ингредиенты не загружены</div>;

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
