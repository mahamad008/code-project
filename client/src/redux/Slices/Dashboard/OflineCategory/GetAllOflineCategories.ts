import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  Url, errorMsg } from '../../../../interfaces';

interface OflinecategoryResponse {
  isSuccess: boolean;
  result: Oflinecategory[];
}

interface Oflinecategory {
  OflineCatName:string;
  oflineCatDescription:string;
  createdAt: string;
  updatedAt: string;
  isDeleted: false;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as Oflinecategory[],
};

// extra reducer via createasynthunk

export const getAllOflineCategoryFn = createAsyncThunk(
  'getall/Oflinecategory',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<OflinecategoryResponse>(`${Url}/OflineCategory/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllOflineCategorySlice = createSlice({
  // name
  name: 'getall/Oflinecategory',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllOflineCategoryFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllOflineCategoryFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllOflineCategoryFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
