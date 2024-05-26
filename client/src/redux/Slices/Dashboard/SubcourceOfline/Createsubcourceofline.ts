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
interface Respnsedata{
    Title:string
    Description:string
    OflinecourceId:any;
}
export const CreatesubcourceFn=createAsyncThunk(
    '/create/cource',
    async(data:Respnsedata,{})=>{
    try {
        const res=axios.post(`${Url}/subcource/new`,data)
        alert('Saved Successfully')
        console.log(res)
    } catch (error) {
        if(error instanceof AxiosError){
            return {
                message:"Something went wrong please contact the adminstration"
            }
        }
    }
    }
)
const CreateOflineSubcourceSlice=createSlice({
    initialState,
    name:'CreateofliSubceource',
    reducers:{

    }
})
export default CreateOflineSubcourceSlice