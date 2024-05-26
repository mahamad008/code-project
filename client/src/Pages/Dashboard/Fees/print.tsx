import React, { useEffect, useRef, useState } from "react";

import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { Url } from "../../../interfaces";

interface FeeData {
  studentName: string;
  studentPhone: string;
  amountPaid: number;
  PaidAt: string;
  Balance: number;
  method: string;
}

const PrintComponent: React.FC = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id: string }>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [feeData, setFeeData] = useState<FeeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FeeData>(
          `${Url}/fee/get/one/${id}`
        );
        setFeeData(response.data);
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="">
      {/* button to trigger printing */}

      <button className="bg-gray-100" onClick={handlePrint}>Print</button>

      {/* Component to be printed */}
      {feeData && <ComponentToPrint ref={componentRef} feeData={feeData} />}
    </div>
  );
};

interface ComponentToPrintProps {
  feeData: FeeData;
}

const ComponentToPrint = React.forwardRef<HTMLDivElement, ComponentToPrintProps>(
  ({ feeData }, ref) => {
    const { studentName, studentPhone, amountPaid, PaidAt, Balance, method } =
      feeData;

    return (
      <div
        ref={ref}
        className="p-4 bg-white shadow-md rounded-md w-[550px] text-center"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <h2 className="text-green-500 text-2xl mb-4">bristol College</h2>
        <p className="text-gray-300">Welcome bristol college Hargeisa Somaliland +252634098646</p>
        <table className="w-full mt-2">
          <thead>
            <tr>
       
              <th className="py-2">
                <p className="text-gray-600">Name</p>
              </th>
              <th className="py-2">
                <p className="text-gray-600">Phone</p>
              </th>
              <th className="py-2">
                <p className="text-gray-600">Balance</p>
              </th>
              <th className="py-2">
                <p className="text-gray-600">Amount Paid</p>
              </th>
              <th className="py-2">
                <p className="text-gray-600">Paid Date</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{studentName}</td>
              <td>{studentPhone}</td>
              <td>
                <span className="flex items-center">
                  {method} {Balance}
                </span>
              </td>
              <td>
                <span className="flex items-center">
                  {method} {amountPaid}
                </span>
              </td>
              <td>{dayjs(PaidAt).format("DD/MM/YYYY")}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-500 text-sm mt-4">
          "Hadii mar lacaga la bixiyo lam soo celinkaro"
        </p>
      </div>
    );
  }
);

export default PrintComponent;