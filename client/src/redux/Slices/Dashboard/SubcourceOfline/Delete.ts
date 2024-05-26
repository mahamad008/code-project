import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "../../../../interfaces";



export const DeleteOflineFn=createAsyncThunk(
    '/delete/id',
    async(id:Number,{})=>{
        try {
         await axios.delete(`${Url}/oflinecource/delete/${id}`)
            .then((res)=>{
                alert('Deleted successfully')
                console.log(res)
                location.reload()
            })
        } catch (error) {
            
        }
    }
)