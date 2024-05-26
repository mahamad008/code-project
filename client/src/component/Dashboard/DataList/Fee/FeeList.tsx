
import{ useEffect, useState } from 'react';
// import {useReactToPrint} from 'react-to-print'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { getAllFeeFn } from '../../../../redux/Slices/Dashboard/fee/GetAllFee';
import { Dialog } from '@mui/material';
// import CreateFee from '../../../../Pages/Dashboard/Fees/CreateFees';
import { Add, Delete, Edit, Print, Recycling } from '@mui/icons-material';
import { Url } from '../../../../interfaces';
// import Item from 'antd/es/list/Item';
export const FeeList = () => {

  const [ustudentId, usetStudentId] = useState('');
  const [feeMonthId, setfeeMonthId] = useState('');
  const [ubalance, usetBalance] = useState('');
  const [uamountPaid, usetAmountPaid] = useState('');
  const [utotal, usetTotal] = useState('');
  const allFeeState = useSelector((state: RootState)=>state.getAllFee);
  const [id,setid]=useState(-1)
  
  const [searchQuery,setSearchQuery]=useState('')
  const dispatch=useDispatch<AppDispatch>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  console.log(setid)
  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  useEffect(() => {
    dispatch(getAllFeeFn());
  }, []);
  const navigate=useNavigate()
  const keys = [
    'Id',
    'userId',
    'Amountneed',
    'Balance',
     'amount paid',
     'StudentId',
    'studentName',
    'studentPhone',
    'Pay Date',
    'Update Date',
    // 'Is Deleted',
    'Actions',
  ];
const searching=(data:any)=>{
  return data.filter((item:any)=>
  item.studentPhone.toLowerCase().includes(searchQuery.toLowerCase())
  )
  }

// const hanleupdate =()=>{
//   axios.put('http://localhost:5000/api/fee/update/'+id,{amountPaid,total,balance,studentId})
//   .then(res=>{
    
//     console.log(res)
//     location.reload()
//     setid(-1)
//   }).catch(err=>(console.log(err)))
// }
const handledelete =(id:any)=>{
  axios.put(`${Url}/api/fee/delete/`+id)
  location.reload()
}
const [show,setshow]=useState(false)
const handleshow=()=>{
  setshow(!show)
}
const [studentId, setStudentId] = useState('');
const [amountPaid, setAmountPaid] = useState(0);
const [Amountneed, setAmountneed] = useState(0);
const [studentPhone, setstudentPhone] = useState('');
const [studentName, setstudentName] = useState('');
// const [method, setMethod] = useState('');
const [userId, setuserId] = useState('');
useEffect(()=>{
  const storedId = localStorage.getItem('n');
 setuserId(storedId!);
},[])
const createFee = async (feeData: any) => {

    const response = await axios.post(`${Url}/fee/create`, feeData);
      handleshow()
      console.log(response)
      dispatch(getAllFeeFn())
      navigate('/dashboard/fees')

};
const handleCreateFee = () => {
  const feeData: any = {
    amountPaid,
    studentPhone,
    studentName,
    Amountneed,
    studentId,
    method:"kk",
    userId,
    feeMonthId
  };

  createFee(feeData);
};

const handlestudentIdchange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const id = e.target.value;
setStudentId(id)
  axios
    .get(`${Url}/student/get/one/${id}`)
    .then((response) => {
      const { phone ,Name} = response.data;
      // setAmountneed(Amount);
      setstudentName(Name)
      setstudentPhone(phone);
      // setMethod(method);
    })
    .catch((error) => {
      console.error(error);
    });
};
  return (
    <div className='Feelistcontiner shadow m-2 p-2 rounded'>
         <div className='categ'>
          <input type="text" placeholder='search by phone number' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
       <div className="flex">
       <button onClick={handleshow} className='bg-green-500 py-2 px-16 mx-2 rounded hover:bg-green-600 text-white'><Add/>Pay New fee</button> 
       </div>
       </div>
      <table className='tablefee'>
        <tr>
          {keys.map((keyItem, indx) => (
            <th key={indx}>{keyItem}</th>
          ))}
        </tr>

        <tbody>
          {allFeeState.data && searching(allFeeState.data).map((mapFee:any) => (
            mapFee.id ==id ? 
            <tr>
        <td>{mapFee.id}</td>
        {/* <td><input type="text" style={{color:'red'}}  value={uamountPaid} /></td> */}
        <td><input type="text"  style={{background:'red'}} value={uamountPaid} onChange={(e)=>usetAmountPaid(e.target.value)}/></td>
        <td><input type="text" style={{background:'red'}}  value={utotal} onChange={(e)=>usetTotal(e.target.value)}/></td>
        <td><input type="text" style={{background:'red'}}  value={ustudentId} onChange={(e)=>usetStudentId(e.target.value)}/></td>
        <td><input type="text" style={{background:'red'}}   value={ubalance} onChange={(e)=>usetBalance(e.target.value)}/></td>

            </tr>
              
            :!mapFee.isDeleted ?  <tr className='border' key={mapFee.id}>
            <td className='py-4 px-3'>{mapFee.id}</td>
            <td className='py-4 px-3'>{mapFee.userId}</td>
            <td className='py-4 px-3'>{mapFee.method}{mapFee.Amountneed}</td>
            <td className='py-4 px-3'>{mapFee.method}{mapFee.Balance}</td>
            <td className='py-4 px-3'>{mapFee.method}{mapFee.amountPaid}</td>
            <td className='py-4 px-3'>{mapFee.studentId}</td>
            <td className='py-4 px-3'>{mapFee.studentName}</td>
            <td className='py-4 px-3'>{mapFee.studentPhone}</td>
            <td className='py-4 px-3'>
              {dayjs(mapFee.PaidAt).format('DD/MM /YYYY')}
            </td>
            <td className='py-4 px-3'>
              {dayjs(mapFee.UpdatedAt).format('DD/MM /YYYY')}
            </td>
  
            <td className=''>
            <button className='bg-green-500 py-2 px-2 mx-2 rounded hover:bg-green-600 text-white'> <Link to={`UpdateFee/${mapFee.id}`}><Edit/></Link></button>
            <button className='bg-blue-500 py-2 px-2 mx-2 rounded hover:bg-blue-600 text-white'> <Link to={`/print/PrintFee/${mapFee.id}`}><Print/></Link></button>
              <button className='bg-red-500 py-2 px-2 mx-2 rounded hover:bg-red-600 text-white' onClick={()=>handledelete(mapFee.id)}><Delete/></button>
            </td>
          </tr>:null
          ))}
        </tbody>
      </table>
      <Dialog open={show} onClose={handleshow}>
      <div className="flex justify-center items-center bg-gray-100">
  <div className='w-[300px] max-w-md p-6 bg-white rounded shadow'>

      <div className="form-group">
        <label htmlFor="studentId">feeMonth id:</label>
        <input
          type="text"
          id="studentId"
          className='border'
          value={feeMonthId}
          onChange={(event) => setfeeMonthId(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          className='border'
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
          // onChange={(e) => setstudentName(e.target.value)}
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
