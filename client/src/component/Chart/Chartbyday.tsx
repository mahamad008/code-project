import  { useEffect, useState } from 'react';
import axios from 'axios';
import {  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Piechart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await axios.get(`http://localhost:5000/api/user/get/year/${year}`);
        setChartData(response.data);
      } catch (error) {
        console.error('Failed to fetch chart data', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="flex w-full  items-center justify-center h-screen ">
      <div className="w-full lg:max-w-3xl bg-white p-8  rounded-md">
        <h1 className="text-3xl font-bold mr-[20px] mb-6">User Registrations by Month</h1>
        <div className="w-full mt-8">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="users" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {chartData.map(( index) => (
                  <Cell key={`cell-${index}`} fill={`#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Piechart;