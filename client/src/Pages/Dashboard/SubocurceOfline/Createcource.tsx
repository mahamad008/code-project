import  React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { CreatesubcourceFn } from '../../../redux/Slices/Dashboard/SubcourceOfline/Createsubcourceofline'

const CreatesubcourceOfline = () => {
  const Dispatch=useDispatch<AppDispatch>()
const [Title,setTitle]=useState('')
const [Description,setdescription]=useState('')
const [OflinecourceId,setOflinecourceId]=useState('');
const [userId, setuserId] = useState('');
useEffect(()=>{
  const storedId = localStorage.getItem('n');
 setuserId(storedId!);
},[])
const handlesubmit=(e:React.FormEvent)=>{
  e.preventDefault()
const data ={
  Title,
  Description,
  OflinecourceId,
  userId
}
Dispatch(CreatesubcourceFn(data)).then(()=>{
  location.reload()
})
}

  return (
    <div>

      <div className="flex justify-center items-center bg-gray-100">
      <div className="w-[500px] max-w-md p-6 bg-white rounded shadow">
        <h1 className="mb-6 w-100 text-2xlfont-bold text-center"></h1>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={Title}
              placeholder="Enter course name"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="description"
              value={Description}
              placeholder="Enter course description"
              onChange={(e) => setdescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="teacherId"
              value={OflinecourceId}
              placeholder="Enter OflinecourceId"
              onChange={(e) => setOflinecourceId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
      
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default CreatesubcourceOfline