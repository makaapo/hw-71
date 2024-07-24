import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const createDish = createAsyncThunk<void, ApiDish, {state: RootState}>('dishes/create' , async (apiDish) => {
  await axiosApi.post('/dishes.json', apiDish);
})