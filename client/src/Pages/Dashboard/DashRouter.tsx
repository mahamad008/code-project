import Sidebar from '../../component/Dashboard/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
// import { Switch } from '@mui/material';
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Home, LogoutOutlined, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Logout } from "../../redux/Slices/Dashboard/User/userInfo";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import CategoryCount from './Catogory/Count';
import { jwtDecode } from 'jwt-decode' // Import jwt_decode

interface User {
  id: number;
  givenName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token:string;
}
interface JwtPayload {
  id: number;
  givenName: string;
  username: string;
  email: string;
  isAdmin: boolean;
  // Add other properties if necessary
}
const DashRouter: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
 
  const [show, setShow] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  // const [Mode, setMode] = useState(false);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      const user: User = JSON.parse(userData);
       const token=(user.token)
       const decode: JwtPayload = jwtDecode(token);      //  const 
      // Check if user is admin
      if (decode.isAdmin) {
        // Redirect to a different page if not admin
        navigate('/welcome');
        
      }
    } else {
      // Redirect to login page if user data is not found
      // navigate('/login');
    }
  }, [navigate]);


  // const handleMode = () => {
  //   setMode(!Mode);
  // };

  return (
    <div className={`dashboardrouter`}>
      <div className=''>
        <Sidebar />
      </div>
    <div className='w-[100%] bg-white'>
     
        <Outlet />
      </div>
    </div>
  );
};

export default DashRouter;