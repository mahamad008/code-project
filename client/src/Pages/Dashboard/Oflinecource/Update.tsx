import { Cancel,Edit } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Url } from '../../../interfaces'
// import './update.css'
const UpdateOflinecource = () => {
    const {id}=useParams()
   
    const [teacherId, setteacherId] = useState<number>();
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [shift, setshift] = useState('');
    const [OflineCategoryId, setOflineCategoryId] = useState<number>();
    
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get(`${Url}/oflinecource/get/one/`+id)
  .then(res=>{
    setOflineCategoryId(res.data.OflineCategoryId)
   setteacherId(res.data.teacherId)
   setName(res.data.Name)
   setshift(res.data.shift)
   setDescription(res.data.Description)
   

  console.log(res.data)
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put(`${Url}/oflinecource/update/`+id,{OflineCategoryId,teacherId,Description,Name,shift})
   
       navigate('/dashboard/oflinecources')
     
    }
  return (
    <div style={{borderRadius:"10px"}} className='salarycontiner m-4 shadow-md bg-gray-100'>
        <form onSubmit={handlesubmit}>
             <label htmlFor="">OflineCategoryId :</label> <br />
            <input type="number"  value={OflineCategoryId} onChange={(e)=>setOflineCategoryId(Number(e.target.value))}/>
            <label htmlFor="">TeacherId:</label> <br />
            <input type="number" value={teacherId} onChange={(e)=>setteacherId(Number(e.target.value))}/> <br />
            <label htmlFor="">Description</label> <br />
            <input type="text" value={Description} onChange={(e)=>setDescription(e.target.value)}/> <br />
            <label htmlFor="">Cource Name:</label> <br />
            <input type="text" value={Name} onChange={(e)=>setName(e.target.value)}/> <br />
            <label htmlFor="">Shift cource:</label> <br />
            <input type="text" value={shift} onChange={(e)=>setshift(e.target.value)}/> <br />
           
            <div className="text-right m-4">
            <button className='text-yellow-400'><Edit/></button>
            <Link className='text-red-400' to={'/dashboard/oflinecources'}><button><Cancel/></button></Link>
            </div>
        </form>
    </div>
  )
}

export default UpdateOflinecource