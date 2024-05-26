import { Cancel, Edit } from '@mui/icons-material'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Url } from '../../../interfaces'
const UpdateOflineEnrollment = () => {
    const {id}=useParams()
    const [studentId, setstudentId] = useState<number>();
    const [StudentName, setName] = useState('');
    const [OflinecourceId, setOflinecourceId] = useState<number>();
    
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get(`${Url}/ofllinenrollment/featch/only/`+id)
  .then(res=>{
    setOflinecourceId(res.data.OflinecourceId)
   setstudentId(res.data.studentId)
   setName(res.data.StudentName)
  //  setDescription(res.data.Description)
   

  console.log(res.data)
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put(`${Url}/ofllinenrollment/update/`+id,{OflinecourceId,studentId,StudentName})
   
       navigate('/dashboard/OFlineenrollment')
     
    }
  return (
    <div className='salarycontiner rounded border'>
      <h1 className='text-2xl uppercase font-bold text-center' style={{letterSpacing:1}}>Edit Enrollmet Student</h1>
        <form onSubmit={handlesubmit}>

           

             <label htmlFor="">OflinecourceId</label> <br />
            <input type="number"  value={OflinecourceId} onChange={(e)=>setOflinecourceId(Number(e.target.value))}/>
            <label htmlFor="">studentId:</label> <br />
            <input type="number" value={studentId} onChange={(e)=>setstudentId(Number(e.target.value))}/> <br />
            <label htmlFor="">StudentName:</label> <br />
            <input type="text" value={StudentName} onChange={(e)=>setName(e.target.value)}/> <br />
            <div className="flex gap-4 items-center">
            <button className='bg-green-500 px-8 py-1 text-white hover:bg-green-600 rounded  '><Edit/></button>
            <Link  to={'/dashboard/OFlineenrollment'}><button className='bg-red-500 px-8 py-1 text-white hover:bg-red-600 rounded '><Cancel /></button></Link>
            </div>
        </form>
    </div>
  )
}

export default UpdateOflineEnrollment