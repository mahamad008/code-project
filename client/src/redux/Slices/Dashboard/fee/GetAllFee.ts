
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {Url, errorMsg } from '../../../../interfaces';

interface FeeResponse {
  isSuccess: boolean;
  result: Fee[];
}

interface Fee {
  id:number
  student:string
  UpdatedAt:string
  PaidAt:string
  amountPaid:any,
  Balance: any,
  studentPhone:any,
  studentName:any,
  Amountneed:any,
  studentId:any,
  isDeleted:Boolean;
  method:any;
  userId:any;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as Fee[],
};

// extra reducer via createasynthunk

export const getAllFeeFn = createAsyncThunk(
  'getall/Fee',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<FeeResponse>(`${Url}/Fee/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllFeeSlice = createSlice({
  // name
  name: 'getall/Fee',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllFeeFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllFeeFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllFeeFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
