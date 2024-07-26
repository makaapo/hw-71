import {createSlice} from '@reduxjs/toolkit';
import {Order} from '../../types';
import {createOrder, deleteOrder, fetchOrders} from './orderThunks';

export interface OrdersState {
  orders: Order[];
  loading: boolean;
  isLoading: boolean;
  deleteOrderLoading: boolean | string
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  isLoading: false,
  deleteOrderLoading: false,
};


const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(createOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteOrder.pending, (state, {meta: {arg: id}}) => {
        state.deleteOrderLoading = id;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.deleteOrderLoading = false;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.deleteOrderLoading = false;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersLoading: (state) => state.loading,
    selectOrderLoading: (state) => state.isLoading,
    SelectDeleteOrderLoading: (state) => state.deleteOrderLoading,
  },
});
export const {
  selectOrders,
  selectOrdersLoading,
  selectOrderLoading,
  SelectDeleteOrderLoading
} = ordersSlice.selectors;
export const orderReducer = ordersSlice.reducer;