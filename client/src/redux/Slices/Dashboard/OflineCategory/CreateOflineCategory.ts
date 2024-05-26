import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  Url, errorMsg } from '../../../../interfaces';

export interface createOflineCategoryData {
  OflineCatName:string;
  oflineCatDescription:string;
}

const initialState = {
  data: {} as createOflineCategoryData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};
export const createOflineCategoryFn = createAsyncThunk(
  'create/Oflinecategory',
  async (data: createOflineCategoryData, { rejectWithValue }) => {
    try {
      // const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      const res = await axios.post(`${Url}/OflineCategory/new`, data
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      );
console.log(res.data)
      // return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
      console.log(error)
    }
  }
);

// slice

export const CreateOflineCategory = createSlice({
  // name
  name: 'createOflinecategory',
  reducers: {
    resetOflineCategoryState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    // pending
    builder.addCase(createOflineCategoryFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    // builder.addCase(createOflineCategoryFn.fulfilled, (_, action) => ({
    //   ...initialState,
    //   isSuccess: true,
    //   data: action.payload,
    // }));

    // rejected

    builder.addCase(createOflineCategoryFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
export default CreateOflineCategory
export const { resetOflineCategoryState } = CreateOflineCategory.actions;
