import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg, userRegisterInterface } from '../../../../interfaces';


interface response {
  userID: number;
  givenName: string;
  username: string;
  email: string;
  password: string;
  joinedAt: string;
  Role: string;
  isAdmin: boolean;
}

interface stateInterface {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  data: response;
}

const initialState: stateInterface = {
  data: {} as response,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: '',
};

// register function
export const registerFn = createAsyncThunk(
  'user/register',
  async (data: userRegisterInterface, { rejectWithValue }) => {
    try {
      const res= await axios.post(
        `${Url}/user/register`,
        data
      );

      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(errorMsg);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  reducers: {
    resetRegisterState: () => {},
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerFn.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = {} as response;
      state.errorMsg = '';
    });
    // fullfilled
    builder.addCase(registerFn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload as response;
      state.errorMsg = '';
    });

    // error

    builder.addCase(registerFn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = {} as response;
      state.errorMsg = String(action.payload);
    });
  },
});

export default registerSlice;
export const { resetRegisterState } = registerSlice.actions;
