import axios from 'axios';
import { useEffect, useState, ChangeEvent } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Url } from './interfaces';

const colors = {
  orange: '#FFB500',
  gray: '#A9A9A9',
};

interface UserInfo {
  id: number;
  givenName: string;
}

interface ReviewData {
  Comment: string;
  Name: string;
  review: number;
  corId: number | null;
  UserId: number | null;
}

const Review = () => {
  const [hoverValue, setHoverValue] = useState<number>(Number);
  const [currentValue, setCurrentValue] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [corId, setcorId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const stars = Array(5).fill(0);
  const userInfoString = localStorage.getItem('userInfo');
  const { id } = useParams();

  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseEnter = (index: number) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    const data: ReviewData = {
      Comment: comment,
      Name: name,
      review: currentValue,
      corId: corId,
      UserId: userId,
    };

    try {
      const response = await axios.post(`${Url}/review/new`, data);
      console.log(response)
      setCurrentValue(0)
      setName('')
      setcorId(0)
      setComment('')

    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        try {
          const response = await axios.get(`${Url}/user/get/one/${userInfo.id}`);
          setUserId(response.data.id);
          setName(response.data.givenName);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchCourses();
  }, [userInfoString]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${Url}/cource/get/one/${id}`);
        setcorId(response.data.idcource);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, [id]);
//lotify
  const renderLegend = () => {
    let legendText = '';
    switch (hoverValue || currentValue) {
      case 1:
        legendText = 'Bad';
        break;
      case 2:
        legendText = 'Average';
        break;
      case 3:
        legendText = 'Good';
        break;
      case 4:
        legendText = 'Excellent';
        break;
      case 5:
        legendText = 'Outstanding';
        break;
      default:
        legendText = '';
        break;
    }
    return <div className="text-gray-500 mt-2">{legendText}</div>;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center space-x-2">
        {stars.map((_, index) => (
          <FaStar
            color={index<hoverValue || index< currentValue ? colors.orange : colors.gray}
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      {renderLegend()}
      <textarea
        className="mt-4 p-2 border border-gray-300 rounded"
        placeholder="Leave your feedback"
        value={comment}
        onChange={handleTextareaChange}
      />
      <input style={{ fontSize: '0px' }} type="text" readOnly value={name} />
      <button
        className="mt-4 w-[190px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Review;
