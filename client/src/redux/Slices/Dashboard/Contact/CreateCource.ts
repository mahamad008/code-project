
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url } from '../../../../interfaces';
// import { Url, errorMsg } from '../../../../interfaces';

export interface createCourceData {
  image:any,
  videoTwo:any,
  video:any,
  Name: string,
  shortDescription: string,
  price: number,
  CategoryId: number,
  TeacherId: number,
  whatYouLearn: string,

  Description:string

}

const initialState = {
  data: {} as createCourceData,
  isSuccess: false,
  isError: false,
  isLoading: false, 
     };

// async thunk

export const createCourceFn = createAsyncThunk(
  'cource/create',
  async (data: createCourceData, {  }) => {
    try {
      // const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      const res = await axios.post(`${Url}/cor/upload`, data)
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError){
        console.log(AxiosError)
      }
        // return rejectWithValue(error.response?.data.message );
console.log(error)
      // return rejectWithValue(errorMsg);
    }
  }
);


export const createCourceSlice = createSlice({
  // name
  name: 'create/Cource',
  reducers: {
    resetCourceState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    // pending
    builder.addCase(createCourceFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(createCourceFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(createCourceFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});

export const { resetCourceState } = createCourceSlice.actions;
