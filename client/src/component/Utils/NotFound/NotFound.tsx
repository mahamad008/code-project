import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-4xl text-gray-800 text-center mb-6'>Oops!</h1>
        <p className='text-xl text-gray-600 text-center'>
          It looks like you're lost.
        </p>

        <div className='flex justify-center mt-6'>
          <Link to={'/'}>
            <button className='bg-blue-700 hover:bg-blue-800 text-white text-lg font-medium py-2 px-6 rounded-md'>
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;