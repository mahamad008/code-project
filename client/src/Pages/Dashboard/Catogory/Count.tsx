import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../../../interfaces';

const CategoryCount = () => {
  const [CategoryCount, setCategoryCount] = useState<number>(0);

  useEffect(() => {
    const fetchCategoryCount = async () => {
      try {
        const response = await axios.get(`${Url}/category/all`);
        const count = response.data.result.length; // Assuming the response contains a "result" array with users
        setCategoryCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchCategoryCount();
  }, []);

  return <div>{CategoryCount}</div>;
};

export default CategoryCount;