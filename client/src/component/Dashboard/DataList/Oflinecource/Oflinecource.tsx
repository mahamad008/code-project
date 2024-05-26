import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';


import { getAllOflineCourceFn } from '../../../../redux/Slices/Dashboard/Oflinecource/getall';
import  { CreateCourceOflinefn } from '../../../../redux/Slices/Dashboard/Oflinecource/CreateOflinecource';
import { Dialog } from '@mui/material';
import { DeleteOflineFn } from '../../../../redux/Slices/Dashboard/Oflinecource/Delete';
import { Add, Close, Delete, Edit, Recycling } from '@mui/icons-material';
// import { GetallOflincourceFn } from '../../../../redux/Slices/Dashboard/Oflinecource/getall';
import {useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
const Oflinecource = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  // const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [userId, setuserId] = useState('');
  const [description, setDescription] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [OflineCategoryId, setOflineCategoryId] = useState('');
  const [shift, setShift] = useState('');
  const navigate=useNavigate()
  useEffect(()=>{
    const storedId = localStorage.getItem('n');
  setuserId(storedId!);
  },[])
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      Description: description,
      Name: name,
      teacherId: teacherId,
      OflineCategoryId: OflineCategoryId,
      shift: shift,
      userId
    };
  await  dispatch(CreateCourceOflinefn(data));
  dispatch(getAllOflineCourceFn());
setshow(false)
setName("")
setTeacherId("")
setOflineCategoryId("")


  };
  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Name', headerName: 'Course Name', width: 200 },
    { field: 'userId', headerName: 'userId', width: 200 },
    { field: 'Description', headerName: 'Description', width: 200 },
    { field: 'teacherId', headerName: 'Teacher ID', width: 150 },
    { field: 'shift', headerName: 'Shift', width: 150 },
    { field: 'OflineCategoryId', headerName: 'Category ID', width: 150 },
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
      width: 150,
      renderCell: (params) => (
        <div className=''>
          <button className='mr-2 bg-green-500 px-4 py-2 rounded text-white hover:bg-green-400' title='Edit'>
            <Link to={`update/${params.row.id}`}>
              <Edit />
            </Link>
          </button>
          <button
            className='bg-red-500 px-4 py-2 rounded text-white hover:bg-red-400'
            onClick={() => handleOpenDeleteDialog(params.row.id)}
            title='Delete'
          >
            <Delete />
          </button>
        </div>
      ),
    },
  ];

const[show,setshow]=useState(false)
const handleopen=()=>{
  setshow(true)
}
const handleclose=()=>{
  setshow(false)
}


  const dispatch = useDispatch<AppDispatch>();
  const getallUsers = useSelector((state: RootState) => state.getalloflinecources);
  useEffect(() => {
    dispatch(getAllOflineCourceFn());
  }, []);



  const handledelete = (id: any) => {
  dispatch(DeleteOflineFn(id))
  dispatch(getAllOflineCourceFn())
  handleCloseDeleteDialog()
  navigate('/dashboard/oflinecources')

  };

  return (
    <div className='w-[1140px]'>
   <div className='flex justify-between'>

      {/* <button className='' onClick={handleopen}>Add</button> */}
      <div className="flex text-center m-2">
          <button className="border border-green-500 text-green-500 rounded hover:bg-green-500 items-center hover:text-white px-4 " onClick={handleopen}>
          <Add/>New cource
        </button>
        </div>
     
   </div>
   <div className='Oflinecource '>
    <div className='flex flex-col sm:flex-row items-center justify-between mb-4'>
      {/* Search input code */}
    </div>

    <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={getallUsers.data.filter((user) => !user.isDeleted)}
          columns={columns}
          checkboxSelection
          
        />
      </div>

    <Dialog open={show} onClose={handleclose}>
      {/* Dialog content */}
    </Dialog>
  </div>

     <Dialog open={show} onClose={handleclose}>

    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-[500px] max-w-md p-6 bg-white rounded shadow">
      <div className=" flex justify-between">
      <p>Register Oflinecource</p>
      <p style={{cursor:'pointer',fontSize:'1px'}}  className='text-gray-300' onClick={handleclose}><Close/></p>
    </div>
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
            className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
     </Dialog>
     <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this cource?</h3>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
        onClick={handleCloseDeleteDialog}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
        onClick={() => handledelete(deleteItemId)}
      >
        Confirm
      </button>
    </div>
  </div>
</Dialog>
    </div>
  );
};

export default Oflinecource;
