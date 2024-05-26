import { Cancel, Edit } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Url } from '../../../interfaces';

const UpdateExam = () => {
  const { id } = useParams();
  const [Totalscore, setTotalscore] = useState("");
  const [Total, setTotal] = useState<number>();
  const [SubcourceId, setSubcourceId] = useState<number>();
  const [studentId, setstudentId] = useState<number>();
  const [CourceName, setCourceName] = useState('');
  const [studentPhone, setstudentPhone] = useState('');
  const [Studentname, setStudentname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${Url}/Exam/` + id)
      .then((res) => {
        setSubcourceId(res.data.SubcourceId);
        setCourceName(res.data.CourceName);
        setstudentPhone(res.data.studentPhone);
        setStudentname(res.data.Studentname);
        setTotal(res.data.Total);
        setTotalscore(res.data.Totalscore);
        setstudentId(res.data.studentId);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`${Url}/exam/update/` + id, {
      SubcourceId,
      Total,
      studentId,
      CourceName,
      studentPhone,
      Studentname
    })
      .then(() => {
        navigate('/dashboard/Exams');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-8">
      <form
        className="p-4 bg-white rounded-lg shadow-md  m-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">UPDATE EXAM</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="studentId">
            Student ID
          </label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setstudentId(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="studentName">
            Student Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="studentName"
            value={Studentname}
            onChange={(e) => setStudentname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="studentPhone">
            Student Phone
          </label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="studentPhone"
            value={studentPhone}
            onChange={(e) => setstudentPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="SubcourceId">
            Sub Cource ID
          </label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="SubcourceId"
            value={SubcourceId}
            onChange={(e) => setSubcourceId(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="courseName">
           SubCourse Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="courseName"
            value={CourceName}
            onChange={(e) => setCourceName(e.target.value)}
          />
        </div>
   

        <div className="mb-4">
          <label className="block mb-2" htmlFor="total">
            Score Needed
     </label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="total"
            value={Totalscore}
            onChange={(e) => setTotalscore(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="total">
            Score Earned
     </label>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="total"
            value={Total}
            onChange={(e) => setTotal(Number(e.target.value))}
          />
        </div>
       <div className="flex gap-4 ">
       <button  className='bg-green-500 py-2 px-16 mx-2 flex items-center rounded hover:bg-green-600 text-white' >
          <Edit/>
        </button>
        <button  className='bg-red-500 py-2 px-16 mx-2 flex items-center rounded hover:bg-red-600 text-white' >
          <Link to={'/dashboard/Exams/'}><Cancel/></Link>
        </button>
       </div>
      </form>
    </div>
  );
};

export default UpdateExam;