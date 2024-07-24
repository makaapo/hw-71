import {createSlice} from '@reduxjs/toolkit';
import {createDish, fetchDishes} from './dishesThunks';
import {Dish} from '../../types';


interface DishesState {
  items: Dish[];
  createLoading: boolean;
  isFetching: boolean;
}

const initialState: DishesState = {
  items: [],
  createLoading: false,
  isFetching: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDish.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createDish.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDishes.fulfilled, (state, {payload: items}) => {
        state.isFetching = false;
        state.items = items;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectDishes: (state) => state.items,
    selectCreateDishLoading: (state) => state.createLoading,
    selectFetchDishLoading: (state) => state.isFetching,
  },
});

export const dishesReducer = dishesSlice.reducer;

export const {
  selectCreateDishLoading,
  selectFetchDishLoading,
  selectDishes,
} = dishesSlice.selectors;
