import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { getAllStudentFn } from "../../../../redux/Slices/Dashboard/Student/GetAllStudents";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Close as CloseIcon, Delete,Add, Edit, Recycling } from '@mui/icons-material';
import './studentlist.css'
import {  Dialog, TextField } from '@mui/material'
import { createStudentFn } from "../../../../redux/Slices/Dashboard/Student/Createstudent";
import 'quill/dist/quill.snow.css'
import { Url } from "../../../../interfaces";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const StudentList: React.FC = () => {

  const allStudentState = useSelector((state: RootState) => state.getAllstudent);
  const [open, setOpen] = useState(false);
  const [DeleteDailog, setDeleteDailog] = useState(false)
  const [userId, setuserId] = useState("")
  const [deleteItemId, setDeleteItemId] = useState(null);
  const handleopenandclosedailog = (itemId: any) => {
    setDeleteDailog(!DeleteDailog)
    setDeleteItemId(itemId)
    
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllStudentFn());
  }, []);

  const [searchPhone, setSearchPhone] = useState('');
 
  console.log(setSearchPhone)
  
  const columns: GridColDef[] = [
    { field: 'Id', headerName: 'ID', width: 10 },
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'userId', headerName: 'user id', width: 100 },
    { field: 'Address', headerName: 'Address', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      valueGetter: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY'),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 150,
      valueGetter: (params) => dayjs(params.row.updatedAt).format('DD/MM/YYYY'),
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 500,
      renderCell: (params) => (
      <>

          <button  className="px-4 bg-orange-500   my-2  mx-2  py-2 text-white rounded">
            <Link to={`Exam/${params.row.Id}`}>Exam</Link>
          </button>
          <button  className="px-4 bg-gray-500 my-4 mx-2  py-2 text-white rounded">
            <Link to={`payment/${params.row.Id}`}>Payfee</Link>
          </button>
          <button  className="px-4 bg-black mx-2  py-2 text-white rounded">
            <Link to={`enroll/${params.row.Id}`}>Enroll</Link>
          </button>
          <button  className="px-4 bg-green-500 my-4 mx-2  py-2 text-white rounded">
            <Link to={`update/${params.row.Id}`}><Edit /></Link>
          </button>
          <button  className="px-4 bg-red-500 my-4  mx-2  py-2 text-white rounded" onClick={() => handleopenandclosedailog(params.row.Id)}>
            <Delete />
          </button>
 
      </>
      )
    },
  ];

  const rows = allStudentState.data
    .filter((student) =>
      student.phone?.toString().includes(searchPhone.toLowerCase()) &&student.isDeleted===false
    )
    .map((fetchindata) => ({
      ...fetchindata,
      id: fetchindata.Id
    }));

  const handleDelete =async(id: any) => {
   await axios.put(`${Url}/student/trash/${id}`);
    dispatch(getAllStudentFn());
    setDeleteDailog(false)
  };

  const [Name, setName] = useState('');
  const [Address, setAddress] = useState('');
  const [phone, setphone] = useState('');
useEffect(()=>{
  const storedId = localStorage.getItem('n');
  setuserId(storedId!);
})
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: any = {
      Name,
      Address,
      phone,
      userId
    };
    if (!Name || !Address) {
      return toast.error('Please provide valid data');
    }
    dispatch(createStudentFn(data)).then(() => {
      dispatch(getAllStudentFn());
      handleClose()
    })
      .catch(() => {

      })

  };


  const createStudentState = useSelector((state: RootState) => state.createstudent);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='m-2 w-[1140px] rounded p-3'>

      <div className="flex justify-between items-center">
   
        <div className="flex items-center">
          <button className='border border-green-500 px-3 py-2 rounded my-2' type="button" onClick={handleOpen}>
            <Add/>New student
          </button>
        </div>
      </div>
      <div className="w-full overflow-auto max-h-[calc(100vh-200px)]">
      <DataGrid
        rows={rows}
        columns={columns}
        
      />
    </div>
      <Dialog open={open} onClose={handleClose} className="">
        <div className="px-2 w-[500px] py-3">
          <div className="btnregistercource" style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bolder' }}>Register Student</h1>
            <button style={{ fontSize: '2px', color: 'gray' }} onClick={handleClose}> <CloseIcon /></button>
          </div>
          <form onSubmit={handleSubmit} >
            <div className=''>
              <TextField
                name="Full Name"
                margin="normal"
                label="Full Name"
                type='text'
                fullWidth
                placeholder='Student name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mt-4'>
              <TextField
                margin="normal"
                name="Address"
                label="Address"
                type='Address'
                placeholder='Student Address'
                value={Address}
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className=''>
              <TextField
                name="phone"
                margin="normal"
                label="phone"
                type='text'
                placeholder='Student phone'
                value={phone}
                fullWidth
                onChange={(e) => setphone(e.target.value)}
              />
            </div>
            <div className=''>
              <button className="bg-green-400 py-2 hover:bg-green-600 w-full text-white rounded-md"
              >{createStudentState.isLoading ? 'Registering...' : 'Register'}</button>
            </div>
          </form>
        </div>
      </Dialog>
      <Dialog open={DeleteDailog} onClose={()=>setDeleteDailog(false)}>
    

        <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this student?</h3>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
        onClick={handleopenandclosedailog}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
        onClick={() => handleDelete(deleteItemId)}
      >
        Confirm
      </button>
    </div>
  </div>
        </Dialog>
    </div>
  );
};

