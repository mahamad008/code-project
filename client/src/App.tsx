import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
// import Quiz from './Quiz/Quiz';

const App = () => {

  return (
 
    <div className="app-p">
 .
      <RouterProvider router={router} />
      {/* <Quiz/> */}

    </div>
  
  );
};

export default App;
