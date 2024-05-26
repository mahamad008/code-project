import { Cancel, Edit } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Url } from '../../../interfaces';

const UpdateFee = () => {
  const { id } = useParams();
  const [Amountneed, setAmountneed] = useState<number>();
  const [Balance, setBalance] = useState<number>();
  const [amountPaid, setamountPaid] = useState<number>();
  const [studentId, setstudentId] = useState<number>();
  const [method, setmethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${Url}/fee/get/one/` + id)
      .then((res) => {
        setamountPaid(res.data.amountPaid);
        setBalance(res.data.Balance);
        setAmountneed(res.data.Amountneed);
        setstudentId(res.data.studentId);
        setmethod(res.data.method);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`${Url}/fee/update/` + id, { amountPaid, method,Amountneed, Balance, studentId });

    navigate('/dashboard/fees');
  };

  return (
    <div className=" m-4 border p-4 rounded-lg">
            <h1 className='text-2xl text-center font-bold border-b-2 border-green-500 border-dashed' style={{letterSpacing:3}}>EDIT PAYMENT FEE AND BE CAREFULL IT WILL BE UPDATED PERMANENTLY</h1>

      <form className="bg-white " onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Amountneed">
            Amountneed
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Amountneed"
            type="number"
            value={Amountneed}
            onChange={(e) => setAmountneed(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="balance">
            Balance
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="balance"
            type="number"
            value={Balance}
            onChange={(e) => setBalance(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amountPaid">
            Amount Paid
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amountPaid"
            type="number"
            value={amountPaid}
            onChange={(e) => setamountPaid(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
            Student ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="studentId"
            type="number"
            value={studentId}
            onChange={(e) => setstudentId(Number(e.target.value))}
          />
        </div>
     
        <div className="flex items-center">
          <button
            className='bg-green-500 py-2 px-16 mx-2 rounded hover:bg-green-600 text-white'
            type="submit"
          >
            <Edit/>
          </button>
          <button
            className='bg-red-500 py-2 px-16 mx-2 rounded hover:bg-red-600 text-white'
            type="submit"
          >
            <Cancel/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFee;