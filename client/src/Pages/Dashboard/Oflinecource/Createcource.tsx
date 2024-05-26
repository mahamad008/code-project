import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { CreateCourceOflinefn } from '../../../redux/Slices/Dashboard/Oflinecource/CreateOflinecource';
import './Createcource.css';

const Createcource = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const createcourceofline = useSelector((state: RootState) => state.Createcourceofline);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [OflineCategoryId, setOflineCategoryId] = useState('');
  const [shift, setShift] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      Description: description,
      Name: name,
      teacherId: teacherId,
      OflineCategoryId: OflineCategoryId,
      shift: shift,
    };
    dispatch(CreateCourceOflinefn(data));
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-[300px] max-w-md p-6 bg-white rounded shadow">
        <h1 className="mb-6 w-100 text-2xlfont-bold text-center"></h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter course name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="description"
              value={description}
              placeholder="Enter course description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="teacherId"
              value={teacherId}
              placeholder="Enter teacher ID"
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="OflineCategoryId"
              value={OflineCategoryId}
              placeholder="Enter category ID"
              onChange={(e) => setOflineCategoryId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="shift"
              value={shift}
              placeholder="Enter shift"
              onChange={(e) => setShift(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createcource;