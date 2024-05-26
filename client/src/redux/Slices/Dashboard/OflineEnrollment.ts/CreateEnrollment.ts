import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

export interface createOflineenrollmentData {
  studentId:Number;
  StudentName:string;
    OflinecourceId:Number
}

const initialState = {
  data: {} as createOflineenrollmentData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};

// async thunk

export const createOflineenrollmentFn = createAsyncThunk(
  'create/Oflineenrollment',
  async (data: createOflineenrollmentData, { rejectWithValue }) => {
    try {
      // const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      const res = await axios.post(`${Url}/ofllinenrollment/new`, data)

     
      return res.data.result;
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message ||errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const createOflineenrollmentSlice = createSlice({
  // name
  name: 'create/Oflineenrollment',
  reducers: {
    resetOflineenrollmentState: () => initialState,
  },
  initialState,
  // extraReducers(builder) {
  //   // pending
  //   builder.addCase(createOflineenrollmentFn.pending, () => ({
  //     ...initialState,
  //     isLoading: true,
  //   }));

  //   // fulfilled

  //   builder.addCase(createOflineenrollmentFn.fulfilled, (_, action) => ({
  //     ...initialState,
  //     isSuccess: true,
  //     data: action.payload,
  //   }));

  //   // rejected

  //   builder.addCase(createOflineenrollmentFn.rejected, (_, action) => ({
  //     ...initialState,
  //     isError: true,
  //     errorMsg: String(action.payload),
  //   }));
  // },
});

export const { resetOflineenrollmentState } = createOflineenrollmentSlice.actions;
