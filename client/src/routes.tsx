import { createBrowserRouter, Outlet } from 'react-router-dom';

import NotFound from './component/Utils/NotFound/NotFound';
import { Login } from './Pages/Dashboard/Users/Login';
// import { DashRouter } from './Pages/Dashboard/DashRouter';
import { Teacher } from './Pages/Dashboard/Teacher/Teacher';
import { CreateTeacher } from './Pages/Dashboard/Teacher/CreateTeacher';
// import { StudentList } from './component/Dashboard/DataList/Student/StudentList';
import { Student } from './Pages/Dashboard/Students/Student';
import { User } from './Pages/Dashboard/Users/Users';
import { CreateStudent } from './Pages/Dashboard/Students/CreateStudent';
import { Salary } from './Pages/Dashboard/Salaries/Salary';
import { Fees } from './Pages/Dashboard/Fees/Fees';
import UpdatCategory from './Pages/Dashboard/Catogory/update';
import CreateFee from './Pages/Dashboard/Fees/CreateFees';
import { CreateSalary } from './Pages/Dashboard/Salaries/CreateSalary';
import { CreateExam } from './Pages/Dashboard/Exam/CreateExam';
import UpdateFee from './Pages/Dashboard/Fees/UpdateFee';
import UpdateTeacher from './Pages/Dashboard/Teacher/update';
import UpdateSalary from './Pages/Dashboard/Salaries/update';
import UpdateStudent from './Pages/Dashboard/Students/update';
import UpdateExam from './Pages/Dashboard/Exam/update';
import UpdateUser from './Pages/Dashboard/Users/update';
import PrintFee from './Pages/Dashboard/Fees/print';


import Register from './Pages/Dashboard/Users/Register';
import DashRouter from './Pages/Dashboard/DashRouter';
// import PaymentForm from './component/Dashboard/DataList/Payment/Payment';
import Main from './Pages/Dashboard/Main';
// import Payments from './Payment';
import ExamList from './component/Dashboard/DataList/Exam/ExamList';
import SearchForm from './component/Dashboard/DataList/Exam/Searchformexam';
import Createcource from './Pages/Dashboard/Oflinecource/Createcource';
import Oflinecource from './component/Dashboard/DataList/Oflinecource/Oflinecource';
import UpdateOflinecource from './Pages/Dashboard/Oflinecource/Update';
import Oflineenrollment from './component/Dashboard/DataList/Oflineenrollment/Oflineenrollment';
import UpdateOflineEnrollment from './Pages/Dashboard/Oflineenrollment/Update';
import CreatesubcourceOfline from './Pages/Dashboard/SubocurceOfline/Createcource';
import SubcourceOflineList from './component/Dashboard/DataList/SubcourceOfline/Subcource';
// import ContactLst from './component/Utils/Contact/Contact';
// import TeacherDashboardCourse from './TeacherDashboard/Cource/getallcourcesteacher';

import OflineCategoryList from './component/Dashboard/DataList/OflineCategory/OflineCategoryList';
import PaymentList from './component/Dashboard/DataList/Payment/PaymentList';
// import CourceList from './component/Dashboard/DataList/Cource/CourceList';
import Udateoflinesubcource from './Pages/Dashboard/SubocurceOfline/Update';

import RecyclePin from './component/Dashboard/DataList/Exam/RecyclePin';
import RecyclePinexam from './component/Dashboard/DataList/Exam/RecyclePin';

import UpdateUserAdmin from './Pages/Dashboard/Users/Updateadmin';
import ExamReport from './component/Dashboard/DataList/Exam/Report';
import Examreportday from './component/Dashboard/DataList/Exam/ReportDat';
// import FeeReport from './component/Dashboard/DataList/Fee/report';
import { FeeMonthList } from './component/Dashboard/DataList/FeeMonth/FeeMonthList';
import ExamStudent from './component/Dashboard/DataList/Student/ExamStudent';
import { StudentPaymentFee } from './component/Dashboard/DataList/Student/StudentPayment';
import StudentEnrollment from './component/Dashboard/DataList/Student/EnrollmentStudent';
import { SalaryTeacher } from './component/Dashboard/DataList/Teacher/SalaryTeacher';
import PayBalance from './component/Dashboard/DataList/Student/PayBalance';
import RequestTeacher from './component/Dashboard/DataList/RequestTeacher';
import Welcome from './component/Utils/welcome/welcome';




const Router = () => {
  return (
    <div className='flex flex-col  min-h-screen'>
      <div className='headerroute '>
        
      </div>

      <div className='body flex-grow'>
        <Outlet />
      </div>

 
    </div>
  );
};

export default Router;

export const router = createBrowserRouter([
  {   
    path: '/',
    element: <Router />,
    children: [
      {
        index: true,
        element: <Register/>,
      },

   
      {
        path: 'exam',
        element: <SearchForm/>,
      },
      {
        path: '/welcome',
        element: <Welcome/>,
      },

      {
        path: 'register',
        element: <Register />,
      },

      {
        path: '/login',
        element: <Login />,
      },
   
    


      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
{
  path:'/print/printfee/:id',
  element:<PrintFee/>
},

  {
    path: '/dashboard',
    element: <DashRouter />,
    children: [
      {  index:true, 
        path:'/dashboard',
        element: <Main/>,
      },
      {
        path:'RequestTeacher',
        children:[
{
  index:true,
  element:<RequestTeacher/>
}
        ]
      },
      {
        path: 'categories',
        children: [
        
          {
            path: 'new',
            // element: <CreateCategory/>,
            // element:<CreateCategory/>
          },
          {
            path:'update/:catId',
            element:<UpdatCategory/>
          },
 
          {
            path:'delete',
            // element:<ParentComponent/>
          }


        ],
      },

      {
        path:'feemonth',
        children:[
          {
            index:true,
            element:<FeeMonthList/>
          },
       
   
        ]
      },

      {
        path:'OflineCategory',
        children:[
          {
            index:true,
            element:<OflineCategoryList/>
          },
        
    
        ]
      },
      {
        path: 'Contact',
        children: [
   
          {
            path: 'new',
            // element: <CreateCategory/>,
            // element:<CreateCategory/>
          },
          {
            path:'update/:catId',
            element:<UpdatCategory/>
          },
   
          {
            path:'delete',
            // element:<ParentComponent/>
          }


        ],
      },
  
      {
        path:'payment',
        children:[
          {
            index:true,
            element:<PaymentList/>
          },
       
        ]
      }
      ,
      {
        path:'Teachers',
        children:[
          {
            index:true,
            element:<Teacher/>
          },{
            path:'new',
            element:<CreateTeacher/>
          },
         {
            path:'update/:Id',
            element:<UpdateTeacher/>
          },
         {
            path:'salary/:Id',
            element:<SalaryTeacher/>
          },
   
        ]
      },
     
      {
        path:'Students',
        children:[
          {
            index:true,
            element:<Student/>
          },{
            path:'new',
            element:<CreateStudent/>
          }
          ,{
            path:'update/:id',
            element:<UpdateStudent/>
          }
          ,{
            path:'enroll/:id',
            element:<StudentEnrollment/>
          }
          ,{
            path:'payment/:id',
            element:<StudentPaymentFee/>
          }
   
          ,{
            path:'balance/:id/pay/:id',
            element:<PayBalance/>
          }
          ,{
            path:'exam/:id',
            element:<ExamStudent/>
          }
       
        ]
      },
     
      {
        path:'oflinecources',
        children:[
          {
            index:true,
            element:<Oflinecource/>
          },{
            path:'new',
            element:<Createcource/>
          }
          ,{
            path:'update/:id',
            element:<UpdateOflinecource/>
          }
        
        ]
      },
     
      {
        path:'OFlineenrollment',
        children:[
          {
            index:true,
            element:<Oflineenrollment/>
          },{
            path:'new',
            element:<Createcource/>
          }
          ,{
            path:'update/:id',
            element:<UpdateOflineEnrollment/>
          }
        
        ]
      },
      {
        path:'Subcource',
        children:[
          {
            index:true,
            element:<SubcourceOflineList/>
          },{
            path:'new',
            element:<CreatesubcourceOfline/>
          }
          ,{
            path:'update/:id',
            element:<Udateoflinesubcource/>
          }
      
        ]
      },
      {
        path:'Salary',
        children:[
          {
            index:true,
            element:<Salary/>
          },{
            path:'new',
            element:<CreateSalary/>
          }
          ,{
            path:'update/:id',
            element:<UpdateSalary/>
          }
       
        ]
      },
     
      {
        path:'Fees',
        children:[
          {
            index:true,
            element:<Fees/>
          },
          {
            path:'new',
            element:<CreateFee/>
          },
          {
            path:'UpdateFee/:id',
            element:<UpdateFee/>
          }
          ,
      
          {
            path:'report',
            // element:<FeeReport/>
          }
        ]
      },
      {
        path:'Exams',
        children:[
          {
            index:true,
            element:<ExamList/>
          },{
            path:'new',
            element:<CreateExam/>
          }
          ,{
            path:'update/:id',
            element:<UpdateExam/>
          }
          ,{
            path:'recycle',
            element:<RecyclePin/>
          }
          ,{
            path:'report',
            element:<ExamReport/>
          }
          ,{
            path:'reportday',
            element:<Examreportday/>
          }
          ,{
            path:'cycle',
            element:<RecyclePinexam/>
          }
        ]
      },
     
      {
        path:'Users',
        children:[
          {
            index:true,
            element:<User/>
          }
          ,{
            path:'update/:id',
            element:<UpdateUser/>
          }
          ,{
            path:'admin/:id',
            element:<UpdateUserAdmin/>
          }
        ]
      },
      {
        path:'Users',
        children:[
          
          {
            index:true,
            element:<User/>
          },
         
    
        ]
      },
     
    
     
    ],
  },

]);
