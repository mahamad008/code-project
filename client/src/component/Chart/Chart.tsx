import  { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const API_BASE_URL = 'http://localhost:5000/api/user/api/charts/latest-registered';

function Latestusercharts() {
  const [latestRegisteredUsers, setLatestRegisteredUsers] = useState([]);

  useEffect(() => {
    const fetchLatestRegisteredUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}`);
        setLatestRegisteredUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch latest registered users', error);
      }
    };

    fetchLatestRegisteredUsers();
  }, []);

  return (
    <div className="ml-5 mt-5 mr-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]z rounded-lg p-5 bg-white">
      <h1 className="text-2xl mb-5">Latest Registered Users</h1>
      <BarChart width={1000} height={300} data={latestRegisteredUsers}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="username" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="id" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Latestusercharts;