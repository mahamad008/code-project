
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url } from '../../../../interfaces';

export interface createSalaryData {
  Amount:number
  teacherId:number
  TeacherPhone:string
  TeacherName:string
}

const initialState = {
  data: {} as createSalaryData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};

// async thunk

export const createSalaryFn = createAsyncThunk(
  'Salary/create',
  async (data: createSalaryData, { rejectWithValue }) => {
    try {
            const res = await axios.post(`${Url}/Salary/create`, data);

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message );

      // return rejectWithValue(errorMsg);
    }
  }
);

export const creatSalarySlice = createSlice({
  name: 'createSalary',
  reducers: {
    resetSalaryState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    builder.addCase(createSalaryFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    builder.addCase(createSalaryFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));
    builder.addCase(createSalaryFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});

export const { resetSalaryState } = creatSalarySlice.actions;
