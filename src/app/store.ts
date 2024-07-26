import {configureStore} from '@reduxjs/toolkit';
import {dishesReducer} from '../containers/store/dishesSlice';
import {cartReducer} from '../containers/store/cartSlice';


export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    cart: cartReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;