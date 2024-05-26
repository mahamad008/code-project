import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import axios from "axios";
import { Link,useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Dialog, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UpdateExam from "../../../../Pages/Dashboard/Exam/update";
import { Add, Close, Delete, Edit, Recycling } from "@mui/icons-material";
import { Url } from "../../../../interfaces";
import { createExamFn } from "../../../../redux/Slices/Dashboard/Exam/CreateExam";
interface Course {
  SubcourceId: string; // Adjust this according to the actual type of SubcourceId
  Title: string;
  // Add other properties if necessary
}

const ExamStudent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setopen] = useState(false);
  const {id}=useParams()
  console.log(setSearchQuery)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate=useNavigate()
  const [cources, setCources] = useState<Course[]>([]);
  const [exams,setExam]=useState([])
  const [userId, setuserId] = useState('');
  useEffect(()=>{
    const storedId = localStorage.getItem('n');
   setuserId(storedId!);
  },[])
  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };


  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
useEffect(()=>{
 const res=async()=>{
    const response=await axios.get(`${Url}/subcource/get/all`)
    setCources(response.data.result)
 }
 res()
},[])
  const handleclose = () => {
    setopen(false);
  };
  const handleopen = () => {
    setopen(true);
  };
  const [openupdate, setopenupdate] = useState(false);
  const handlecloseupdate = () => {
    setopenupdate(false);
  };
  // const handleopenupdate = () => {
  //   setopenupdate(true);
  // };
  // const [deleteExamId, setDeleteExamId] = useState("");
  // const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  useEffect(() => {
 const res=async()=>{
  const response=await axios.get(`${Url}/student/get/exam/${id}`)
  setExam(response.data)
 }
 res()
  }, []);

  const keys = [
    "id",
    "CourceName",
    "Total score earned",
    "Total score needed",
    "userId",
    "TakeDate",
    "UpdateDate",
    "Actions"
  ];

  const handleDelete = (id: any) => {
    axios.put(`${Url}/exam/trash/` + id)
    
    // setShowDeleteWarning(false)

    setOpenDeleteDialog(false)
  };

  // const deleteExam = () => {
  //   axios.put("http://localhost:5000/api/exam/trash/" + deleteExamId)
  //   
  //   setShowDeleteWarning(false)
  // };

  // const cancelDelete = () => {
  //   setShowDeleteWarning(false);
  // };

  const searching = (data: any) => {
    return data.filter((item: any) =>
      item.studentPhone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
//Create exam
const Dispatch=useDispatch<AppDispatch>()

 const [CourceName,setCourceName]=useState('')
 const[SubcourceId,setSubcourceId]=useState('')
  const[studentId,setstudentId]=useState('')
  const[Studentname,setStudentname]=useState('')
  const[studentPhone,setstudentPhone]=useState('')
  const[Total,setTotal]=useState('')
  const[Totalscore,setTotalscore]=useState('')
const handlesupmit=(e:any)=>{
  e.preventDefault()
  const data:any={
    Studentname,
    studentPhone,
    CourceName,
    Total,
    Totalscore,
    studentId,
    SubcourceId,
    userId
  }
  Dispatch(createExamFn(data)).then((resp)=>{
    console.log(resp)
  }).catch((error:any)=>{
    console.log(error)
  })

  
}
const handlestudentidChange =()=>{
    setstudentId(id!); // Automatically set studentId from id parameter
    axios.get(`${Url}/student/get/one/${id}`).then((response) => {
      const { Name, phone } = response.data;
      setStudentname(Name);
      setstudentPhone(phone);
    });
  }

  useEffect(()=>{
    handlestudentidChange()
  },[])
  return (
    <div className="continterexamlist mt-4 p-4 rounded-5 shadow-md mx-2 my-4">
      <div className="categ">
    .
        <div className="flex items-center gap-2">
         
        
          <button className="bg-green-500 py-2 hover:bg-green-600 text-white px-4 rounded" onClick={handleopen}>
            <Add/>New Exam
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-2 rounded">
          <thead>
            <tr>
              {keys.map((keyItem, idx) => (
                <th key={idx} className=" py-2 px-4 border">
                  {keyItem}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="">
            {exams && searching(exams).map((exmafn: any) => (
         !exmafn.isDeleted &&            <tr className="border" key={exmafn.id}>
         <td className="py-2 px-4 border">{exmafn.id}</td>

         <td className="py-2 px-4 border">{exmafn.CourceName}</td>
         <td className="py-2 px-4 border">{exmafn.Total}</td>
         <td className="py-2 px-4 border">{exmafn.Totalscore}</td>
         <td className="py-2 px-4 border">{exmafn.userId}</td>

         <td className="py-2 px-4 border">
           {dayjs(exmafn.TakeDate).format("DD, MMM YYYY")}
         </td>
         <td className="py-2 px-4 border">
           {dayjs(exmafn.UpdateDate).format("DD, MMM YYYY")}
         </td>
         <td className="py-2 px-4 border">
           <button className="mr-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
             <Link to={`/dashboard/exams/update/${exmafn.id}`}>
               <Edit />
             </Link>
           </button>
           <button className="bg-red-500 hover:bg-red-600 text-white px-4 rounded py-2" onClick={() => handleOpenDeleteDialog(exmafn.id)}>
             <Delete />
           </button>
         </td>
       </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={handleclose}>
<div className="bg-white">
<div className="flex mx-3 my-2 justify-between">
          <p className="text-1xl font-bold">Register Exam</p>
          <p style={{ cursor: "pointer" }} onClick={handleclose}>
            <Close />
          </p>
        </div>
        <div className=" p-4  bg-white w-[500px]">
        <form onSubmit={handlesupmit}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose cource</InputLabel>
            <Select
  fullWidth
  value={CourceName}
  onChange={(e:any) => {
    setCourceName(e.target.value as string);
    const selectedCource = cources.find(
      (cource) => cource.Title === e.target.value
    );
    if (selectedCource) {
      setSubcourceId(selectedCource.SubcourceId);
      setCourceName(selectedCource.Title);
    }
  }}
>
  {cources.map((cource) => (
    <MenuItem className="w-full" key={cource.SubcourceId} value={cource.Title}>
      {cource.Title}
    </MenuItem>
  ))}
</Select>

  
        </FormControl>
    
       
        <div className="mb-4">
          <input
            type="text"
            id="Total"
            value={Total}
            placeholder="Enter the Total Score earned"
            onChange={(e) => setTotal(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="Total"
            value={Totalscore}
            placeholder="Enter the Score needed"
            onChange={(e) => setTotalscore(e.target.value)}
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

      <Dialog open={openupdate} onClose={handlecloseupdate}>
        <UpdateExam />
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
      <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold">Are you sure you want to delete this Exam ?</h3>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
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

export default ExamStudent;