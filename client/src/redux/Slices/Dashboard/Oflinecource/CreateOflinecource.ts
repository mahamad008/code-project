import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { Url } from "../../../../interfaces"




const initialState={
    isLoading:false,
    isError:false,
    errorMsg:'',
    data:[],
    isSuccuss:false
}
// interface Respnsedata{
//     OflineCategoryId:any;
//     shift:any;
//     teacherId:any;
//     Description:any;
//     Name:any;
// }
export const CreateCourceOflinefn=createAsyncThunk(
    '/create/cource',
    async(data:any,{})=>{
    try {
        const res=axios.post(`${Url}/oflinecource/new`,data)
        
  
    console.log(res)
    } catch (error) {
        if(error instanceof AxiosError){
            return {
                message:"Something went wrong please try again",
            }
        }
    }
    }
)
const Createoflincource=createSlice({
    initialState,
    name:'Createofliceource',
    reducers:{

    }
})
export default Createoflincource