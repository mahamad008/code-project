import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { getAllSalaryFn } from "../../../../redux/Slices/Dashboard/salary/GetAllsalry";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import './SalaryList.css'
import { Dialog, TextField } from "@mui/material";
import { toast } from 'react-hot-toast';
// import { CreateSalary } from "../../../../Pages/Dashboard/Salaries/CreateSalary";
import { Add, CloseOutlined, Delete, Edit, Recycling } from "@mui/icons-material";
import { createSalaryFn, resetSalaryState } from "../../../../redux/Slices/Dashboard/salary/Createsalary";
import { Url } from "../../../../interfaces";
export const SalaryList: React.FC = () => {
  const [open,setopen]=useState(false)
  const [userId,setuserId]=useState("")
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleclose=()=>{
    setopen(false)
  }
  const handleopen=()=>{
    setopen(true)
  }
const allSalaryState = useSelector((state: RootState) => state.getAllsalaries);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllSalaryFn());
  }, []);

  const [searchteacherphone, setsearchteacherphone] = useState('');

  const keys = [
    'Id',
    'TeacherId',
    'TeacherName',
    'userId',
    'TeacherPhone',
     'Amount',
     'Pay Date',
    'Actions',
  ];

  const handleDelete = (id: any) => {
    axios
      .put(`${Url}/salary/trash/${id}`)
      dispatch(getAllSalaryFn());
      handleCloseDeleteDialog()
  };
  const toastId = 'createSalary';
  const [Amount, setAmount] = useState<number>(Number);
  const [teacherId, setteacherId] = useState<number>(Number);
  const [TeacherPhone, setTeacherPhone] = useState('');
  const [TeacherName, setTeacherName] = useState('');
  // const [Id, setId] = useState<Number>(0);


  const createSalaryState = useSelector(
    (state: RootState) => state.createSalary
  );
  // const dispatch = useDispatch<AppDispatch>();
useEffect(()=>{
  const storedId = localStorage.getItem('n');
   setuserId(storedId!);
},[])
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: any = {
      Amount,
      teacherId,
      TeacherPhone,
      TeacherName,
      method:"$",
      userId
    };
    if (!Amount || !teacherId) {
      return toast.error('please provide valid data', { id: toastId });
    }
    dispatch(createSalaryFn(data))
      location.reload();
    // });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (createSalaryState.isLoading)
      toast.loading('Saving...', { id: toastId });

    if (createSalaryState.isSuccess) {
      toast.success('Successfully created.', { id: toastId });
      navigate('/dashboard/salary');
    }

    if (createSalaryState.isError) {
      toast.error(createSalaryState.errorMsg, { id: toastId });
    }

    dispatch(resetSalaryState());
  }, [
    createSalaryState.isLoading,
    createSalaryState.isSuccess,
    createSalaryState.isError,
  ]);

  const handleTeacherIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    setteacherId(id);

    // Make API call to fetch teacher data
    axios.get(`${Url}/teacher/get/one/${id}`)
      .then((response) => {
        const { Name, phone, Amount } = response.data;
        setTeacherName(Name);
        setTeacherPhone(phone);
        setAmount(Amount);
      })
      .catch((error) => {
        console.log(error);
        // Handle error if necessary
      });
  };
  return (
    <div className='salaryparent shadow-md'>
      <div className='flex my-2 md:justify-between'>
              <input
  type="text"
  value={searchteacherphone}
  onChange={(e) => setsearchteacherphone(e.target.value)}
  placeholder="Search by teacherphone"
/>
       <div className="flex gap-2">
       <button className='bg-green-500 hover:bg-green-600 text-white px-4 rounded' onClick={handleopen}>
         <Add/>Pay  salary
        </button>
       
       </div>
      </div>

      <table className='salarychild w-full'>
        <thead>
          <tr>
            {keys.map((keyItem, idx) => (
              <th key={idx}>{keyItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allSalaryState.data
            .filter((salary) =>
              salary.TeacherPhone
                ?.toString()
                .includes(searchteacherphone.toLowerCase())
            )
            .map((mapSalary) => (
            !mapSalary.isDeleted ?   <tr className='border' key={mapSalary.id}>
            <td className='py-4 px-3'>{mapSalary.id}</td>
            <td className='py-4 px-3'>{mapSalary.teacherId}</td>
            <td className='py-4 px-3'>{mapSalary.TeacherName}</td>
            <td className='py-4 px-3'>{mapSalary.userId}</td>
            <td className='py-4 px-3'>{mapSalary.TeacherPhone}</td>
            <td className='py-4 px-3'>{mapSalary.method}{mapSalary.Amount}</td>
           
            <td className='py-4 px-3'>
              {dayjs(mapSalary.createdAt).format('DD/MM/YYYY')}
            </td>
        
            <td className='flex gap-2 items-center'>
             
            <Link to={`update/${mapSalary.id}`}><button  className='bg-green-500 hover:bg-green-600 text-white px-4 rounded py-2'><Edit/></button></Link>
            
              <button
                className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded'
                onClick={() => handleOpenDeleteDialog(mapSalary.id)}
              >
                <Delete/>
              </button>
            </td>
          </tr>:null
            ))}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleclose}>
      <div className=' border rounded-lg'>
      <div className='w-[500px] '>
        <form onSubmit={handleSubmit}  className="p-4">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{
              fontWeight: 'bolder',
              fontSize: '20px'
            }}>Register Salary</h1>
            <p style={{
              cursor: 'pointer',
              fontSize: '1px',
              color: "gray"
            }} onClick={handleclose}><CloseOutlined /></p>
          </div>
          <div style={{
            marginTop: '10px'
          }}>
            <TextField
              name='TeacherId'
              fullWidth
              label='TeacherId'
              className='mt-4'
              type='text'
              placeholder='teacher Id'
              value={teacherId}
              onChange={handleTeacherIdChange}
            />
          </div>
        
          <div style={{ marginTop: 20 }}>
            <TextField
              name='Teacher Name'
              fullWidth
              label='Teacher Name'
              type='text'
              placeholder='Teacher Name'
              value={TeacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
          <div className='' style={{ marginTop: 20 }}>
            <TextField
              label='Teacher Phone'
              name='Teacher Phone'
              type='text'
              fullWidth
              placeholder='Teacher Phone'
              value={TeacherPhone}
              onChange={(e) => setTeacherPhone(e.target.value)}
            />
          </div>
          <div className='' style={{ marginTop: 20 }}>
            <TextField
              name='Salary'
              label='Salary'
              type='number'
              placeholder='Amount'
              fullWidth
              value={Amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
         <div className='btnss'>
            <button className='svsalrybtn'>
              {createSalaryState.isLoading ? 'Loading...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this salsry ?</h3>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 bg-blue-400 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
        onClick={handleCloseDeleteDialog}
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