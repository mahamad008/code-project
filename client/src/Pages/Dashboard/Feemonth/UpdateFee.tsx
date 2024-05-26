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
    <div className="shadow-md bg-gray-100 m-4 p-4 rounded-lg">
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
        <div className="form-group">
          <label htmlFor="method">Method:</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setmethod(e.target.value)}
          >
            <option value="">Select Method</option>
            <option value="sh">SH</option>
            <option value="$">$</option>
          </select>
        </div>
        <div className="text-right">
          <button
            
            type="submit"
          >
            <Edit/>
          </button>
          <button
            
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