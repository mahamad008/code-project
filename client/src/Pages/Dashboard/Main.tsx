

import Feetured from "../../component/Feetured/Feetured";
import Calendar from "./Calendar";


import "./Mian.css";


 const Main = () => {
  return (

    <div>
  <div className="bg-gray-100 ">
 <div className="md:flex">
<div className="">
<Feetured/>

</div>
<div className="md:w-[500px]">
<Calendar/>

</div>
 </div>

  
  </div>
    </div>
  );
};
export default Main