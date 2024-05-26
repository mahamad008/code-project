import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from 'react-hot-toast';
import { Dialog, TextField } from '@mui/material';
import { Close as CloseIcon, Delete, Edit, Add as OpenIcon, Recycling } from '@mui/icons-material';
import './oflinecategory.css';
import { getAllOflineCategoryFn } from "../../../../redux/Slices/Dashboard/OflineCategory/GetAllOflineCategories";
import { createOflineCategoryFn } from "../../../../redux/Slices/Dashboard/OflineCategory/CreateOflineCategory";
import { Url } from "../../../../interfaces";

const OflineCategoryList = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenDeleteDialog = (itemId: any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const allOflineCategoryState = useSelector((state: RootState) => state.getalloflineCategory);
  const createOflineCategoryState = useSelector((state: RootState) => state.createcatogrySlice);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  console.log(setSearchQuery)
  const [OflineCatName, setOflineCatName] = useState('');
  const [oflineCatDescription, setOflineCatDescription] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    dispatch(getAllOflineCategoryFn());
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem('n');
    setUserId(storedId!);
  }, []);

  const handleDelete = async (OflineCatId: any) => {
    await axios.delete(`${Url}/OflineCategory/delete/` + OflineCatId);
    dispatch(getAllOflineCategoryFn());
    setOpenDeleteDialog(false);
    setDeleteItemId(null);
  };

  const searching = (data: any) => {
    return data.filter((item: any) =>
      item.OflineCatName.toLowerCase().includes(searchQuery.toLowerCase()) && !item.isDeleted
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data: any = {
      OflineCatName,
      oflineCatDescription,
      userId
    };
    if (!OflineCatName || !oflineCatDescription) {
      return toast.error('Please provide valid data');
    }
    await dispatch(createOflineCategoryFn(data)).then(() => {
      dispatch(getAllOflineCategoryFn());
      setOpen(false);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="m-2">
      <div className="flex gap-4">
   
        <button className="border flex items-center text-green-500 hover:text-white hover:bg-green-500 border-green-500 my-2 px-4 py-1 rounded" type="button" onClick={() => setOpen(true)}>
          <OpenIcon /> New Category
        </button>
      </div>

      <div className="overflow-x-auto" style={{ width: '100%' }}>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Category Name</th>
              <th className="px-4 py-2">Category Description</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Updated At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searching(allOflineCategoryState.data).map((catItem: any) => (
              <tr key={catItem.OflineCatId}>
                <td className="border px-4 py-2">{catItem.OflineCatName}</td>
                <td className="border px-4 py-2">{catItem.oflineCatDescription}</td>
                <td className="border px-4 py-2">{dayjs(catItem.createdAt).format('DD/MM/YYYY')}</td>
                <td className="border px-4 py-2">{dayjs(catItem.updatedAt).format('DD/MM/YYYY')}</td>
                <td className="border px-4 py-2">
                  <button className="bg-green-500 py-1 text-white px-4 rounded my-2">
                    <Link to={`update/${catItem.OflineCatId}`}>
                      <Edit />
                    </Link>
                  </button>
                  <button className="bg-red-500 py-1 mx-2 text-white px-4 rounded my-2" onClick={() => handleDelete(catItem.OflineCatId)}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <Dialog open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit} className="p-4 w-full md:w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-800">Register category</p>
              <p className="text-gray-500 cursor-pointer" onClick={() => setOpen(false)}>
                <CloseIcon />
              </p>
            </div>
            <div className="input-group mb-4">
              <TextField
                fullWidth
                label="Category Name"
                name="Category Name"
                className="input-field"
                type="text"
                placeholder="Category Name"
                value={OflineCatName}
                onChange={(e) => setOflineCatName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <TextField
                fullWidth
                label="Category Description"
                name="Category Description"
                type="text"
                // placeholder

              placeholder="Category Description"
              value={oflineCatDescription}
              onChange={(e) => setOflineCatDescription(e.target.value)}
            />
          </div>
          <div className="btns-category mt-4">
            <button
              className="py-3 rounded hover:text-white border-green-500 border hover:bg-green-500 w-full"
              type="submit"
              disabled={createOflineCategoryState.isLoading}
            >
              {createOflineCategoryState.isLoading ? 'Loading...' : 'Save'}
            </button>
          </div>
        </form>
    </Dialog>

  </div>
  );
};
export default OflineCategoryList
