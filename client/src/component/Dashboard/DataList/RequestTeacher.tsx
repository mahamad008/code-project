import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../../interfaces";

const RequestTeacher = () => {
  const [requests, setRequests] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${Url}/request`);
      setRequests(response.data);
    };

    fetchData();
  }, []);

  const deleteRequest =async(id:any) => {
    const response=await axios.delete(`${Url}/techerRequest/delete/${id}`)
     console.log(response)
  };
  const acceptRequest =async(id:any) => {
    const response=await axios.delete(`${Url}/techerRequest/delete/${id}`)
     console.log(response)
  };


  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Id</th>
            <th className="py-2 px-4">Teacher phone</th>
            <th className="py-2 px-4">Message</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request:any) => (
            <tr key={request.Id} className="border-b">
              <td className="py-2 px-4">{request.Id}</td>
              <td className="py-2 px-4">{request.phone}</td>
              <td className="py-2 px-4">{request.message}</td>
              <td className="py-2 px-4">
          
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => deleteRequest(request.Id)}
                >
                  Reject
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => acceptRequest(request.Id)}
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTeacher;