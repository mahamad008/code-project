import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

export interface updateCategoryData {
  catId: string;
  catName: string;
  catDescription: string;
}

const initialState = {
  data: {} as updateCategoryData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};

// async thunk

export const updateCategoryFn = createAsyncThunk(
  'update/category',
  async (data: updateCategoryData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${Url}/category/${data.catId}`, data);

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const updateCategorySlice = createSlice({
  // name
  name: 'update/category',
  reducers: {
    resetUpdateCategoryState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    // pending
    builder.addCase(updateCategoryFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(updateCategoryFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(updateCategoryFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});

export default updateCategorySlice;
export const { resetUpdateCategoryState } = updateCategorySlice.actions;