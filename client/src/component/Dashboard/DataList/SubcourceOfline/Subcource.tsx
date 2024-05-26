import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiRecycle } from "react-icons/bi";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dialog } from '@mui/material';
import { Add, Close, Delete, Edit } from '@mui/icons-material';
import './subcourcecontiner.css';
import CreatesubcourceOfline from '../../../../Pages/Dashboard/SubocurceOfline/Createcource';
import { getAllOflineSubCourceFn } from '../../../../redux/Slices/Dashboard/SubcourceOfline/getall';
import { Url } from '../../../../interfaces';

const SubcourceOflineList = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  const handleOpenDeleteDialog = (itemId: any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const [show, setShow] = useState(false);
  // const [userId, setuserId] = useState('');
  // useEffect(()=>{
  //   const storedId = localStorage.getItem('n');
  //  setuserId(storedId!);
  // },[])
  const handleopen = () => {
    setShow(true);
  };

  const handleclose = () => {
    setShow(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  console.log(handleSearch)

  const dispatch = useDispatch<AppDispatch>();
  const getallsubcources = useSelector((state: RootState) => state.getallsubcource);
  
  useEffect(() => {
    dispatch(getAllOflineSubCourceFn());
  }, [dispatch]);

  const handledelete = (id: any) => {
    axios.put(`${Url}/subcource/trash/${id}`);
    dispatch(getAllOflineSubCourceFn());
    setOpenDeleteDialog(false);
    setDeleteItemId(null);
    navigate('/dashboard/Subcource/recycle');
  };

  const filteredsubcources = getallsubcources.data.filter((subcource: any) =>
    subcource.Title.toLowerCase().includes(searchTerm.toLowerCase()) &&subcource.isDeleted===false
  ).map((subcource: any) => ({
    ...subcource,
    id: subcource.SubcourceId // Assigning SubcourceId as id
  }));

  const columns: GridColDef[] = [
    { field: 'SubcourceId', headerName: 'ID', flex: 1 },
    { field: 'Title', headerName: 'SubCource Name', flex: 1 },
    { field: 'userId', headerName: 'userId', flex: 1 },
    { field: 'Description', headerName: 'Description', flex: 1 },
    { field: 'oflinecourceId', headerName: 'OflinecourceId', flex: 1 },
    { field: 'CreatedAt', headerName: 'Created At', flex: 1, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: 'UpdatedAt', headerName: 'Updated At', flex: 1, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    {
      field: 'Actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className='flex gap-2 items-center'>
          <Link className='border border-green-500 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-400' to={`update/${params.row.SubcourceId}`}><Edit /></Link>
          <button className='border border-red-500 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-400' onClick={() => handleOpenDeleteDialog(params.row.SubcourceId)}><Delete /></button>
        </div>
      )
    }
  ];

  return (
    <div className=' border p-3 rounded m-4 md:w-[1120px]'>
      <div className='flex justify-between'>
   
        <div className="flex">
          <button className='border border-green-500 rounded px-4 hover:bg-green-500' onClick={handleopen}>add subcource</button>
        </div>
      </div>

      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={filteredsubcources}
          columns={columns}
          
        />
      </div>

      <Dialog open={show} onClose={handleclose}>
        <div className="flex justify-between m-4">
          <p>subcource</p>
          <p><Close /></p>
        </div>
        <CreatesubcourceOfline />
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this Subcource ofline?</h3>
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

export default SubcourceOflineList;
