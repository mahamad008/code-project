import  { useEffect, useState } from "react";
import axios from "axios";
import './Payment.css'
import { Delete, Recycling } from "@mui/icons-material";
import dayjs from "dayjs";
import { Dialog } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Url } from "../../../../interfaces";

interface Data {
  id: number;
  amount: number;
  status: string;
  token: string;
  enrolmentId: number;
  createdAt: any;
  isDeleted: boolean;
}

const PaymentList = () => {
  const [data, setData] = useState<Data[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemId, setItemId] = useState<number >(Number);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleOpenDialog = (deleteItemId: number) => {
    setItemId(deleteItemId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async (id: number) => {
    await axios.put(`${Url}/payment/trash/${id}`);
    fetchData();
    setItemId(0);
    setOpenDialog(false);
    navigate('/dashboard/payment/recycle');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<Data[]>(`${Url}/payment/get/all`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    dayjs(item.createdAt).format("DD/MM/YYYY").includes(searchQuery)
  );

  return (
    <div  className="paymentlist overflow-x-auto shadow border m-2 rounded-md p-4 mt-4">
   <div className="flex items-center md:justify-between my-2">
   <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by date..."
        />
        
   </div>

      <div>


        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Enrolment ID</th>
              <th className="py-2 px-4 border">Pay Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              !item.isDeleted && (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{item.id}</td>
                  <td className="py-2 px-4 border">${item.amount}</td>
                  <td className="py-2 px-4 border">{item.status}</td>
                  <td className="py-2 px-4 border">{item.enrolmentId}</td>
                  <td className="py-2 px-4 border">{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
                  <td className="py-2 px-4 border">
                    <button onClick={() => handleOpenDialog(item.id)}>
                      <Delete />
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h3>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
              onClick={handleCloseDialog}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-mdhover:bg-red-600"
              onClick={() => handleDelete(itemId)}
            >
              Confirm
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PaymentList;