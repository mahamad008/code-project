import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../../interfaces";



export const DeleteOflineFn=createAsyncThunk(
    '/delete/id',
    async(id:Number,{})=>{
        try {
            const res =await axios.put(`${Url}/oflinecource/trash/${id}`)
             location.reload()
             console.log(res)
        } catch (error) {
            
        }
    }
)