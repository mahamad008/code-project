import { configureStore } from '@reduxjs/toolkit';
import { getAllCategorySlice } from './Slices/Dashboard/Category/GetAllCategories';

import CreatecontactSlice from './Slices/contactSlice';
import createCatgorySlice from './Slices/Dashboard/Category/CreateCategory';

import { getAllStudentSlice } from './Slices/Dashboard/Student/GetAllStudents';
import { createCourceSlice } from './Slices/Dashboard/cources/CreateCource';
import { getAllcourceSlice } from './Slices/Dashboard/cources/GetAllCources';
import { getAllTeacherSlice } from './Slices/Dashboard/Teacher/GetAllTeacher';
import { getAlluserSlice } from './Slices/Dashboard/User/GetAllUsers';
import { getAllSalarySlice } from './Slices/Dashboard/salary/GetAllsalry';
import { getAllFeeSlice } from './Slices/Dashboard/fee/GetAllFee';
import createTeacherSlice from './Slices/Dashboard/Teacher/CreateTeacher';
import { createfeeSlice } from './Slices/Dashboard/fee/CreateFee';
import { createstudentSlice } from './Slices/Dashboard/Student/Createstudent';
import { creatSalarySlice } from './Slices/Dashboard/salary/Createsalary';
import createExamSlice from './Slices/Dashboard/Exam/CreateExam';
import { getAllNewsSlice } from './Slices/Dashboard/News/GetAllCategories';
import registerSlice from './Slices/Dashboard/User/Register';
import { LoginSlice } from './Slices/Dashboard/User/Login';
import userInfoSlice from './Slices/Dashboard/User/userInfo';
import { getAllexamSlice } from './Slices/Dashboard/Exam/Getallexams';
import Createoflincource from './Slices/Dashboard/Oflinecource/CreateOflinecource';
import { getAllOflineCourceSlice } from './Slices/Dashboard/Oflinecource/getall';
import { getAllOflineEnrollmentSlice } from './Slices/Dashboard/OflineEnrollment.ts/Getalloflineenrolment';
import { createOflineenrollmentSlice } from './Slices/Dashboard/OflineEnrollment.ts/CreateEnrollment';
import CreateOflineSubcourceSlice from './Slices/Dashboard/SubcourceOfline/Createsubcourceofline';
import { getAllOflineSubCourceSlice } from './Slices/Dashboard/SubcourceOfline/getall';
import { getAllContactSlice } from './Slices/Dashboard/Contact/Getallcontact';
import CreateOflineCategory from './Slices/Dashboard/OflineCategory/CreateOflineCategory';
import { getAllOflineCategorySlice } from './Slices/Dashboard/OflineCategory/GetAllOflineCategories';
// import getallsetionSlice from './Slices/Dashboard/Section/getallsection';
// import { getAllsubSubcategorySlice } from './Slices/Dashboard/Subcategory/GetallSubcategory';


export const store = configureStore({
  reducer: {
    user:registerSlice.reducer,
    login: LoginSlice.reducer,
    userInfo: userInfoSlice.reducer, 
   //contact
    contact:CreatecontactSlice.reducer,
    // dashboard
    //Fee
    getAllFee:getAllFeeSlice.reducer,
    //Salary

    getAllsalaries:getAllSalarySlice.reducer,
    createSalary:creatSalarySlice.reducer,
    //user
    getAllusers:getAlluserSlice.reducer,
    //student
    getAllstudent:getAllStudentSlice.reducer,
    createstudent:createstudentSlice.reducer,
    //TEACHER
    getallteachers:getAllTeacherSlice.reducer,
    createTeacher:createTeacherSlice.reducer,
      //cource
    getallcources:getAllcourceSlice.reducer,
    createcourceStat:createCourceSlice.reducer,
    // category
    createcatogrySlice:createCatgorySlice.reducer,

    getAllCategory: getAllCategorySlice.reducer,

     //exam
     getAllExam:getAllexamSlice.reducer,
     createExam:createExamSlice.reducer,
     //Courceofline
     Createcourceofline:Createoflincource.reducer,
     getalloflinecources:getAllOflineCourceSlice.reducer,
     //oflineenrollment

     getalloflineEnrollment:getAllOflineEnrollmentSlice.reducer,
     createoflinerollment:createOflineenrollmentSlice.reducer,


     //News
     getallNews:getAllNewsSlice.reducer,
     CreateFee:createfeeSlice.reducer,
     //Subcourceofline
     createsubcourceofline:CreateOflineSubcourceSlice.reducer,
     getallsubcource:getAllOflineSubCourceSlice.reducer,

     //contact
     getAllContact:getAllContactSlice.reducer,
     //section

     //OflineCategory
     CreateOflineCategory:CreateOflineCategory.reducer,
     getalloflineCategory:getAllOflineCategorySlice.reducer,
    // dashboard
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>; // useSelector
export type AppDispatch = typeof store.dispatch; // useDispatch
