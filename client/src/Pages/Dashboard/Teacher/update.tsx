import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Update.css'
import { Cancel, Edit } from '@mui/icons-material'
import { Url } from '../../../interfaces'
const UpdateTeacher = () => {
    const {Id}=useParams()
    const [phone, setphone] = useState('');
    // const [courceId, setcourceId] = useState<number>();
    const [Amount, setAmount] = useState<number>();
    const [Name, setName] = useState('');
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get(`${Url}/Teacher/get/one/`+Id)
  .then(res=>{
    setAmount(res.data.Amount)
  //  setcourceId(res.data.courceId)
   setphone(res.data.phone)
   setName(res.data.Name)
  console.log(res.data)
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put(`${Url}/Teacher/update/`+Id,{Amount,phone,Name})
      
       navigate('/dashboard/Teachers')
     
    }
  return (
    <div className=' shadow p-2 border'>
      <h1 className='text-green-500 text-2xl text-center border-b border-dashed font-bold'>Edit Teacher</h1>
        <form onSubmit={handlesubmit}>

            
            <label>Teacher Name</label>
            <input className='w-full rounded' type="text" placeholder='Name' value={Name} onChange={(e)=>setName(e.target.value)}/> <br />
            <div className="">
               <label>Teacher Phone</label> <br />
            <input className='w-full rounded' type="text" placeholder='phone' value={phone} onChange={(e)=>setphone(e.target.value)}/> <br />
  </div><label>Amount Salary</label> <br />
            <input className='w-full rounded' type="number"  placeholder='Amount' value={Amount} onChange={(e)=>setAmount(Number(e.target.value))}/> <br />
            <div className=" mr-2 gap-4 text-right">
              <button className='border px-8 py-2 hover:bg-green-500 hover:text-white border-green-500 text-green-500 rounded'><Edit/></button>
              <Link   className='border px-8 py-3 ml-4 hover:bg-orange-500 hover:text-white border-orange-500 text-orange-500  rounded' to={'/dashboard/teachers'}> <button><Cancel/></button></Link>
            </div>
        </form>
    </div>
  )
}

export default UpdateTeacher