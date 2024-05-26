import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../../../interfaces';

const UserCount = () => {
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const token=JSON.parse(localStorage.getItem('userinfo')!).token
        const response = await axios.get(`${Url}/user/get/all`,{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
        const count = response.data.result.length; // Assuming the response contains a "result" array with users
        setUserCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return <div>{userCount}</div>;
};

export default UserCount;