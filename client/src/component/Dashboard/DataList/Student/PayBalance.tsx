import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Url } from '../../../../interfaces';

const PayBalance = () => {
  const { id } = useParams();
  const [Amountneed, setAmountneed] = useState<number>();
  const [Balance, setBalance] = useState<number>();
  const [studentId, setstudentId] = useState<number>();
  const [method, setmethod] = useState('');
  const [paid,setpaid]=useState<Number>(0)
 const navigate=useNavigate()
  useEffect(() => {
    axios
      .get(`${Url}/fee/get/one/` + id)
      .then((res) => {
        // setamountPaid(TOtal);
        setBalance(res.data.Balance);
        setAmountneed(res.data.Amountneed);
        setstudentId(res.data.studentId);
        setmethod(res.data.method);
        console.log(res.data);
        const TOtal=Number(res.data.Balance)+Number(res.data.amountPaid)
        setpaid(TOtal)

      })
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`${Url}/fee/update/` + id, { amountPaid:paid, method,Amountneed, Balance, studentId });

    navigate('/dashboard');
  };

  return (
    <div className=" m-4 border p-4 rounded-lg">

      <form className="bg-white " onSubmit={handleSubmit}>
     
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="balance">
            Balance:$
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="balance"
            type="number"
            value={Balance}
            onChange={(e) => setBalance(Number(e.target.value))}
          />
        </div>
   
        <div className="flex items-center">
          <button
            className='bg-green-500 py-2 px-16 mx-2 rounded hover:bg-green-600 text-white'
            type="submit"
          >
           Pay Now
          </button>
 
        </div>
      </form>
    </div>
  );
};

export default PayBalance