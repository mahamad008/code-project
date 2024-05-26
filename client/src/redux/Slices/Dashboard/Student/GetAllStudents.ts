
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

interface StudentResponse {
  isSuccess: boolean;
  result: Student[];
}

interface Student {
  Id:number
  Name:string
  Address:string  
  phone:string
  Amount:string
  isDeleted:Boolean
  createdAt:string
  UpadatedAt:string
  CourceId:string
  method:any;
}

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as Student[],
};


export const getAllStudentFn = createAsyncThunk(
  'getall/Student',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<StudentResponse>(`${Url}/Student/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllStudentSlice = createSlice({
  // name
  name: 'getall/Student',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllStudentFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllStudentFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllStudentFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
