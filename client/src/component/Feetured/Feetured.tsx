// import React from 'react'
import './Feetured.css'
// import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
// import UserCount from '../../Pages/Dashboard/Users/Count'
import CategoryCount from '../../Pages/Dashboard/Catogory/Count'
import CourceCount from '../../Pages/Dashboard/Cource/Count'
import TeacerCount from '../../Pages/Dashboard/Teacher/Count'
import CountFee from '../../Pages/Dashboard/Fees/Count'
import Feechart from '../Dashboard/DataList/Fee/FeeChart'
import {Link} from 'react-router-dom'
const Feetured = () => {
  return (
<div className="flex w-[83%] md:w-[100%]  pt-16 md:pt-2 mx-2 ">
<div className="gap-4">
<div className="grid  md:h-[100px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">


  <div className="bg-white w-full rounded shadow p-6 hover:bg-white transition-colors duration-300">
   <div className="flex justify-between">
   <h2 className="text-lg font-semibold text-green-500 mb-4">PaymFees</h2>
    <span className=" font-bold text-2xl text-white pt-1 bg-green-500 px-4 rounded-full text-center "><CountFee/></span>
   </div>
    <div className="flex items-center justify-between">
      
      <Link to="/dashboard/fees" className="text-blue-500 hover:underline">View all Payment Fees</Link>
    </div>
  </div>

  <div className="bg-white rounded shadow p-6 hover:bg-white transition-colors duration-300">
   <div className="flex justify-between">
   <h2 className="text-lg font-semibold text-green-500 mb-4">Courses</h2>
    <span className=" font-bold text-2xl text-white pt-1 bg-green-500 px-4 rounded-full text-center "><CourceCount/></span>
   </div>

    <div className="flex items-center justify-between">
      <Link to="/dashboard/cources" className="text-blue-500 hover:underline">View all Courses</Link>
    </div>
  </div>

  <div className="bg-white w-[400px] rounded shadow p-6 hover:bg-white transition-colors duration-300">
   <div className="flex justify-between">
   <h2 className="text-lg font-semibold text-green-500 mb-4">Teachers</h2>
    <span className=" font-bold text-2xl text-white pt-1 bg-green-500 px-4 rounded-full text-center "><TeacerCount/></span>
   </div>

    <div className="flex items-center justify-between">
      <Link to="/dashboard/teachers" className="text-blue-500 hover:underline">View all Teachers</Link>
    </div>
  </div>


  {/* <Feechart/> */}
</div>
<div className='w-[390px] mt-[50px]'>
  <Feechart/>
  </div>
</div>
</div>
  )
}

export default Feetured