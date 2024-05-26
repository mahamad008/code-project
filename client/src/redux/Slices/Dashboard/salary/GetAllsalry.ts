
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

interface SalaryResponse {
  isSuccess: boolean;
  result: Salary[];
}

interface Salary {
  id:string
  Amount:string
  isDeleted:boolean
  createdAt:string
  TeacherName:string;
  TeacherPhone:string;
  UpadatedAt:string
  teacherId:string
  method:any;
  userId:any;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as Salary[],
};

// extra reducer via createasynthunk

export const getAllSalaryFn = createAsyncThunk(
  'get/all',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<SalaryResponse>(`${Url}/Salary/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllSalarySlice = createSlice({
  // name
  name: 'getall/Salary',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllSalaryFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllSalaryFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllSalaryFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
