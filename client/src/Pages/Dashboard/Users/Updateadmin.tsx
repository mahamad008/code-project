import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './update.css'
import { Cancel, Edit } from '@mui/icons-material'
import { Url } from '../../../interfaces'
const UpdateUserAdmin= () => {
    const {id}=useParams()
    const [givenName, setgivenName] = useState('');
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    // const [isAdmin, setisAdmin] = useState('');
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get(`${Url}/user/get/one/${id}`)
  .then(res=>{
    setgivenName(res.data.givenName)
    setusername(res.data.username)
    setemail(res.data.email)
    setpassword(res.data.password)
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      // const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      axios.put(`${Url}/user/remove/`+id,{email,givenName,username,password},{
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      
   
       navigate('/dashboard/users')
     
    }
    console.log(handlesubmit)
    const handleRemoveuser =(e:React.FormEvent)=>{
      e.preventDefault();
      // const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      axios.put(`${Url}/user/remove/`+id,{email,givenName,username,password},{
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      
   
       navigate('/dashboard/users')
     
    }
    console.log(handleRemoveuser)
  return (
    <div className='updateusercontiner  rounded-md shadow-md bg-gray-100 m-3 p-3'>
        <form  onSubmit={handlesubmit}>

            <label htmlFor="">FullName</label> <br />
            <input type="text" value={givenName} onChange={(e)=>setgivenName(e.target.value)}/> <br />
            <label htmlFor="">UserName</label> <br />

            <input type="text" value={username} onChange={(e)=>setusername(e.target.value)}/> <br />
             <label htmlFor="">Password</label> <br />
            <input type="text" value={password} onChange={(e)=>setpassword(e.target.value)}/> <br />
            <label htmlFor="">Email</label> <br />
            <input type="text" value={email} onChange={(e)=>setemail(e.target.value)}/> <br />
            <div className="text-right m-2">
            <button className='text-red-500'><Edit/></button>
         <Link to={'/dashboard/users'}className='text-purple-400'> <button><Cancel/></button></Link>
            </div>
        </form>
    </div>
  )
}

export default UpdateUserAdmin