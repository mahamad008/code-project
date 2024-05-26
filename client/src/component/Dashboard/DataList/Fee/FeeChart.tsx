import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Url } from "../../../../interfaces";

const Feechart = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get(`${Url}/fee/get/all`);
        setFees(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFees();
  }, []);

  return (
    <div className="bg-white p-4 md:p-8 w-full md:w-[725px] rounded shadow-md">
      <h1 className="text-2xl font-bold my-4">Revenues and Expenses Chart</h1>
      <div className="w-full overflow-auto sm:w-auto">
        <LineChart
          width={570}
          height={300}
          data={fees}
          className="w-full sm:w-auto md:w-[670px] lg:w-[900px]"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="studentName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amountPaid"
            name="Amount Paid"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Balance"
            name="Balance"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Feechart;