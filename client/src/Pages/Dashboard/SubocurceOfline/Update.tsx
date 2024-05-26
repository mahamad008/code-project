import { Cancel, Edit } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { Url } from '../../../interfaces'
// import './update.css'
const Udateoflinesubcource = () => {
    const {id}=useParams()
   
    // const [teacherId, setteacherId] = useState<number>();
    const [Title, settitle] = useState('');
    const [Description, setDescription] = useState('');
    // const [shift, setshift] = useState('');
    const [OflinecourceId, setOflinecourceId] = useState<number>();
    
const navigate =useNavigate()
  
    useEffect(()=>{
const fetchsubcource=async()=>{
  const res=await axios.get(`${Url}/subcource/get/one/`+id)
  setOflinecourceId(res.data.OflinecourceId)
  settitle(res.data.Title)
  setDescription(res.data.Description)
}
 fetchsubcource()   },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put(`${Url}/subcource/update/`+id,{OflinecourceId,Description,Title})
       navigate('/dashboard/Subcource')
    }
  return (
    <div className=" bg-gray-100  border  m-4">
    <div className="w-[300px]= p-6 bg-white rounded shadow">
      <h1 className="mb-6 w-100 text-2xl font-bold border-b text-center" style={{letterSpacing:5}}>Edit Subcource</h1>
      <form onSubmit={handlesubmit}>
        <div className="mb-4">
          <label htmlFor="">Cource Name:</label> <br />
          <input
            type="text"
            id="name"
            value={Title}
            placeholder="Enter course name"
            onChange={(e) => settitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Cource Description</label> <br />
          <input
            type="text"
            id="description"
            value={Description}
            placeholder="Enter course description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Ofline courceId:</label> <br />
          <input
            type="text"
            id="teacherId"
            value={OflinecourceId}
            placeholder="Enter teacher ID"
            onChange={(e) => setOflinecourceId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
    <div className="text-right">
    <button
          type="submit"
          className="bg-green-500 px-4 py-2 mr-2 text-white rounded focus:outline-none"
        >
          <Edit/>
        </button>
        <button
          type="submit"
          className="py-2 text-orange-600 border px-5 bg-orange-400 rounded  focus:outline-none"
        >
          <Cancel/>
        </button>
    </div>
      </form>
    </div>
  </div>
  )
}

export default Udateoflinesubcource