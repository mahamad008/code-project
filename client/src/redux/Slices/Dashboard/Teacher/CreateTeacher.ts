import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  Url, errorMsg } from '../../../../interfaces';

export interface createTeacherData {
	Name:string,
  method: "$",

	Amount:any,
	// courceId:any,
	phone:string
}

const initialState = {
  data: {} as createTeacherData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};
export const createTeacherFn = createAsyncThunk(
  'create/Teacher',
  async (data: createTeacherData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${Url}/Teacher/create`, data);

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const createTeacherSlice = createSlice({
  // name
  name: 'createTeacher',
  reducers: {
    resetTeacherState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    // pending
    builder.addCase(createTeacherFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(createTeacherFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(createTeacherFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
export default createTeacherSlice
export const { resetTeacherState } = createTeacherSlice.actions;
