import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  Url, errorMsg } from '../../../../interfaces';

export interface createCategoryData {
  catName: string;
  catDescription: string;
  catimage:string;
}

const initialState = {
  data: {} as createCategoryData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};
export const createCategoryFn = createAsyncThunk(
  'create/category',
  async (data: createCategoryData, { rejectWithValue }) => {
    try {
      // const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      const res = await axios.post(`${Url}/category/create`, data
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      );

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
      console.log(error)
    }
  }
);

// slice

export const createCatgorySlice = createSlice({
  // name
  name: 'createcategory',
  reducers: {
    resetCategoryState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    // pending
    builder.addCase(createCategoryFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(createCategoryFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(createCategoryFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
export default createCatgorySlice
export const { resetCategoryState } = createCatgorySlice.actions;
