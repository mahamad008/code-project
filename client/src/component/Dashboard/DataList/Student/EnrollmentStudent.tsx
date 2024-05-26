import  { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';
import {  AppDispatch } from '../../../../redux/store';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid


// import { getAllOflineCourceFn } from '../../../../redux/Slices/Dashboard/Oflinecource/getall';
// import Createoflincource from '../../../../redux/Slices/Dashboard/Oflinecource/CreateOflinecource';
import { Dialog, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import Createcource from '../../../../Pages/Dashboard/Oflinecource/Createcource';
// import { DeleteOflineFn } from '../../../../redux/Slices/Dashboard/Oflinecource/Delete';
// import CreateOflineenrollment from '../../../../Pages/Dashboard/Oflineenrollment/CreaeOflineenrollment';
import { Add, Close, Delete, Edit } from '@mui/icons-material';
import { createOflineenrollmentFn } from '../../../../redux/Slices/Dashboard/OflineEnrollment.ts/CreateEnrollment';
import { Url } from '../../../../interfaces';
interface cource{
  Name:any;
  id:any;
  Title:any;
}
const StudentEnrollment = () => {
  const [show, setshow] = useState(false);
  const [DeleteDailog, setDeleteDailog] = useState(false);
  const {id}=useParams()
  const [cources,setcources] = useState<cource[]>([])
  const [userId, setuserId] = useState('');
  useEffect(()=>{
    const storedId = localStorage.getItem('n');
   setuserId(storedId!);
  },[])
 useEffect(()=>{
    const res=async()=>{
        const response=await axios.get(`${Url}/oflinecource/get/all`)
        setcources(response.data.result)
    }
    res()
 },[])

  const [deleteId, setDeleteId] = useState('');
  const [enrollments, setEnrollments] = useState<any[]>([]);
    const [studentId,setstudentId]=useState('')
  const [OflinecourceId,setOflinecourceId]=useState('')
  const [StudentName,setStudentName]=useState('')
  const handlesubmit=async(e:any)=>{
    e.preventDefault();
  const data:any ={
    studentId,
    OflinecourceId,
    StudentName,
    userId
  }
  await dispatch(createOflineenrollmentFn(data))
  const response=await axios.get(`${Url}/student/get/enroll/${id}`)
    setEnrollments(response.data)  
    setshow(false)


  }
 
  const handlestudenteIdchange=()=>{
    try {
      setstudentId(id!)
      axios.get(`${Url}/student/get/one/`+id).then((response)=>{
        const {Name}=response.data;
        setStudentName(Name)
      })
    } catch (error) {
      
    }
  }
  const handleopen = () => {
    setshow(true);
  };

  const handleclose = () => {
    setshow(false);
  
};

  

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
const res=async()=>{
    const response=await axios.get(`${Url}/student/get/enroll/${id}`)
    setEnrollments(response.data)
    handlestudenteIdchange()
}
res()
  }, []);



  const handledelete = (id: any) => {
    setDeleteId(id);
    setDeleteDailog(true)
  };

  const handleConfirmDelete = async() => {
   await axios.put(`${Url}/ofllinenrollment/trash/` + deleteId)
  setDeleteId('')

  const response=await axios.get(`${Url}/student/get/enroll/${id}`)
  setEnrollments(response.data)
  setDeleteId("")
  setDeleteDailog(false)
//   navigate('/dashboard/OFlineenrollment/recycle')
  };

  const handleCancelDelete = () => {
    setDeleteId('');
    setDeleteDailog(false)
  };

  return (
    <div className='md:w-[1140px]'>
      <div className='flex sm:flex-row items-center justify-between mb-4'>

        <div className="flex gap-4 md:ml-[850px] my-2">
          {/* <Link className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg' to={'recycle'}>Trash<Recycling  /></Link> */}
          <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg' onClick={handleopen}>
            <Add/>New Enrollment
          </button>
        </div>
      </div>

      <DataGrid
        rows={enrollments.filter(mapoflineEnrollment => !mapoflineEnrollment.isDeleted)} // Filter out deleted entries
        columns={[
          { field: 'id', headerName: 'ID', width: 150 },
          { field: 'studentId', headerName: 'Student ID', width: 150 },
          { field: 'userId', headerName: 'userId', width: 150 },
          { field: 'OflinecourceId', headerName: 'Course ID', width: 150 },
          { field: 'StudentName', headerName: 'Student Name', width: 200 },
          {
            field: 'createdAt',
            headerName: 'Created At',
            width: 150,
            valueGetter: params => dayjs(params.value).format('DD/MM/YYYY'),
          },
          {
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 150,
            valueGetter: params => dayjs(params.value).format('DD/MM/YYYY'),
          },
          {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 200,
            renderCell: params => (
              <div className='flex gap-2 items-center'>
                <button className='bg-green-500 px-4 py-2 rounded text-white' >
                  <Link to={`update/${params.row.id}`}>
                    <Edit />
                  </Link>
                </button>
                <button className='bg-red-500 px-4 py-2 rounded text-white'  onClick={() => handledelete(params.row.id)}>
                  <Delete />
                </button>
              </div>
            ),
          },
        ]}
        // pageSize={5}
        checkboxSelection
      />
      <Dialog open={DeleteDailog} onClose={handleCancelDelete}>
        <div className="p-4">
          <h2 className="text-xl mb-2">Are you sure you want to delete this Enrollment ?</h2>
          <div className="flex mt-4 justify-end">
            <Button variant="outlined" onClick={handleCancelDelete}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirmDelete} className="ml-2">Confirm</Button>
          </div>
        </div>
      </Dialog>
      <Dialog open={show} onClose={handleclose}>
        
    <div className="flex justify-center items-center bg-gray-100">
      <div className="md:w-[550px] max-w-md p-2 bg-white rounded shadow">
       <div className="flex" style={{justifyContent:"space-between"}}>
       <h1 className="mb-6 w-100 text-2xlfont-bold text-center">Enrollment</h1>
        <h1 className="mb-6 w-100 text-2xl text-gray-300  hover:text-gray-500 hover:font-bold text-center" style={{cursor:'pointer'}} onClick={handleclose}><Close/></h1>
       </div>
        <form onSubmit={handlesubmit}>
    
    
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose cource</InputLabel>
            <Select
  fullWidth
  value={OflinecourceId}
  onChange={(e:any) => {
    setOflinecourceId(e.target.value as string);
    const selectedCource = cources.find(
      (cource) => cource.Title === e.target.value
    )
    if (selectedCource) {
      setOflinecourceId(selectedCource.id);
    }
  }}
>
  {cources.map((cource) => (
    <MenuItem className="w-full" key={cource.id} value={cource.id}>
      {cource.Name}
    </MenuItem>
  ))}
</Select>

  
        </FormControl>
        
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

    </div>
  );
};

export default StudentEnrollment;