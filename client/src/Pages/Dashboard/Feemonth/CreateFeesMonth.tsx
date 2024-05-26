import React, { useState } from 'react';
import axios from 'axios';
import { Url } from '../../../interfaces';
// import './CreateFee.css';





const CreateFee: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [Amountneed, setAmountneed] = useState(0);
  const [studentPhone, setstudentPhone] = useState('');
  const [studentName, setstudentName] = useState('');
  const [method, setMethod] = useState('');
  const createFee = async (feeData: any) => {
    try {
      const response = await axios.post(`${Url}/fee/create`, feeData);
      console.log(response.data); // You can handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateFee = () => {
    const feeData: any = {
      amountPaid,
      studentPhone,
      studentName,
      Amountneed,
      studentId,
      method
    };

    createFee(feeData);
  };

  const handlestudentIdchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
setStudentId(id)
    axios
      .get(`${Url}/student/get/one/${id}`)
      .then((response) => {
        const { Amount,phone ,Name} = response.data;
        setAmountneed(Amount);
        setstudentName(Name)
        setstudentPhone(phone);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className="flex justify-center items-center bg-gray-100">
  <div className='w-[300px] max-w-md p-6 bg-white rounded shadow'>
  <div className="form-group">
          <label htmlFor="method">Method:</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="">Select Method</option>
            <option value="sh">SH</option>
            <option value="$">$</option>
          </select>
        </div>
      <div className="form-group">
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="number"
          id="studentId"
          value={studentId}
          onChange={handlestudentIdchange}
          // onChange={(event) => setStudentId(Number(event.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="studentId">Student Name:</label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={(e) => setstudentName(e.target.value)}
      
        />
      </div>
      <div className="form-group">
        <label htmlFor="studentId">Student Phone:</label>
        <input
          type="text"
          id="studentId"
          value={studentPhone}
          // onChange={}
          onChange={(event) => setstudentPhone(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="amountPaid">Amount Needed:</label>
        <input
          type="number"
          id="amountPaid"
          value={Amountneed}
          onChange={(event) => setAmountneed(Number(event.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Amountneed">Amount Paid:</label>
        <input type='number' id="Amountneed"  onChange={(event) => setAmountPaid(Number(event.target.value))} value={amountPaid}/>
      </div>
      <div className="button-group">
         <button
            type="submit" onClick={handleCreateFee}
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
      </div>
      </div>
    </div>
  );
};

export default CreateFee;