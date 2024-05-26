import  { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Top = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {showButton && (
        <button
          onClick={scrollUp}
          className="fixed bottom-8 right-8 flex items-center justify-center w-12 h-12 text-white bg-green-500 rounded-full shadow-lg focus:outline-none"
        >
          <KeyboardArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default Top;