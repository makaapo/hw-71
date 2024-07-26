import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, ApiDishes, Dish} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const createDish = createAsyncThunk<void, ApiDish, { state: RootState }>('dishes/create', async (apiDish) => {
  await axiosApi.post('/dishes.json', apiDish);
});

export const fetchDishes = createAsyncThunk<Dish[], void, { state: RootState }>('dishes/fetch', async () => {
  const {data: dishes} = await axiosApi.get<null | ApiDishes>('dishes.json');
  if (dishes === null) {
    return [];
  }

  return Object.keys(dishes).map((id) => ({
    id,
    ...dishes[id]
  }));
});

export const fetchOneDish = createAsyncThunk<ApiDish, string, { state: RootState }>(
  'dishes/fetchOne',
  async (id) => {
    const {data: dish} = await axiosApi.get<ApiDish | null>(
      `/dishes/${id}.json`,
    );

    if (dish === null) {
      throw new Error('Not found');
    }

    return dish;
  },
);

export interface UpdateDishArg {
  id: string;
  apiDish: ApiDish;
}

export const updateDish = createAsyncThunk<void, UpdateDishArg, { state: RootState }>(
  'dishes/update',
  async ({id, apiDish}) => {
    await axiosApi.put(`/dishes/${id}.json`, apiDish);
  },
);

export const deleteDish = createAsyncThunk<void, string, { state: RootState }>(
  'dishes/deleteDish',
  async (dishId) => {
    await axiosApi.delete('/dishes/' + dishId + '.json');
  },
);