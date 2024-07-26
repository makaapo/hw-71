import {ApiOrders, CartDish, Dish, Order, OrderInfo, OrdersInfo} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {clearCart} from './cartSlice';

export const fetchOrders = createAsyncThunk<Order[], void, { state: RootState }>(
  'orders/fetchOrders',
  async () => {
    const {data: ordersData} = await axiosApi.get<ApiOrders>('/orders.json');
    const {data: dishesData} = await axiosApi.get<{[id: string]: Dish}>('/dishes.json');

    if (!ordersData || !dishesData) {
      return [];
    }
    return Object.keys(ordersData).map(id => {
      const order = ordersData[id];
      const dishes = Object.keys(order.dishes).map(id => ({
        dish: dishesData[id],
        amount: order.dishes[id],
      }));
      const totalPrice = dishes.reduce((sum, cartDish) =>
        sum + cartDish.amount * cartDish.dish.price, 0);
      return {id, dishes, delivery: 150, totalPrice: totalPrice + 150};
    });
  }
);

export const createOrder = createAsyncThunk<void, CartDish[], {state: RootState}>(
  'order/createOrder',
  async (cartDishes, {dispatch}) => {
    const newOrder: OrdersInfo = {
      dishes: cartDishes.reduce<OrderInfo>((acc, cartDish) => {
        acc[cartDish.dish.id] = cartDish.amount;
        return acc;
      }, {}),
    };
    await axiosApi.post('/orders.json', newOrder);
    dispatch(clearCart());
  }
);

export const deleteOrder = createAsyncThunk<void, string, {state: RootState}>(
  'orders/deleteOrder',
  async (id) => {
    await axiosApi.delete('/orders/' + id + '.json');
  },
);