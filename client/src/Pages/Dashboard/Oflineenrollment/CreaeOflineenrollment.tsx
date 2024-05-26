import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { createOflineenrollmentFn } from '../../../redux/Slices/Dashboard/OflineEnrollment.ts/CreateEnrollment'
import axios from 'axios'
import { Url } from '../../../interfaces'

const CreateOflineenrollment = () => {
  const Dispatch=useDispatch<AppDispatch>()
// const createcourceofline =useSelector((state:RootState)=>state.Createcourceofline)
const [studentId,setstudentId]=useState('')
const [OflinecourceId,setOflinecourceId]=useState('')
const [StudentName,setStudentName]=useState('')
const handlesubmit=()=>{
const data:any ={
  studentId,
  OflinecourceId,
  StudentName
}
Dispatch(createOflineenrollmentFn(data))
}
const handlestudenteIdchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  try {
    const id=(e.target.value)
    setstudentId(id)
    axios.get(`${Url}/student/get/one/`+id).then((response)=>{
      const {Name}=response.data;
      setStudentName(Name)
    })
  } catch (error) {
    
  }
}
  return (

    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-[300px] max-w-md p-6 bg-white rounded shadow">
        <h1 className="mb-6 w-100 text-2xlfont-bold text-center"></h1>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={studentId}
              placeholder="Enter studentId"
              onChange={handlestudenteIdchange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="description" 
              value={OflinecourceId}
              placeholder="Enter OflinecourceId"
              onChange={(e) => setOflinecourceId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="teacherId"
              value={StudentName}
              placeholder="Enter StudentName"
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateOflineenrollment