import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Dialog } from "@mui/material";
import { CreateExam } from "../../../../Pages/Dashboard/Exam/CreateExam";
import UpdateExam from "../../../../Pages/Dashboard/Exam/update";
import { getAllexamFn } from "../../../../redux/Slices/Dashboard/Exam/Getallexams";
import { Add, Close, Delete, Edit, Recycling, Report } from "@mui/icons-material";
import './ExamList.css'
import { Url } from "../../../../interfaces";
const ExamList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allexamState = useSelector((state: RootState) => state.getAllExam);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setopen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate=useNavigate()

  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

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
    dispatch(getAllexamFn());
  }, []);

  const keys = [
    "id",
    "studentId",
    "userId",
    "Studentname",
    "studentPhone",
    "SubcourceId",
    "CourceName",
    "Score.earned",
    "Score.needed",
    "TakeDate",
    "UpdateDate",
    "Actions"
  ];

  const handleDelete = (id: any) => {
    axios.delete(`${Url}/exam/delete/` + id)
    dispatch(getAllexamFn())
    location.reload()
  };



  const searching = (data: any) => {
    return data.filter((item: any) =>
      item.studentPhone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="continterexamlist mt-4 p-4 rounded-5 shadow border mx-2 my-4">
      <div className="categ">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by student phone"
          className="p-2 mb-4 border border-gray-300 rounded-md sm:w-64"
        />
        <div className="flex">
       
          <button className="bg-green-500 py-2 px-16 mx-2 rounded hover:bg-green-600 text-white" onClick={handleopen}>
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
            {searching(allexamState.data).map((exmafn: any) => (
         !exmafn.isDeleted &&            <tr className="border" key={exmafn.id}>
         <td className="py-2 px-4 border">{exmafn.id}</td>
         <td className="py-2 px-4 border">{exmafn.studentId}</td>
         <td className="py-2 px-4 border">{exmafn.userId}</td>
         <td className="py-2 px-4 border">{exmafn.Studentname}</td>
         <td className="py-2 px-4 border">{exmafn.studentPhone}</td>
         <td className="py-2 px-4 border">{exmafn.SubcourceId}</td>
         <td className="py-2 px-4 border">{exmafn.CourceName}</td>
         <td className="py-2 px-4 border">{exmafn.Total}</td>
         <td className="py-2 px-4 border">{exmafn.Totalscore}</td>
         <td className="py-2 px-4 border">
           {dayjs(exmafn.TakeDate).format("DD, MMM YYYY")}
         </td>
         <td className="py-2 px-4 border">
           {dayjs(exmafn.UpdateDate).format("DD, MMM YYYY")}
         </td>
         <td className="py-2 px-4 flex items-center border">
           <button className="bg-green-500 py-2 px-2 mx-2 rounded hover:bg-green-600 text-white" >
             <Link to={`update/${exmafn.id}`}>
               <Edit />
             </Link>
           </button>
           <button className="bg-red-500 py-2 px-2 mx-2 rounded hover:bg-red-600 text-white" onClick={() => handleOpenDeleteDialog(exmafn.id)}>
             <Delete />
           </button>
         </td>
       </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={handleclose}>
        <div className="flex m-2 justify-between">
          <p>Register Exam</p>
          <p style={{ cursor: "pointer" }} onClick={handleclose}>
            <Close />
          </p>
        </div>
        <CreateExam />
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

export default ExamList;