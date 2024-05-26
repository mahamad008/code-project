import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './update.css'
import { CancelRounded, Edit } from '@mui/icons-material'
import { Url } from '../../../interfaces'
const Updatecategory = () => {
    const {catId}=useParams()
    const [catName, setCatName] = useState('');
    const [catDescription, setcatDescription] = useState('');
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get(`${Url}/category/get/one/`+catId)
  .then(res=>{
    setCatName(res.data.catName)
   setcatDescription(res.data.catDescription)

   console.log(res.data)
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put(`${Url}/category/edit/`+catId,{catName,catDescription})
      navigate('/dashboard/categories')
    }
  return (
    <div className='updatecontiner shadow'>
      <h1 className='text-2xl text-center uppercase'>Edit Category</h1>
        <form className='' onSubmit={handlesubmit}>

             <div className="">
             <label htmlFor="">Name</label> <br />
            <input type="text"  value={catName} onChange={(e)=>setCatName(e.target.value)}/> <br />
        
              <label htmlFor="">Description</label> <br />
             <input type="text" value={catDescription} onChange={(e)=>setcatDescription(e.target.value)}/> <br/>
         
             </div>
       
            
          <div className="flex gap-4">
          <button className='bg-red-500 py-2 px-16 mx-2 rounded hover:bg-red-600 text-white'><Edit/></button>
            <button className='bg-green-500 py-2 px-16 mx-2 rounded hover:bg-green-600 text-whitee' ><Link to={'/dashboard/categories'}><CancelRounded style={{fontSize:"30px"}}/></Link></button>
          </div>
        </form>
        
    </div>
  )
}

export default Updatecategory