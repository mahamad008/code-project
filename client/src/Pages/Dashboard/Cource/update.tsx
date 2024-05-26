import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './update.css'
import { Cancel, Edit } from '@mui/icons-material'
import { Url } from '../../../interfaces'
const UpdateCource = () => {
    const {id}=useParams()
    const [CategoryId, setCategoryId] = useState<number>();
    const [title, setName] = useState('');
    const [Shortdescription, setShortdescription] = useState('');
    const [price, setprice] = useState('');
    const [image, setimage] = useState('');
    const [courceId, setcourceId] = useState<number>();
   
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get(`${Url}/cource/get/one/`+id)
  .then(res=>{
    setCategoryId(res.data.CategoryId)
    setcourceId(res.data.courceId)
    setimage(res.data.image)
    setprice(res.data.price)
    setName(res.data.title)
    setShortdescription(res.data.Shortdescription)
  console.log(res.data)
  // alert("successeded")
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put(`${Url}/cor/update/`+id,{Shortdescription,price,title,CategoryId,courceId})
   
       navigate('/dashboard/Cources')
     
    }
  return (
    <div className='courceContiner rounded  border m-4 p-2'>
        <form  onSubmit={handlesubmit} >

            <label htmlFor="">CategoryId:</label> <br />
            <input className='border rounded py-4' type="number" value={CategoryId} onChange={(e)=>setCategoryId(Number(e.target.value))}/> <br />
            <label htmlFor="">Name:</label> <br />
            <input className='border rounded py-4' type="text" value={title} onChange={(e)=>setName(e.target.value)}/> <br />
            <label htmlFor="">Short Description:</label> <br />
            <input className='border rounded py-4' type="text"  value={Shortdescription} onChange={(e)=>setShortdescription(e.target.value)}/> <br />
         
            <label htmlFor="">price:</label> <br />
            <input className='border rounded py-4' type="text"  value={price} onChange={(e)=>setShortdescription(e.target.value)}/> <br />
            <label htmlFor="">Image Preview:</label> <br />
            <input className='border rounded py-4' type="file" value={image} accept='image/*' /> <br />
            <label htmlFor="">Video Preview:</label> <br />
            <input className='border rounded py-4' type="file" accept='video/*' /> <br />
            <div className="mt-2 flex items-center mb-2 ">
              <button className='bg-green-500 py-2 px-16 mx-2 rounded hover:bg-green-600 text-white'><Edit/></button>
              <Link className='bg-red-500 py-2 px-16 mx-2 rounded hover:bg-red-600 text-white' to={'/dashboard/cources'}><button><Cancel/></button></Link>
            </div>
        </form>
    </div>
  )
}

export default UpdateCource