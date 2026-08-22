import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../burgerConstructorSlice';
import { TIngredient } from '../../utils/types';

describe('burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const mockIngredient: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'url',
    image_large: 'url',
    image_mobile: 'url'
  };

  test('should return initial state with unknown action', () => {
    const state = burgerConstructorReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  test('should handle addIngredient (bun)', () => {
    const bun = mockIngredient;
    const state = burgerConstructorReducer(initialState, addIngredient(bun));
    expect(state.bun).toMatchObject({
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: 'url',
      image_large: 'url',
      image_mobile: 'url'
    });
    expect(state.bun?.id).toBeDefined();
  });

  test('should handle addIngredient (ingredient)', () => {
    const ingredient = { ...mockIngredient, type: 'main' };
    const state = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(ingredient);
    expect(state.ingredients[0].id).toBeDefined();
  });

  test('should handle removeIngredient', () => {
    const ingredient = { ...mockIngredient, type: 'main', id: '123' };
    const stateWithIngredient = {
      bun: null,
      ingredients: [ingredient]
    };
    const state = burgerConstructorReducer(
      stateWithIngredient,
      removeIngredient('123')
    );
    expect(state.ingredients).toHaveLength(0);
  });

  test('should handle moveIngredientUp', () => {
    const ingredient1 = { ...mockIngredient, type: 'main', id: '1' };
    const ingredient2 = { ...mockIngredient, type: 'main', id: '2' };
    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );
    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });

  test('should handle moveIngredientDown', () => {
    const ingredient1 = { ...mockIngredient, type: 'main', id: '1' };
    const ingredient2 = { ...mockIngredient, type: 'main', id: '2' };
    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );
    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });

  test('should handle clearConstructor', () => {
    const bun = { ...mockIngredient, id: 'bun-id' };
    const ingredient = { ...mockIngredient, type: 'main', id: 'main-id' };
    const filledState = {
      bun: bun,
      ingredients: [ingredient]
    };
    const state = burgerConstructorReducer(filledState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
