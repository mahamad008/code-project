import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Upadate.css'
import { Cancel, Edit } from '@mui/icons-material'
import { Url } from '../../../interfaces'
const UpdateStudent = () => {
  const [method, setMethod] = useState('');
    const {id}=useParams()
    const [Name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [phone, setphone] = useState('');
    const [Amount, setAmount] = useState<number>();
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get(`${Url}/Student/get/one/`+id)
  .then(res=>{
    setphone(res.data.phone)
    setMethod(res.data.method)
   setAddress(res.data.Address)
   setName(res.data.Name)
   setAmount(res.data.Amount)

  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      axios.put(`${Url}/student/update/`+id,{phone,Name,method,Address,Amount},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
   
       navigate('/dashboard/Students')
     
    }
  return (
    <div className=' m-3 p-4 bg-orange-100 rounded  border'>
      <h1 className='text-2xl text-center font-bold border-b-2 border-green-500 border-dashed' style={{letterSpacing:3}}>EDIT STUDENT AND BE CAREFULL IT WILL BE UPDATED PERMANENTLY</h1>
        <form onSubmit={handlesubmit}>

           <div className="">
           <p>Student Name:</p><br/>
            <input className='border w-full rounded' type="text" value={Name} onChange={(e)=>setName(e.target.value)}/> <br />
       
           </div>
            <p>Address:</p> <br/>
            <input  className='border w-full rounded' type="text" value={Address} onChange={(e)=>setAddress(e.target.value)}/> <br />
            <p>Phone Number:</p> <br/>
            <input  className='border w-full rounded' type="text"  value={phone} onChange={(e)=>setphone(e.target.value)}/> <br />
           
           <div style={{gap:'20px'}} className="mt-4  text-right">
           <button className='border bg-orange-500 rounded px-8  py-2'><Edit/></button>
            <button className='border bg-green-500 rounded px-8  py-2'><Link to={'/dashboard/students'}><Cancel/></Link></button>
           </div>
        </form>
    </div>
  )
}

export default UpdateStudent