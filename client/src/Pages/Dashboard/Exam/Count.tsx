import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../../../interfaces';

const ExamCount = () => {
  const [ExamCount, setExamCount] = useState<number>(0);

  useEffect(() => {
    const fetchExamCount = async () => {
      try {
        const response = await axios.get(`${Url}/exam/get/all`);
        const count = response.data.result.length; // Assuming the response contains a "result" array with users
        setExamCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchExamCount();
  }, []);

  return <div>{ExamCount}</div>;
};

export default ExamCount;