import {createSlice} from '@reduxjs/toolkit';
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from './dishesThunks';
import {ApiDish, Dish} from '../../types';


interface DishesState {
  items: Dish[];
  createLoading: boolean;
  isFetching: boolean;
  updateLoading: boolean;
  fetchOneLoading: boolean;
  oneDish: null | ApiDish;
  deleteLoading: false | string;
}

const initialState: DishesState = {
  items: [],
  createLoading: false,
  isFetching: false,
  updateLoading: false,
  fetchOneLoading: false,
  oneDish: null,
  deleteLoading: false,
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

    builder
      .addCase(fetchOneDish.pending, (state) => {
        state.oneDish = null;
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneDish.fulfilled, (state, {payload: apiDish}) => {
        state.oneDish = apiDish;
        state.fetchOneLoading = false;
      })
      .addCase(fetchOneDish.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(updateDish.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateDish.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateDish.rejected, (state) => {
        state.updateLoading = false;
      });
    builder
      .addCase(deleteDish.pending, (state, {meta: {arg: dishId} }) => {
        state.deleteLoading = dishId;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteDish.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
  selectors: {
    selectDishes: (state) => state.items,
    selectCreateDishLoading: (state) => state.createLoading,
    selectFetchDishLoading: (state) => state.isFetching,
    selectFetchOneDishLoading: (state) => state.fetchOneLoading,
    selectUpdateDishLoading: (state) => state.updateLoading,
    selectOneDish: (state) => state.oneDish,
    selectDeleteDishLoading: (state) => state.deleteLoading,
  },
});

export const dishesReducer = dishesSlice.reducer;

export const {
  selectCreateDishLoading,
  selectFetchDishLoading,
  selectDishes,
  selectFetchOneDishLoading,
  selectUpdateDishLoading,
  selectOneDish,
  selectDeleteDishLoading
} = dishesSlice.selectors;
