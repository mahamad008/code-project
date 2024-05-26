import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { getAllTeacherFn } from "../../../../redux/Slices/Dashboard/Teacher/GetAllTeacher";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import './Teacherlist.css'
import { Add, Close as CloseIcon, Delete, Edit , Money, Recycling } from '@mui/icons-material';
import { createTeacherFn, resetTeacherState } from "../../../../redux/Slices/Dashboard/Teacher/CreateTeacher";
import { Dialog, TextField } from "@mui/material";
import { Url } from "../../../../interfaces";

export const TeacherList: React.FC = () => {
  const toastId = 'createTeacCreateTeacher';
  const [Name, setName] = useState('');
  const [userId, setuserId] = useState('');
  const [password, setpassword] = useState('');
  const [open,setOpen]=useState(false)
  const [Amount, setAmount] = useState<number>();
  const [phone, setphone] = useState('');
  const allTeacherState = useSelector((state: RootState) => state.getallteachers);
  const [opendailog,setopendailog]=useState(false)
  const [deleteItemId,setDeleteItemId]=useState(null);
  const handleopenandclosedailog=(itemId:any)=>{
    setopendailog(!opendailog)
    setDeleteItemId(itemId)
  }

  useEffect(() => {
    dispatch(getAllTeacherFn());
  }, []);

  const handleDelete = async(id: any) => {
   await axios
      .put(`${Url}/teacher/trash/${id}`)
    dispatch(getAllTeacherFn());
    setopendailog(false)
    setDeleteItemId(null)
    location.reload()
  };

  const createTeacCreateTeacherState = useSelector(
    (state: RootState) => state.createTeacher
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    const storedId = localStorage.getItem('n');
    setuserId(storedId!);
  },[])

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    const data: any = {
      Name,
      phone,
      Amount,
      method:"$",
      password:"mmm",
      userId
    };
    if(!Name ||!Amount){
      return toast.error('please provide valid data',{id:toastId})
    }
    await dispatch(createTeacherFn(data))
    dispatch(getAllTeacherFn());
    setOpen(false)
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (createTeacCreateTeacherState.isLoading)
      toast.loading('Saving...', { id: toastId });

    if (createTeacCreateTeacherState.isSuccess) {
      toast.success('Successfully created.', { id: toastId });
      navigate('/dashboard/Teachers');
    }

    if (createTeacCreateTeacherState.isError) {
      toast.error(createTeacCreateTeacherState.errorMsg, { id: toastId });
    }

    dispatch(resetTeacherState());
  }, [
    createTeacCreateTeacherState.isLoading,
    createTeacCreateTeacherState.isSuccess,
    createTeacCreateTeacherState.isError,
  ]);

  const handleclose=()=>{
    setOpen(false)
  }

  const handleopen=()=>{
    setOpen(true)
  }

  return (
    <div className='md:w-[1160px]'>
      <div className="flex justify-between">
        <div className='items-center flex mx-2 my-2'>
          <button className='border border-green-500 py-2 mx-2 my-2 rounded px-4' onClick={handleopen}>
            <Add/>New Teacher
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allTeacherState.data.filter((teacher: any) => !teacher.isDeleted).map((teacher: any) => (
            <tr key={teacher.Id}>
              <td className="border px-4 py-2">{teacher.Id}</td>
              <td className="border px-4 py-2">{teacher.Name}</td>
              <td className="border px-4 py-2">{teacher.password}</td>
              <td className="border px-4 py-2">{teacher.phone}</td>
              <td className="border px-4 py-2">${teacher.Amount}</td>
              <td className="border px-4 py-2">{dayjs(teacher.createdAt).format('YYYY-MM-DD')}</td>
              <td className="border px-4 py-2">{dayjs(teacher.updatedAt).format('YYYY-MM-DD')}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-600 px-4 rounded text-white py-1 my-2">
                  <Link to={`update/${teacher.Id}`}>
                    <Edit />
                  </Link>
                </button>
            
                <button className="bg-red-600 px-4 mx-2 rounded text-white py-1 my-2" onClick={() => handleopenandclosedailog(teacher.Id)}>
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog  open={open} onClose={handleclose}>
      <div className="w-[500px]">
      <div className="flex justify-between px-4">
         <h1 className="text-2xl font-bold">Register Teacher</h1>
          <p><CloseIcon/></p>
        </div>
      <form onSubmit={handleSubmit} style={{
        padding:'20px'
      }}>
            <div>
              <TextField
                name="Full Name"
                label="Full Name"
                fullWidth
                type='text'
                placeholder='Teacher name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
        
            <div className='teachersalary' style={{marginTop:20}}>
              <TextField
                   name="Salary"
                   label="Salary"
                   fullWidth
                type='number'
                className="my-2"
                placeholder='teacher salary $'
                value={Amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
        
            {/* <div className='' style={{marginTop:20}}>
              <input
               
                type='text'
                placeholder='cource Id'
                value={courceId}
                onChange={(e) => setcourceId(Number(e.target.value))}
              />
            </div> */}
            <div className="mt-2">
              <TextField
               name="Teacher phone"
               label="Teacher phone"
               fullWidth
                type='text'
                placeholder='phone'
                className="my-2"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </div>

          
       <div className='btntcontiner'>
       <button className='border border-green-500 w-full py-3 rounded hover:bg-green-500 hover:text-white'>
                {createTeacCreateTeacherState.isLoading ? 'Loading...' : 'Save'}
              </button>
            
       </div>

        </form>
      </div>
        </Dialog>
        <Dialog open={opendailog} onClose={handleopenandclosedailog}>
        <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this teacher?</h3>
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
