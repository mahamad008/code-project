// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllExamFn, setSearchQuery } from '../../../../redux/Slices/Dashboard/Exam/Getallexams';
// import { AppDispatch, RootState } from '../../../../redux/store';

// const ExamList: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const allExamState = useSelector((state: RootState) => state.getAllExam);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(getAllExamFn());
//   }, [dispatch]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   if (allExamState.isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (allExamState.isError) {
//     return <div>Error: {allExamState.errorMsg}</div>;
//   }

//   if (allExamState.isSuccess) {
//     const filteredData = allExamState.data.filter((exam) =>
//       exam.phone.includes(searchQuery)
//     );

//     return (
//       <div style={{
//         marginTop:'800px'
//       }}>
//         <input
//           type="text"
//           placeholder="Search by phone number"
//           value={searchQuery}
//           onChange={handleInputChange}
//         />
//         <ul>
//           {filteredData.map((exam: any) => (
//             <li key={exam.id}>
//               <div>Name: {exam.Name}</div>
//               <div>Phone: {exam.phone}</div>
//               {/* Render other exam data */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   return null;
// };

// export default ExamList;