import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url } from '../../interfaces';
export interface Responsecontactcreate {
  email:string,
              
  Name:string,
  message:string
}


const initialState={
  data: {} as Responsecontactcreate,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: '',
};

// register function
export const contactFn = createAsyncThunk(
  'contact/new',
  async (data: Responsecontactcreate, {  }) => {
    try {
      const res = await axios.post(
        `${Url}/contact/new`,
        data
      );

    //   localStorage.setItem('user', JSON.stringify(res.data));
      console.log(data);
      return res.data;
      
    } catch (error) {
      if (error instanceof AxiosError) {
    console.log(error)
      }
console.log(error)
    }
  }
);

const CreatecontactSlice = createSlice({
  name: 'createcontact',
  reducers: {
    ResetcontactState: () => {},
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(contactFn.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.data = {} as Responsecontactcreate ;
      state.errorMsg = '';
    });
    // fullfilled
    builder.addCase(contactFn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload as   Responsecontactcreate ;
      state.errorMsg = '';
    });

    // error

    builder.addCase(contactFn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = {} as Responsecontactcreate ;
      state.errorMsg = String(action.payload);
    });
  }, 
});

export default CreatecontactSlice;
export const { ResetcontactState } = CreatecontactSlice.actions;

