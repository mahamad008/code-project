
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {Url, errorMsg } from '../../../../interfaces';

interface OflineSubCourceResponse {
  isSuccess: boolean;
  result: OflineSubCource[];
}

interface OflineSubCource {
  Title:string
  Description:string
  oflinecourceId:any;
  SubcourceId:any;
  UpdatedAt:any;
  isDeleted:Boolean;
  CreatedAt:any;
  userId:any;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as OflineSubCource[],
};

// extra reducer via createasynthunk

export const getAllOflineSubCourceFn = createAsyncThunk(
  'getall/OflineSubCource',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<OflineSubCourceResponse>(`${Url}/subcource/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllOflineSubCourceSlice = createSlice({
  // name
  name: 'getall/OflineSubCource',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllOflineSubCourceFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllOflineSubCourceFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllOflineSubCourceFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});

// export const {getAllOflineSubCourceSlice}=