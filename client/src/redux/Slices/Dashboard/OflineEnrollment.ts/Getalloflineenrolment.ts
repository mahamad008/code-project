import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

interface OflineEnrollmentResponse {
  isSuccess: boolean;
  result: OflineEnrollment[];
}

interface OflineEnrollment {
    studentId:any;
    id:any;
    OflinecourceId:any
    StudentName:any;
    createdAt:any;
    UpadatedAt:any;
    isDeleted:Boolean;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as OflineEnrollment[],
};

// extra reducer via createasynthunk

export const getAllOflineEnrollmentFn = createAsyncThunk(
  'getall/OflineEnrollment',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<OflineEnrollmentResponse>(`${Url}/ofllinenrollment/get/all/data`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllOflineEnrollmentSlice = createSlice({
  // name
  name: 'getall/OflineEnrollment',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllOflineEnrollmentFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllOflineEnrollmentFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllOflineEnrollmentFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
