import  { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import {  createStudentFn, resetStudentState } from '../../../redux/Slices/Dashboard/Student/Createstudent';
// import axios from 'axios';

import 'quill/dist/quill.snow.css'
import './StudentCreate.css'
export const CreateStudent = () => {
  const toastId = 'createStudent';
  const [Name, setName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [Amount, setAmount] = useState<number>(); // Changed to number

  const createStudentState = useSelector((state: RootState) => state.createstudent);
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data:any = {
      Name,
      email,
      phone,
      Amount
    };
    if (!Name || !email) {
      return toast.error('Please provide valid data', { id: toastId });
    }
    dispatch(createStudentFn(data));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (createStudentState.isLoading)
      toast.loading('Saving...', { id: toastId });

    if (createStudentState.isSuccess) {
      toast.success('Successfully created.', { id: toastId });
      navigate('/dashboard/categories');
    }

    if (createStudentState.isError) {
      toast.error(createStudentState.errorMsg, { id: toastId });
    }

    dispatch(resetStudentState());
  }, [
    createStudentState.isLoading,
    createStudentState.isSuccess,
    createStudentState.isError,
  ]);

  return (
  
   
      <div className='CreateStudentcontiner'>
        <form onSubmit={handleSubmit}>
        <input type='text' />
          <div className=''>
            <input
          
              type='text'
              placeholder='Student name'
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className=''>
            <input
          
              type='email'
              placeholder='Student Email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
             required/>
          </div>
          <div className=''>
            <input
          
              type='text'
              placeholder='Student phone'
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
          </div>
          <div className=''>
            <input
          
              type='number' // Changed to number type
              placeholder='Student fee Amount'
              value={Amount}
              onChange={(e) => setAmount(Number(e.target.value))} // Convert the input value to a number
            />
          </div>
          <div className='btnscreatestudent'>
            <button className='bstsave'>
              {createStudentState.isLoading ? 'Loading...' : 'Save'}
            </button>
            <Link  className='bbck' to={'/dashboard/students'}> <button>Cancel</button></Link>
          </div>
       
        </form>
        
      </div>
   
  );
};