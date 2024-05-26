
import React, {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './CreateExam.css'


import { AppDispatch } from '../../../redux/store';
import {  createExamFn } from '../../../redux/Slices/Dashboard/Exam/CreateExam';
import { InputLabel,FormControl, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { Url } from '../../../interfaces';
// import {  } from 'react-bootstrap';
interface Course {
  SubcourceId: string; // Adjust this according to the actual type of SubcourceId
  Title: string;
  // Add other properties if necessary
}
export const CreateExam= () => {
const Dispatch=useDispatch<AppDispatch>()
const [cources, setCources] = useState<Course[]>([]);

 const [CourceName,setCourceName]=useState('')
 const[SubcourceId,setSubcourceId]=useState('')
  const[studentId,setstudentId]=useState('')
  const[Studentname,setStudentname]=useState('')
  const[studentPhone,setstudentPhone]=useState('')
  const[Total,setTotal]=useState('')
  const[Totalscore,setTotalscore]=useState('')
  const [userId, setuserId] = useState('');
  useEffect(()=>{
    const storedId = localStorage.getItem('n');
   setuserId(storedId!);
  },[])
const handlesupmit=()=>{
  const data:any={
    Studentname,
    studentPhone,
    CourceName,
    Total,
    Totalscore,
    studentId,
    SubcourceId,
    userId
  }
  Dispatch(createExamFn(data)).then((resp)=>{
    console.log(resp)
  }).catch((error)=>{
    console.log(error)
  })

  
}
useEffect(()=>{
  const res=async()=>{
     const response=await axios.get(`${Url}/subcource/get/all`)
     setCources(response.data.result)
  }
  res()
 },[])
const handlestudentidChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
  const id =(e.target.value)
  setstudentId(id)
  axios.get(`${Url}/student/get/one/${id}`)
  .then((response)=>{
    const {Name,phone}=response.data;
    setStudentname(Name)
    setstudentPhone(phone)
  })}
  const handlecourceidchange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const id =(e.target.value)
    setSubcourceId(id)
    axios.get(`${Url}/subcource/get/one/${id}`)
    .then((response)=>{
      const {Title}=response.data;
      setCourceName(Title)
    })
  }
  console.log(handlecourceidchange)
  return (
    <div className="w-[500px] max-w-md p-6 bg-white rounded shadow">
    <h1 className="mb-6 w-100 text-2xlfont-bold text-center"></h1>
    <form onSubmit={handlesupmit}>
    <FormControl className='my-2' fullWidth >
          <InputLabel id="demo-simple-select-label">Choose sub cource</InputLabel>
          <Select
fullWidth
value={CourceName}
onChange={(e:any) => {
  setCourceName(e.target.value as string);
  const selectedCource = cources.find(
    (cource) => cource.Title === e.target.value
  );
  if (selectedCource) {
    setSubcourceId(selectedCource.SubcourceId);
    setCourceName(selectedCource.Title);
  }
}}
>
{cources.map((cource) => (
  <MenuItem className="w-full" key={cource.SubcourceId} value={cource.Title}>
    {cource.Title}
  </MenuItem>
))}
</Select>


      </FormControl>

      <div className="mb-4">
        <input
          type="text"
          id="studentId"
          value={studentId}
          placeholder="Enter studentId"
          onChange={handlestudentidChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="Studentname"
          value={Studentname}
          placeholder="Enter student Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="studentPhone"
          value={studentPhone}
          placeholder="Enter student phone"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="Total"
          value={Totalscore}
          placeholder="Enter the Score needed"
          onChange={(e) => setTotalscore(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="Total"
          value={Total}
          placeholder="Enter  Score earned"
          onChange={(e) => setTotal(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
 
      <button
        type="submit"
        className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
      >
        Save
      </button>
    </form>
  </div>
  );
};

