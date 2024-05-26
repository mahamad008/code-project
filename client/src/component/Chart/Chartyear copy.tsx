import  { useEffect, useState } from 'react';
import axios from 'axios';
import './Chartyear.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Url } from '../../interfaces';

const ChartYear = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await axios.get(`${Url}/user/get/year/${year}`);
        setChartData(response.data);
      } catch (error) {
        console.error('Failed to fetch chart data', error);
      }
    };

    fetchChartData();
  }, []);

  return (
<div className="chartyears shadow bg-gray-100  rounded ml-2">
<div className=" ">
      <ResponsiveContainer >
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
</div>
  );
};

export default ChartYear;