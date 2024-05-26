import { useEffect, useState } from 'react';
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { getAllFeeFn } from '../../../../redux/Slices/Dashboard/fee/GetAllFee';
import { Dialog } from '@mui/material';
import { Delete,Close,Edit, Recycling } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'; // Import DataGrid from Material-UI

import { Url } from '../../../../interfaces';

export const FeeMonthList = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<any>(null);
  const [show, setshow] = useState(false);
  const [Fees, setfees] = useState<any[]>([]);
  const [Amount, setAmount] = useState(0);
  const [FeeTitle, setFeeTitle] = useState('');
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
const [updateItemId, setUpdateItemId] = useState<any>(null);
const [updatedFeeTitle, setUpdatedFeeTitle] = useState('');
const [updatedAmount, setUpdatedAmount] = useState(0);

const handleOpenUpdateDialog = (itemId: any, title: string, amount: number) => {
  setUpdateItemId(itemId);
  setUpdatedFeeTitle(title);
  setUpdatedAmount(amount);
  setOpenUpdateDialog(true);
};

const handleCloseUpdateDialog = () => {
  setOpenUpdateDialog(false);
};

const handleUpdateFee = async () => {
  try {
    const updatedData = {
      FeeTitle: updatedFeeTitle,
      Amount: updatedAmount
    };
    await axios.put(`${Url}/Feemonth/update/${updateItemId}`, updatedData);
    const response = await axios.get(`${Url}/Feemonth/all`);
    setfees(response.data.result);
    setOpenUpdateDialog(false);
  } catch (err:any) {
    alert(err.response.data.message);
  }
};

  useEffect(() => {
    dispatch(getAllFeeFn());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${Url}/Feemonth/all`);
      setfees(response.data.result);
    };
    fetchData();
  }, []);

  const handleOpenDeleteDialog = (itemId: any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };


  const createFee = async (feeData: any) => {
   try{
   await axios.post(`${Url}/Feemonth/create`, feeData);
    const response = await axios.get(`${Url}/Feemonth/all`);
    setfees(response.data.result);
    setFeeTitle("")
    setAmount(0)
    setshow(false);
   }catch(err:any){
  // console.log()
  alert(err.response.data.message)
   }


  };

  const handleCreateFee = () => {
    const feeData: any = {
      Amount,
      FeeTitle,
    };
    createFee(feeData);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'FeeTitle', headerName: 'Title', width: 200 },
    { field: 'Amount', headerName: 'Amount', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      width: 200,
      valueGetter: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY'),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated Date',
      width: 200,
      valueGetter: (params) => dayjs(params.row.updatedAt).format('DD/MM/YYYY'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <button className="bg-red-500 mr-2 px-4 text-white py-1 shadow-md rounded" onClick={() => handDeleteSubmit(params.row.id)}>
            <Delete />
          </button>
          <button className="bg-green-500 px-4 text-white py-1 shadow-md rounded" onClick={() => handleOpenUpdateDialog(params.row.id, params.row.FeeTitle, params.row.Amount)}>
        <Edit />
      </button>

        </div>
      ),
    },
  ];

  const handDeleteSubmit=async(id:any)=>{
   await axios.delete(`${Url}/Feemonth/delete/${id}`)
 location.reload()
  }
  return (
    <div className='Feelistcontiner shadow-md bg-white m-2 p-2 rounded'>
           <div className='flex gap-4 my-2 w-[260px] md:ml-[887px] mr-0'>
      
          <button onClick={() => setshow(true)} className="w-full hover:bg-green-500 hover:text-white border-green-500 border px-8 rounded">
            New Fee
          </button>
        </div>
      <DataGrid
        rows={Fees.filter((item) => !item.isDeleted)}
        columns={columns}
        checkboxSelection
        
      />
      <Dialog open={show} onClose={() => setshow(false)}>
        
      <div className=' max-w-md  w-[500px] bg-white rounded shadow'>
          <div className="flex bg-gray-100 px-4 py-4 justify-between">
            <h1>New Fee</h1>
            <button><Close/></button>
          </div>
            <div className='form-group p-4'>
              <label htmlFor='Amount'>Title</label>
              <input type='text' className="w-full" placeholder="please Enter Title fee" id='Amount' value={FeeTitle} onChange={(e) => setFeeTitle(e.target.value)} />
            </div>
            <div className='form-group p-4'>
              <label htmlFor='FeeTitle'>Amount $:</label>
              <input type='number' id='FeeTitle' onChange={(event) => setAmount(Number(event.target.value))} value={Amount} />
            </div>
            <div className='button-group p-4'>
              <button
                type='submit'
                onClick={handleCreateFee}
                className='w-full py-2 text-white mt-4 bg-green-500 rounded hover:bg-green-600 focus:outline-none'
              >
                Save
              </button>
            </div>
          </div>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold">Are you sure you want to delete this Fee ?</h3>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
        onClick={handleCloseDeleteDialog}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
        onClick={() => handDeleteSubmit(deleteItemId)}
      >
        Confirm
      </button>
    </div>
  </div>
</Dialog>
<Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
  <div className=' max-w-md  w-[500px] bg-white rounded shadow'>
    <div className="flex bg-gray-100 px-4 py-4 justify-between">
      <h1>Update Fee</h1>
      <button onClick={handleCloseUpdateDialog}><Close/></button>
    </div>
    <div className='form-group p-4'>
      <label htmlFor='UpdatedFeeTitle'>Title</label>
      <input type='text' className="w-full" placeholder="Please enter the updated fee title" id='UpdatedFeeTitle' value={updatedFeeTitle} onChange={(e) => setUpdatedFeeTitle(e.target.value)} />
    </div>
    <div className='form-group p-4'>
      <label htmlFor='UpdatedAmount'>Amount $:</label>
      <input type='number' id='UpdatedAmount' onChange={(event) => setUpdatedAmount(Number(event.target.value))} value={updatedAmount} />
    </div>
    <div className='button-group p-4'>
      <button
        type='submit'
        onClick={handleUpdateFee}
        className='w-full py-2 text-white mt-4 bg-green-500 rounded hover:bg-green-600 focus:outline-none'
      >
        Update
      </button>
    </div>
  </div>
</Dialog>
    </div>
  );
};
