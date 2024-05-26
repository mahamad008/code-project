import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../../../interfaces';

const StudentCount = () => {
  const [StudentCount, setStudentCount] = useState<number>(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get(`${Url}/student/get/all`);
        const count = response.data.result.length; // Assuming the response contains a "result" array with users
        setStudentCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchStudentCount();
  }, []);

  return <div>{StudentCount}</div>;
};

export default StudentCount;