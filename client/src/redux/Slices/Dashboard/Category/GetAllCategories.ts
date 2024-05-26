import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';


interface category {
  catId: string;
  catName: string;
  catDescription: string;
  catImage: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: false;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as category[],
};

// extra reducer via createasynthunk

export const getAllCategoryFn = createAsyncThunk(
  'getall/category',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<any>(`${Url}/category/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllCategorySlice = createSlice({
  // name
  name: 'getall/category',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllCategoryFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllCategoryFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllCategoryFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
