import { useEffect, useState } from 'react';
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import dayjs from 'dayjs';
import { Link
  , useParams } from 'react-router-dom';
import { getAllFeeFn } from '../../../../redux/Slices/Dashboard/fee/GetAllFee';
import { Dialog, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Add, Close, Delete, Edit, Print, Recycling } from '@mui/icons-material';
import { Url } from '../../../../interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Fee {
  feeMonthId: any;
  FeeTitle: any;
  Amount:any;
  id:any;
  userId:any;
}

export const StudentPaymentFee = () => {
  const [Feemonth, setFeemonth] = useState<Fee[]>([]);
  const [feeMonthId, setFeeMonthId] = useState<string>('');
  const [feeSudent, setFeeStudent] = useState<any[]>([]);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<string>('');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [Amountneed, setAmountneed] = useState<number>(0);
  const [studentPhone, setStudentPhone] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [userId, setuserId] = useState('');
  useEffect(()=>{
    const storedId = localStorage.getItem('n');
   setuserId(storedId!);
  },[])
  const handleOpenDeleteDialog = (itemId: any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
console.log(setMethod)
  useEffect(() => {
    dispatch(getAllFeeFn());
  }, [dispatch]);


  const keys: GridColDef[] = [
    { field: 'id' ,headerName: 'Id', width:100,},
    { field: 'Balance', headerName: 'Balance', width:200, valueGetter: (params) => `$${params.row.Balance}` },
    { field: 'userId', headerName: 'userId', width:200,},
    { field: 'amountPaid', headerName: 'Amount paid', width:200, valueGetter: (params) => `$${ params.row.amountPaid}` },
    { field: 'PaidAt', headerName: 'Pay Date', width:200, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: 'UpdatedAt', headerName: 'Update Date', width:200, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    {
      field: 'Actions',
      headerName: 'Actions',
      width:500,
      renderCell: (params) => (
        <div className=''>
          
          <button className='bg-green-500 py-2  text-white px-4 rounded '> <Link to={`/dashboard/fees/UpdateFee/${params.row.id}`}><Edit/></Link></button>
          <button className='bg-blue-500 mx-2 py-2 text-white px-4 rounded '> <Link to={`/print/PrintFee/${params.row.id}`}><Print/></Link></button>
          <button className='bg-red-500  text-white py-2 px-4 rounded ' onClick={() => handleOpenDeleteDialog(params.row.id)}><Delete/></button>
        </div>
      )
    },
  ];

  const handleShow = () => {
    setShow(!show);
  };

  const createFee = async (feeData: any) => {
    const resonse = await axios.post(`${Url}/fee/create`, feeData);
    console.log(resonse)
    const response = await axios.get(`${Url}/student/get/fee/${id}`);
    setFeeStudent(response.data.filter((fee: any) => !fee.isDeleted)); 
    handleShow();
    console.log(response);
  };

  const handleCreateFee = () => {
    const feeData: any = {
      amountPaid,
      studentPhone,
      studentName,
      Amountneed,
      studentId,
      method,
      feeMonthId,
      userId
    };

    createFee(feeData);
  };

  const handleStudentIdChange = () => {
    setStudentId(id!);
    axios.get(`${Url}/student/get/one/${id}`).then((response) => {
      const { Name, phone } = response.data;
      setStudentName(Name);
      setStudentPhone(phone);
    });
  };

  useEffect(() => {
    handleStudentIdChange();
  }, []);

  useEffect(() => {
    const fetchFeeMonths = async () => {
      const response = await axios.get(`${Url}/Feemonth/all`);
      setFeemonth(response.data.result);
    };
    fetchFeeMonths();
  }, []);


  useEffect(() => {
    const fetchFeeStudents = async () => {
      const response = await axios.get(`${Url}/student/get/fee/${id}`);
      setFeeStudent(response.data.filter((fee: any) => !fee.isDeleted)); // Filter out deleted items
    };
    fetchFeeStudents();
  }, []);

  const handledelete =async(id:any) => {
  await  axios.put(`${Url}/fee/trash/`+id)
    const response = await axios.get(`${Url}/student/get/fee/${id}`);
    setFeeStudent(response.data.filter((fee: any) => !fee.isDeleted)); // Filter out deleted items
    setOpenDeleteDialog(false)
    setDeleteItemId(false)
    // navigate('/dashboard/fees/recycle')
  };
  const handleFeeMonthChange = (e:any) => {
    const selectedFeeId = e.target.value; // Get the selected fee ID
    setFeeMonthId(selectedFeeId); // Set the selected fee month ID
  
    // Find the selected fee month object
    const selectedFeeMonth = Feemonth.find(fee => fee.id === selectedFeeId);
    if (selectedFeeMonth) {
      setAmountneed(selectedFeeMonth.Amount); // Set the Amountneed based on the selected fee month
    }
  };
  return (
    <div className='md:w-[1150px]'>
      <div className=''>
        <div className="flex my-4">
          <button onClick={handleShow} className='border border-green-500 px-8 py-2 text-3xl mx-3 rounded items-center text-green-500 text-center'><Add/>Pay New Fee</button>
        </div>
      </div>
      <div className="w-full overflow-auto">
        <DataGrid
          rows={feeSudent}
          columns={keys}
          autoHeight
          disableColumnFilter
          disableColumnMenu
        />
      </div>

      <Dialog open={show} onClose={handleShow}>
        <div className="flex justify-center items-center bg-gray-100">
          <div className='w-[700px] max-w-md p-2 bg-white rounded shadow'>
            <div className='flex justify-between my-4'>
              <h1 className='text-2xl font-bold'>Pay New Fee</h1>
              <button onClick={handleShow}><Close /></button>
            </div>
            <div>
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Choose fee</InputLabel>
      <Select
        fullWidth
        value={feeMonthId}
        onChange={handleFeeMonthChange} // Use the handler function for onChange event
      >
        {Feemonth.map((fee) => (
          <MenuItem key={fee.id} value={fee.id}>
            {fee.FeeTitle}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </div>
  <div className="form-group w-full">
 
      <div className="form-group">
        <label htmlFor="amountPaid">Amount Needed:</label>
        <input
          type="number"
          id="amountPaid"
          value={Amountneed}
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
