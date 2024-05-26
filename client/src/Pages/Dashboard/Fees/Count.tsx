import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Url } from '../../../interfaces'

const CountFee = () => {
    const [count,setcount]=useState()
    useEffect(()=>{
   const fetchcount=async()=>{
    const res=await axios.get(`${Url}/fee/get/all`)
    setcount(res.data.result.length)
   }
   fetchcount()
    },[])
  return (
    <div>
        {count}
    </div>
  )
}

export default CountFee