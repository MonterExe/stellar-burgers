import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  test('should return initial state with unknown action', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  test('should handle fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should handle fetchIngredients.fulfilled', () => {
    const mockData: TIngredient[] = [
      {
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
      }
    ];
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockData, '')
    );
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockData);
  });

  test('should handle fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' },
      payload: 'Ошибка'
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
