import "./Navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {  useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { LogoutOutlined,NotificationAdd, MailRounded, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/Slices/Dashboard/User/userInfo";

const Navbar = () => {
  const dispatch =useDispatch<AppDispatch>()
  const logoutHandler = () => {
    dispatch(Logout());
  };
  const [show, setShow] = useState(false);
//   const { dispatch } = useContext(DarkModeContext);
const userInfo = useSelector((state: RootState) => state.userInfo);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search"> 
           <input style={{         border: 'none',
          outline: 'none',
          background: 'transparent'}} type="text" placeholder="Search..." /> 
         <SearchOutlinedIcon />
          <div></div>
        </div> 
        <div className="items">
    
          <div className="item">
          {userInfo.givenName ? (
            <div className='showinddatabuttons grid grid-cols-2 '>
              <div className='relative'>
                {/* image */}
          <div className="flex items-center gap-4">
          <div
                  
                  onClick={() => setShow(!show)}
                
                >
                  {' '}
                  
                  <p className='profile'>{userInfo.givenName[0]}</p>
                </div>
                <div>
               <span  style={{
                  cursor:'pointer',
                 width:'80px',
                 marginTop:'60px',
                 height:'80px',
                  color:'black',
                
                }}> <NotificationAdd/></span>
               </div>
          </div>
                {/* options */}
                

                { show ? (
                <div className="adminsdashboard bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded absolute">
                <div>
                  <p className=" text-gray-400"><Person/>{userInfo.givenName}</p>
                  
         <div>
         <button className="dashboards rounded-lg mt-4">
                  {userInfo.isAdmin && (
                  
                  <button className='flex'><Link to="/dashboard"><MailRounded/> Dashboard     </Link></button>
             
                    )}
                  </button>
         </div>
               <div>
               <button
                    onClick={logoutHandler}
                    className="text-green-500 font-semibold  hover:text-green-700"
                  >
                  <LogoutOutlined/> Logout
                  </button>
               </div>
             
                </div>
                
                 
                </div>
             
                ) : null}
              </div>
              <div>

              </div>
            </div>
          ) : (
            <>
              <Link to='/register'>
                <button className='regbtns'>
                  Register
                </button>
              </Link>
              <Link to={'/login'}>
                <button  className='logbtns'>
                  Login
                </button>
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;