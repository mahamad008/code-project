import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  Url, errorMsg } from '../../../../interfaces';

interface examResponse {
  isSuccess: boolean;
  result: exam[];
}

interface exam {
id: any,
Studentname: string,
studentPhone: string,
CourceName: string,
Total: number,
TakeDate: string,
UpdateDate: string,
isDeleted: boolean,
SubcourceId: number,
// isDeleted:Boo
studentId: number
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as exam[],
};

// extra reducer via createasynthunk

export const getAllexamFn = createAsyncThunk(
  'getall/exam',
  async (_, { rejectWithValue }) => {
    try {
      let res = await axios.get<examResponse>(`${Url}/exam/get/all`);
      return res.data.result;

    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);
     console.log(error)
      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllexamSlice = createSlice({
  // name
  name: 'getall/exam',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllexamFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllexamFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllexamFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,

      errorMsg: String(action.payload),
    }));
  },
});
