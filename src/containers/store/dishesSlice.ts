import {createSlice} from '@reduxjs/toolkit';
import {createDish} from './dishesThunks';


interface DishesState {
  createLoading: boolean;
}

const initialState: DishesState = {
  createLoading: false,
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

  },
  selectors: {
    selectCreateDishLoading: (state) => state.createLoading,
  },
});

export const dishesReducer = dishesSlice.reducer;

export const {
  selectCreateDishLoading,
} = dishesSlice.selectors;
