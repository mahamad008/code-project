import React, { useEffect, useState } from "react";
import axios from "axios";
// import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Url } from "../../../../interfaces";

interface Exam {
  id: number;
  studentId: number;
  Total: number;
  CourceName: string;
  Totalscore: number;
  studentPhone: string;
  Studentname: string;
  SubcourceId: number;
  // Total:number;
}

const ExamReport: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
console.log(setMonth)
console.log(setYear)
  const fetchExams = async () => {
    try {
      const response = await axios.get(`${Url}/exam/get/all`);
      setExams(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReport = async () => {
    try {
      const response = await axios.get(`${Url}/exam/report`, {
        params: {
          month,
          year,
        },
      });
      setExams(response.data.exams);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // const tableData = exams.map((exam) => [
    //   exam.id,
    //   exam.studentId,
    //   // exam.Total,
    //   exam.CourceName,
    //   exam.Totalscore,
    //   exam.Total,
    //   exam.studentPhone,
    //   exam.Studentname,
    //   exam.SubcourceId,
    // ]);
    // doc.autoTable({
    //   head: [
    //     ["ID", "Student ID", "Course Name", "Total Score", "score earned","Student Phone", "Student Name", "Subcourse ID"],
    //   ],
    //   body: tableData,
    // });
    doc.save("exam_report.pdf");
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="shadow-md  bg-white p-4 mt-4 mx-4">
      <h1>Exam Report</h1>
      {/* <div>
        <label>Month: </label>
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div>
        <label>Year: </label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div> */}
      <button className="bg-blue-600 text-white p-2 m-4 rounded-md" onClick={handleReport}>Generate Report</button>
      <button className="bg-blue-600 text-white p-2 m-4 rounded-md" onClick={handleDownloadPDF}>Download as PDF</button>
      <table className="w-full overflow-x-Auto">
        <thead>
          <tr>
            <th className="border m-2 p-2 text-blue-600">ID</th>
            <th className="border m-2 p-2 text-blue-600">Student ID</th>
            {/* <th className="border m-2 p-2 text-blue-600">Total</th> */}
            <th className="border m-2 p-2 text-blue-600">Course Name</th>
            <th className="border m-2 p-2 text-blue-600">Total Score</th>
            <th className="border m-2 p-2 text-blue-600">Score Earned</th>
            <th className="border m-2 p-2 text-blue-600">Student Phone</th>
            <th className="border m-2 p-2 text-blue-600">Student Name</th>
            <th className="border m-2 p-2 text-blue-600">Subcourse ID</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td className="border ">{exam.id}</td>
              <td className="border ">{exam.studentId}</td>
              
              <td className="border ">{exam.CourceName}</td>
              <td className="border ">{exam.Totalscore}</td>
              <td className="border ">{exam.Total}</td>
              <td className="border ">{exam.studentPhone}</td>
              <td className="border ">{exam.Studentname}</td>
              <td className="border ">{exam.SubcourceId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamReport;