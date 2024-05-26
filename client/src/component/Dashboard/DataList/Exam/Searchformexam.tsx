import React, { useState } from 'react';
import axios from 'axios';
import { Url } from '../../../../interfaces';
interface StudentExam {
  CourceName: string;
  Total: number;
  Studentname: string;
  Totalscore: number; // Corrected type from "any" to "number"
  SubcourceId: number;
  studentPhone: string;
}

interface Student {
  Id: number;
  Name: string;
  email: string;
  phone: string;
  Amount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  Exam: StudentExam[];
}

const SearchForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [examDetails, setExamDetails] = useState<Student | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get<Student>(
        `${Url}/student/get/studentexam/${phone}`
      );
      setExamDetails(response.data);
      setError('');
    } catch (error) {
      setExamDetails(null);
      setError('An error occurred while fetching the exam details.');
      console.error(error);
    }
  };



  return (
    <div className="my-16 w-full md:mx-[400px] max-w-md p-6 bg-white rounded shadow mt-32 justify-center">
      <div className="justify-center">
        <h1 className="mb-6 text-2xl font-bold text-center">Student Exam Search</h1>
        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter student phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 mb-2 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>
        {examDetails ? (
          <div className="mt-8">
           <div className=" ml-[100px] ">
           </div>
            <h1 className='text-1xl ml-2 text-green-600 bold'>{examDetails.Name}</h1>
            {examDetails.Exam.length > 0 ? (
              examDetails.Exam.map((exam, index) => (
                <div key={index} className='border rounded p-4'>
                  <p>
                    <strong>Course :</strong> {exam.CourceName}
                  </p>
                  <p>
                    <strong>Score Needed:</strong> {exam.Totalscore}
                  </p>
                  <p>
                    <strong>Score Earned:</strong> {exam.Total}
                  </p>
                  {index < examDetails.Exam.length - 1 && <hr className="my-4" />}
                </div>
              ))
            ) : (
              <p>No exam details found.</p>
            )}
            <p>
            <p>
</p>            </p>
          </div>
        ) : (
          error && <p className="mt-4 text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;