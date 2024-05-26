import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './update.css'
import {  Edit } from '@mui/icons-material'
import { Url } from '../../../interfaces'
const UpdateSalary = () => {
    const {id}=useParams()
   
    const [teacherId, setteacherId] = useState<number>();
    const [TeacherPhone, setTeacherPhone] = useState('');
    const [TeacherName, setTeacherName] = useState('');
    const [method, setmethod] = useState('');
    const [Amount, setAmount] = useState<number>();
    
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get(`${Url}/Salary/get/one/`+id)
  .then(res=>{
    setAmount(res.data.Amount)
   setteacherId(res.data.teacherId)
   setTeacherPhone(res.data.TeacherPhone)
   setTeacherName(res.data.TeacherName)
   setmethod(res.data.method)
   

  console.log(res.data)
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put(`${Url}/salary/update/`+id,{Amount,teacherId,method,TeacherName,TeacherPhone})
   
       navigate('/dashboard/Salary')
     
    }
  return (
    <div className='salary-container border p-4'>
    <form onSubmit={handlesubmit} className="space-y-4">
      <div>
        <label htmlFor="amount">Amount salary $:</label>
        <input
          type="number"
          id="amount"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={Amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
  
      <div>
        <label htmlFor="teacherId">Teacher ID:</label>
        <input
          type="number"
          id="teacherId"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={teacherId}
          onChange={(e) => setteacherId(Number(e.target.value))}
        />
      </div>
  
      <div>
        <label htmlFor="teacherName">Teacher Name:</label>
        <input
          type="text"
          id="teacherName"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={TeacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
      </div>
  
      <div>
        <label htmlFor="teacherPhone">Teacher Phone:</label>
        <input
          type="text"
          id="teacherPhone"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={TeacherPhone}
          onChange={(e) => setTeacherPhone(e.target.value)}
        />
      </div>
  
      <div className="flex justify-end space-x-4">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          <Edit/> Update
        </button>
        <Link to={'/dashboard/salary'} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
          Cancel
        </Link>
      </div>
    </form>
  </div>
  
  )
}

export default UpdateSalary