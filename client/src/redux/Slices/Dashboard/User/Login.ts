import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

interface UserData {
  result: any; // Define the type of result here, replace 'any' with the actual type if possible
}

interface LoginState {
  data: UserData;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
}

const initialState: LoginState = {
  data: { result: null }, // Initialize result with null or appropriate initial value
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
};
export const LoginFn = createAsyncThunk(
  'user/login',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${Url}/user/login`, data);
      if (res.data) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.result));
        localStorage.setItem("n", JSON.stringify(res.data.result.id));
        return res.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message || errorMsg);
      }

      return rejectWithValue(errorMsg);
    }
  }
);

export const LoginSlice = createSlice({
  // name
  name: 'login',
  // reducers
  reducers: {
    reset: () => initialState,
  },
  // initialState
  initialState,
  //   extra reducers

  extraReducers: (builder) => {
    // case - pending
    builder.addCase(LoginFn.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMsg = '';
    });

    // case - fullfilled
    builder.addCase(LoginFn.fulfilled, (state, action) => {
      state.data.result = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });

    // case - rejected

    builder.addCase(LoginFn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = String(action.payload);
    });
  },
});

export const { reset } = LoginSlice.actions;

// Rest of the component remains unchanged