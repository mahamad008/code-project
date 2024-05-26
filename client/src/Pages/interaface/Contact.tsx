
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AppDispatch, RootState } from '../../redux/store';
import { contactFn,ResetcontactState } from '../../redux/Slices/contactSlice';



const Contacts = () => {
  const toastId: string = 'contactingtoast';
  const[Name,setName]=useState('')
  const[email,setemail]=useState('')
  const[message,setmessage]=useState('')
  const dispatch = useDispatch<AppDispatch>();
  const ContactsState = useSelector((state: RootState) => state.contact);
  const navigate = useNavigate();
  const handlesubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    const data={
      email,
              
      Name,
      message 
    }
   
    if(!Name ||!email ||!message){
   return  toast.error('please fulfill the requrement information ',{id:toastId})
    }
    dispatch(contactFn(data))
    toast.loading('Sending', { id: toastId });
  }
    useEffect(() => {
      if (ContactsState.isSuccess) {
        toast.success('Sent Successfully', { id: toastId });
        navigate('/');
      }
      if (ContactsState.isError)
        toast.error(ContactsState.errorMsg, { id: toastId });
      dispatch(ResetcontactState());
    }, [ContactsState.isSuccess, ContactsState.isError]);
  
    useEffect(() => {
      if (localStorage.getItem('userInfo')) {
        navigate('/');
      }
    }, []);
  
    
  
  return (
    <div className="contact-page">
      <div className='touch'>
        <h1 style={{fontWeight:700,fontSize:25}}>Get in touch</h1>
        <p>Email:United@gmail.com</p>
        <p>phone:0002520634098646</p>
        <p>United is the best place you</p>
        <p>Learn anything</p>
      </div>
<form onSubmit={handlesubmit} className="contact-form">
<h2>Contact Us</h2>
       <div>
       <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} name="name" placeholder="Your Name" />
        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} name="email" placeholder="Your Email" />
       </div>
        <textarea value={message} onChange={(e)=>setmessage(e.target.value)} name="message" placeholder="Your Message" rows={7} />
        <button type="submit">{ContactsState.isLoading ?'Sending':'Send'}</button>
      </form>
</div>
 
  );
};

export default Contacts;