import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {  Url, errorMsg } from '../../../../interfaces';


interface userResponse {
  isSuccess: boolean;
  result: user[];
}

interface user {
  id:string
  givenName:String
  username:String
  email:String
  password:String
  IsDeleted:Boolean;
  joinedAt:string
  isAdmin:string
  updatedAt:string
  createdAt:string
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as user[],
};

// extra reducer via createasynthunk

export const getAlluserFn = createAsyncThunk(
  'getall/user',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<userResponse>(`${Url}/user/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAlluserSlice = createSlice({
  // name
  name: 'getall/user',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAlluserFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAlluserFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAlluserFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
