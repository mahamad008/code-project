
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {Url, errorMsg } from '../../../../interfaces';

interface OflineCourceResponse {
  isSuccess: boolean;
  result: OflineCource[];
}

interface OflineCource {
  id:any;
    teacherId:any;
    Description:any;
    Name:any;
    shift:any;
    OflineCategoryId:any;
    createdAt:any;
    UpadatedAt:any;
    isDeleted:Boolean;
    userId:any;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as OflineCource[],
};

// extra reducer via createasynthunk

export const getAllOflineCourceFn = createAsyncThunk(
  'getall/OflineCource',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<OflineCourceResponse>(`${Url}/oflinecource/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllOflineCourceSlice = createSlice({
  // name
  name: 'getall/OflineCource',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllOflineCourceFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllOflineCourceFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllOflineCourceFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});

// export const {getAllOflineCourceSlice}=