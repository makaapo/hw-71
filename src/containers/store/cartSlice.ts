import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartDish, Dish} from '../../types';
import {RootState} from '../../app/store';

export interface CartState {
  cartDishes: CartDish[];
}

const initialState: CartState = {
  cartDishes: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );

      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          amount: 1,
          dish,
        });
      }
    },
    removeDish: (state, {payload: id}: PayloadAction<string>) => {
      state.cartDishes = state.cartDishes.filter(cartDish => cartDish.dish.id !== id);
    },
    clearCart: (state) => {
      state.cartDishes = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {addDish, removeDish, clearCart} = cartSlice.actions;
export const selectCartDishes = (state: RootState) => state.cart.cartDishes;
