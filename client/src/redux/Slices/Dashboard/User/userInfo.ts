import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')!): {token:'',id:'',isPaid:false,isAdmin:false};

const userInfoSlice = createSlice({
  // name
  name: 'userinfo',
  reducers: {
    setUser: (state, action) => {
      state.givenName = action.payload.givenName;
      state.id =action.payload.id
      // state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
      state.isPaid =action.payload.isPaid;
   
      // state.id = action.payload.id;
      state.token = action.payload.token;

      localStorage.setItem('userInfo', JSON.stringify(state));
      // localStorage.setItem(id,JSON.stringify(state));
 
    },

    Logout: (state) => {
      localStorage.removeItem('userInfo');
      state.username = '';
      state.givenName = '';
      state. isAdmin=false;
      state.isPaid =false;
      state.token = '';
    },
  },
  initialState,
});

export default userInfoSlice;
export const { setUser, Logout } = userInfoSlice.actions;
