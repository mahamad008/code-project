
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './CreateTeacher.css'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {  RootState } from '../../../redux/store';
import { createTeacherData } from '../../../redux/Slices/Dashboard/Teacher/CreateTeacher';
import axios from 'axios';
import { Url } from '../../../interfaces';

export const CreateTeacher= () => {
  const toastId = 'createTeacCreateTeacher';
  const [Name, setName] = useState('');
  const [Amount, setAmount] = useState<number>();
  const [phone, setphone] = useState('');
  // const [courceId, setcourceId] = useState<number>();


  const createTeacCreateTeacherState = useSelector(
    (state: RootState) => state.createTeacher
  );

  const handleSubmit =async(e: any) => {
    e.preventDefault();
    const data: createTeacherData = {
      Name,
      phone,
      Amount,
      method: "$",

    //  courceId,
       
     
    };
    if(!Name ||!Amount){
      return toast.error('please provide valid data',{id:toastId})
    }
await axios.post(`${Url}/Teacher/create`,data)
location.reload()
  };



  return (
  
      <div className='registerationteacher'>
        <form onSubmit={handleSubmit}>
            <div>
              <input
               
                type='text'
                placeholder='Teacher name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='teachersalary' style={{marginTop:20}}>
              <input
               
                type='text'
                placeholder='teacher salary'
                value={Amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            {/* <div className='' style={{marginTop:20}}>
              <input
               
                type='text'
                placeholder='cource Id'
                value={courceId}
                onChange={(e) => setcourceId(Number(e.target.value))}
              />
            </div> */}
            <div>
              <input
               
                type='text'
                placeholder='phone'
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </div>

          
       <div className='btntcontiner'>
       <button className='svbtnt'>
                {createTeacCreateTeacherState.isLoading ? 'Loading...' : 'Save'}
              </button>
              <Link className='bckbtnt' to={'/dashboard/teachers'}> <button >Cancel</button></Link>
       </div>

        </form>
        
      </div>
   
  );
};
