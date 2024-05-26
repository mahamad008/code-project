import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  Url, errorMsg } from '../../../../interfaces';

interface NewsResponse {
  isSuccess: boolean;
  result: News[];
}

interface News {
  id:string
  title: string;
  body: string;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as News[],
};

// extra reducer via createasynthunk

export const getAllNewsFn = createAsyncThunk(
  'getall/News',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<NewsResponse>(`${Url}/news/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllNewsSlice = createSlice({
  // name
  name: 'getall/News',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllNewsFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllNewsFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllNewsFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
