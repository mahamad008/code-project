// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { saveAs } from "file-saver";
// import "jspdf-autotable";
// import { Url } from "../../../../interfaces";
// import jsPDF from "jspdf";

// interface fee {
//   id: number;
//   studentId: number;
//   amountPaid: number;
//   CourceName: string;
//   Balance: number;
//   studentPhone: string;
//   studentName: string;
//   SubcourceId: number;
//   // amountPaid:number;
// }

// const FeeReport: React.FC = () => {
//   const [fees, setfees] = useState<fee[]>([]);
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");

//   const fetchfees = async () => {
//     try {
//       const response = await axios.get(`${Url}/fee/get/all`);
//       setfees(response.data.result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleReport = async () => {
//     try {
//       const response = await axios.get(`${Url}/fee/report`, {
//         params: {
//           month,
//           year,
//         },
//       });
//       setfees(response.data.fees);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     const tableData = fees.map((fee) => [
//       fee.id,
//       fee.studentId,
//       // fee.amountPaid,
//       fee.CourceName,
//       fee.Balance,
//       fee.amountPaid,
//       fee.studentPhone,
//       fee.studentName,
//       fee.SubcourceId,
//     ]);
//     doc.autoTable({
//       head: [
//         ["ID", "Student ID", "Course Name", "amountPaid Score", "score earned","Student Phone", "Student Name", "Subcourse ID"],
//       ],
//       body: tableData,
//     });
//     doc.save("fee_report.pdf");
//   };

//   useEffect(() => {
//     fetchfees();
//   }, []);

//   return (
//     <div className="shadow-md  bg-white p-4 mt-4 mx-4">
//       <h1>fee Report</h1>
//       <div>
//         <label>Month: </label>
//         <input
//           type="text"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Year: </label>
//         <input
//           type="text"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         />
//       </div>
//       <button className="bg-blue-600 text-white p-2 m-4 rounded-md" onClick={handleReport}>Generate Report</button>
//       <button className="bg-blue-600 text-white p-2 m-4 rounded-md" onClick={handleDownloadPDF}>Download as PDF</button>
//       <table className="w-full overflow-x-Auto">
//         <thead>
//           <tr>
//             <th className="border m-2 p-2 text-blue-600">ID</th>
//             <th className="border m-2 p-2 text-blue-600">Student ID</th>
//             {/* <th className="border m-2 p-2 text-blue-600">amountPaid</th> */}
//             <th className="border m-2 p-2 text-blue-600">Course Name</th>
//             <th className="border m-2 p-2 text-blue-600">amountPaid Score</th>
//             <th className="border m-2 p-2 text-blue-600">Score Earned</th>
//             <th className="border m-2 p-2 text-blue-600">Student Phone</th>
//             <th className="border m-2 p-2 text-blue-600">Student Name</th>
//             <th className="border m-2 p-2 text-blue-600">Subcourse ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {fees.map((fee) => (
//             <tr key={fee.id}>
//               <td className="border ">{fee.id}</td>
//               <td className="border ">{fee.studentId}</td>
              
//               <td className="border ">{fee.CourceName}</td>
//               <td className="border ">{fee.Balance}</td>
//               <td className="border ">{fee.amountPaid}</td>
//               <td className="border ">{fee.studentPhone}</td>
//               <td className="border ">{fee.studentName}</td>
//               <td className="border ">{fee.SubcourceId}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FeeReport;