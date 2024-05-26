import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  Url, errorMsg } from '../../../../interfaces';

export interface createExamData {

  Studentname:string;
  studentPhone:string;
  CourceName:string
  Total:any;
  TakeDate:any;
  UpdateDate:any;
  isDeleted:any
  courseId:any;
  studentId:any;
  SubcourceId:any;
  Totalscore:any;
}

const initialState = {
  data: {} as createExamData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};
export const createExamFn = createAsyncThunk(
  'create/Exam',
  async (data: createExamData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${Url}/Exam/create`, data);

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const createExamSlice = createSlice({
  // name
  name: 'createExam',
  reducers: {
    resetExamState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    // pending
    builder.addCase(createExamFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(createExamFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(createExamFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
export default createExamSlice
export const { resetExamState } = createExamSlice.actions;
