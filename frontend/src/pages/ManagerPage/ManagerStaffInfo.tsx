import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StaffInfoData } from '../../model/StaffInfoData';
import Swal, { SweetAlertIcon } from 'sweetalert2';

const ManagerStaffInfo: React.FC = () => {
  const { staff_email } = useParams();
  const [staffData, setStaffData] = useState<StaffInfoData | null>(null);
  const [salary, setSalary] = useState<number>(0);
  const [address, setAddress] = useState<string>('');

  const responseSwal = (title: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  }

  const fetchStaffInfo = async (email: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/staffs/info/${email}`);
      const data = response.data[0];
      setStaffData(data);
      setSalary(data.staff_salary);
      setAddress(data.address);
    } catch (error) {
      console.error('Error fetching staff info:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/staffs/${staff_email}`, {
        staff_salary: salary,
        address,
      });
      if (response.status === 200) {
        responseSwal('Staff info updated', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating staff info:', error);
    }
  };

  useEffect(() => {
    fetchStaffInfo(staff_email ?? '');
  }, [staff_email]);

  return (
    <div>
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">
        {staffData?.first_name} {staffData?.last_name} | {staffData?.email}
      </h1>
      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Email:</label>
      <p>{staffData?.email}</p>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Position:</label>
      <p>{staffData?.position}</p>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Staff Salary:</label>
      <p>{staffData?.staff_salary}</p>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">National Card ID:</label>
      <p>{staffData?.national_card_id}</p>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
      <p>{staffData?.phone_number}</p>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Birth Date:</label>
      <p>{staffData?.birth_date}</p>
    </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Salary:</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(parseInt(e.target.value))}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update
      </button>
    </div>
    </div>
  );
};

export default ManagerStaffInfo;