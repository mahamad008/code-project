import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../../../interfaces';

const TeacerCount = () => {
  const [TeacerCount, setTeacerCount] = useState<number>(0);

  useEffect(() => {
    const fetchTeacerCount = async () => {
      try {
        const response = await axios.get(`${Url}/Teacher/get/all`);
        const count = response.data.result.length; // Assuming the response contains a "result" array with users
        setTeacerCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchTeacerCount();
  }, []);

  return <div>{TeacerCount}</div>;
};

export default TeacerCount;