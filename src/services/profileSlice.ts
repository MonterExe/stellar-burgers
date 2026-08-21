import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  getOrdersApi,
  TLoginData,
  TRegisterData
} from '../utils/burger-api';
import { TUser, TOrder } from '../utils/types';
import { deleteCookie, setCookie } from '../utils/cookie';

interface ProfileState {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean; // новый флаг
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  orders: [],
  isLoading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'profile/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка входа');
    }
  }
);

export const registerUser = createAsyncThunk(
  'profile/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'profile/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка выхода');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка получения пользователя');
    }
  }
);

export const updateUser = createAsyncThunk(
  'profile/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(data);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления профиля');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'profile/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка загрузки истории заказов'
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthChecked = false;
      state.orders = [];
      state.error = null;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.orders = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    userSelector: (state) => state.user,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    ordersSelector: (state) => state.orders,
    isLoadingSelector: (state) => state.isLoading,
    errorSelector: (state) => state.error
  }
});

export const { clearProfile, setAuthChecked } = profileSlice.actions;

export const {
  userSelector,
  isAuthenticatedSelector,
  isAuthCheckedSelector,
  ordersSelector,
  isLoadingSelector,
  errorSelector
} = profileSlice.selectors;

export default profileSlice.reducer;
