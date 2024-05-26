import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { getAlluserFn } from '../../../../redux/Slices/Dashboard/User/GetAllUsers';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';
import { Close} from '@mui/icons-material';
import { Dialog, FormControl, Select, MenuItem} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { Delete, Recycling } from '@mui/icons-material';
import { Url } from '../../../../interfaces';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenAndCloseDialog = (itemId: any) => {
    setOpenDialog(!openDialog);
    setDeleteId(itemId);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
console.log(handleSearch)
  const dispatch = useDispatch<AppDispatch>();
  const getAllUsers = useSelector((state: RootState) => state.getAllusers);
  useEffect(() => {
    dispatch(getAlluserFn());
  }, [dispatch]);
  const [Roles, setRoles] = useState(false);

  const handleRoleChange = (event:any) => {
    setSelectedRole(event.target.value);
  };
  const showRoles = (itemId:any) => {
    setRoles(true);
    setSelectedUserId(itemId);
  };

  const hideRoles = () => {
    setRoles(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params: any) => (
        <div>
      
          <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mx-2' onClick={() => handleOpenAndCloseDialog(params.row.id)}>
            <Delete />
          </button>
        </div>
      ),
    },
  ];

  const rows = getAllUsers.data
    .filter((user) => !user.IsDeleted && user.givenName.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((user) => ({
      id: user.id,
      name: user.givenName,
      username: user.username,
      email: user.email,
      role: user.isAdmin ? 'Admin' : 'User',
      createdAt: dayjs(user.createdAt).format('DD/MM/YYYY'),
    }));

  const handleDelete = (id: any) => {
    axios.put(`${Url}/user/trash/` + id);
    dispatch(getAlluserFn());
    setOpenDialog(false);
    setDeleteId(null);
    navigate('/dashboard/users/recycle');
  };

  const handleSubmit = async () => {
    const data = {
      id: selectedUserId,
      isAdmin: selectedRole === "true", // Convert selectedRole to boolean
    };
    await axios.put(`${Url}/user/permission/${data.id}`, data);
    setRoles(false);
    // Call the API to refresh the user data
    dispatch(getAlluserFn());
  };
  return (
    <div className="my-8 mx-2">
      <div className="flex md:justify-between">
        <button>.</button>
        <Link className='bg-green-500 py-2 text-white my-2 hover:bg-green-600 px-6' to={'recycle'}>
          Trash<Recycling />
        </Link>
      </div>
      <div className="overflow-auto" style={{ height: 400, width: '97%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      <Dialog open={openDialog} onClose={handleOpenAndCloseDialog}>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</h3>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
              onClick={handleOpenAndCloseDialog}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
              onClick={() => handleDelete(deleteId)}
            >
              Confirm
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog open={Roles} onClose={hideRoles}>
        <div className="p-4 w-[400px]">
        <div className="flex my-4 justify-between">
        <h3 className="text-lg font-bold ">Change User Role</h3>
          <button onClick={hideRoles}><Close/></button>
        </div>
          <FormControl fullWidth>
            <Select value={selectedRole} onChange={handleRoleChange}>
              <MenuItem  className="w-full" value="false">User</MenuItem>
              <MenuItem className="w-full" value="true">Admin</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-4 mt-4">
            <button className="bg-red-500 px-3 py-1 rounded" onClick={hideRoles}>
              Cancel
            </button>
            <button className="bg-green-500 px-2 rounded py-2" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserList;
