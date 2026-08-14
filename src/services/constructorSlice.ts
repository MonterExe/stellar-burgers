import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '../utils/types';
import { orderBurgerApi } from '../utils/burger-api';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
}

const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const createOrder = createAsyncThunk(
  'constructor/createOrder',
  async (ids: string[]): Promise<TOrder> => {
    const response = await orderBurgerApi(ids);
    const { owner, price, ...order } = response.order;
    return { ...order, ingredients: ids };
  }
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.constructorItems.bun = item;
        } else {
          state.constructorItems.ingredients.push(item);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const [item] = state.constructorItems.ingredients.splice(index, 1);
        state.constructorItems.ingredients.splice(index - 1, 0, item);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const [item] = state.constructorItems.ingredients.splice(index, 1);
        state.constructorItems.ingredients.splice(index + 1, 0, item);
      }
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
        state.orderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message ?? null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      });
  },
  selectors: {
    constructorItemsSelector: (state) => state.constructorItems,
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    orderErrorSelector: (state) => state.orderError
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  closeOrderModal
} = constructorSlice.actions;

export const {
  constructorItemsSelector,
  orderRequestSelector,
  orderModalDataSelector,
  orderErrorSelector
} = constructorSlice.selectors;

export default constructorSlice.reducer;
