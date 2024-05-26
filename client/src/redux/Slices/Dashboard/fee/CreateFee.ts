
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url } from '../../../../interfaces';
// import { Url, errorMsg } from '../../../../interfaces';
// import { Straight } from '@mui/icons-material';/

export interface createFeeData {
  amountPaid:any,
  Balance: any,
  studentPhone:any,
  studentName:any,
  Amountneed:any,
  studentId:any,
  method:any

}

const initialState = {
  data: {} as createFeeData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};

// async thunk

export const createFeeFn = createAsyncThunk(
  'create/Fee',
  async (data: createFeeData, { rejectWithValue }) => {
    try {
      // const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      const res = await axios.post(`${Url}/fee/create`,data)
      console.log(res)

      // return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message );

      // return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const createfeeSlice = createSlice({
  // name
  name: 'create/Fee',
  reducers: {
    resetFeeState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    // pending
    builder.addCase(createFeeFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled



    // rejected

    builder.addCase(createFeeFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});

export const { resetFeeState } = createfeeSlice.actions;
