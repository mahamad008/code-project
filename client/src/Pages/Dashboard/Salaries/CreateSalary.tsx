import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import './createSalary.css'
import { toast } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import {  createSalaryFn, resetSalaryState } from '../../../redux/Slices/Dashboard/salary/Createsalary';
import { TextField } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { Url } from '../../../interfaces';

export const CreateSalary = () => {
  const toastId = 'createSalary';
  const [Amount, setAmount] = useState<number>(Number);
  const [teacherId, setteacherId] = useState<number>(Number);
  const [TeacherPhone, setTeacherPhone] = useState('');
  const [TeacherName, setTeacherName] = useState('');
  // const [Id, setId] = useState<Number>(0);
  const [method, setMethod] = useState('');
  const [open, setopen] = useState(false);
  const handleclose = () => {
    setopen(false);
  }
console.log(open)
  const createSalaryState = useSelector(
    (state: RootState) => state.createSalary
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: any = {
      Amount,
      teacherId,
      TeacherPhone,
      TeacherName,
      method
    };
    if (!Amount || !teacherId) {
      return toast.error('please provide valid data', { id: toastId });
    }
    dispatch(createSalaryFn(data)).then(() => {
      location.reload();
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (createSalaryState.isLoading)
      toast.loading('Saving...', { id: toastId });

    if (createSalaryState.isSuccess) {
      toast.success('Successfully created.', { id: toastId });
      navigate('/dashboard/salary');
    }

    if (createSalaryState.isError) {
      toast.error(createSalaryState.errorMsg, { id: toastId });
    }

    dispatch(resetSalaryState());
  }, [
    createSalaryState.isLoading,
    createSalaryState.isSuccess,
    createSalaryState.isError,
  ]);

  const handleTeacherIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    setteacherId(id);

    // Make API call to fetch teacher data
    axios.get(`${Url}/teacher/get/one/${id}`)
      .then((response) => {
        const { Name, phone,method, Amount } = response.data;
        setTeacherName(Name);
        setTeacherPhone(phone);
        setAmount(Amount);
        setMethod(method);
      })
      .catch((error) => {
        console.log(error);
        // Handle error if necessary
      });
  };

  return (
    <div className='salaryregisterationcontiner'>
      <div className=''>
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{
              fontWeight: 'bolder',
              fontSize: '20px'
            }}>Register Salary</h1>
            <p style={{
              cursor: 'pointer',
              fontSize: '1px',
              color: "gray"
            }} onClick={handleclose}><CloseOutlined /></p>
          </div>
          <div style={{
            marginTop: '10px'
          }}>
            <TextField
              name='TeacherId'
              label='TeacherId'
              className=''
              type='text'
              placeholder='teacher Id'
              value={teacherId}
              onChange={handleTeacherIdChange}
            />
          </div>
          <div className="form-group">
          <label htmlFor="method">Method:</label>
          <select
            id="method"
            className='w-full'
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="">Select Method</option>
            <option value="sh">SH</option>
            <option value="$">$</option>
          </select>
        </div>
          <div style={{ marginTop: 20 }}>
            <TextField
              name='Teacher Name'
              label='Teacher Name'
              type='text'
              placeholder='Teacher Name'
              value={TeacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
          <div className='' style={{ marginTop: 20 }}>
            <TextField
              label='Teacher Phone'
              name='Teacher Phone'
              type='text'
              placeholder='Teacher Phone'
              value={TeacherPhone}
              onChange={(e) => setTeacherPhone(e.target.value)}
            />
          </div>
          <div className='' style={{ marginTop: 20 }}>
            <TextField
              name='Salary'
              label='Salary'
              type='number'
              placeholder='Amount'
              value={Amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
         <div className='btnss'>
            <button className='svsalrybtn'>
              {createSalaryState.isLoading ? 'Loading...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};