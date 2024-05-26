import React, {  useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { getAllCategoryFn } from '../../../../redux/Slices/Dashboard/Category/GetAllCategories';



const Dropdown: React.FC = () => {
  const dispatch=useDispatch<AppDispatch>()

  useEffect(() => {
   dispatch(getAllCategoryFn())
  }, []);

  
  return (
    <select>
        Categories
      {/* {getallctegory.data.map((category) => (
        <option key={category.catId} defaultValue={'Categoris'}>
          {category.catName}
        </option>
      ))} */}
    </select>
  );
};

export default Dropdown;