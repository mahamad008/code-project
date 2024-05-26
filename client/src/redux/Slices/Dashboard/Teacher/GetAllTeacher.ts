import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

interface TeacherResponse {
  isSuccess: boolean;
  result: Teacher[];
}

interface Teacher {
  Id: string;
  Name:string,
  phone:string,
  Amount:string,
  isDeleted:boolean,
  // courceId:string,
  method:any;
  createdAt:string,
  UpadatedAt:string
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as Teacher[],
};

// extra reducer via createasynthunk

export const getAllTeacherFn = createAsyncThunk(
  'getall/Teacher',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<TeacherResponse>(`${Url}/Teacher/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllTeacherSlice = createSlice({
  // name
  name: 'getall/Teacher',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllTeacherFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllTeacherFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllTeacherFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
