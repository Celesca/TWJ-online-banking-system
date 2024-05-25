import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SweetAlertIcon } from 'sweetalert2';
import { StaffData } from '../model/StaffData';

interface CustomerData {
  email: string;
  address: string;
  staff_email: string;
  birth_date: string;
  black_listed: boolean;
  customer_salary: number;
}

interface CustomerSensitiveInfoProps {
  customer: CustomerData;
  onUpdate: (updatedCustomer: CustomerData) => void;
}

const CustomerSensitiveInfo: React.FC<CustomerSensitiveInfoProps> = ({ customer, onUpdate }) => {
  const [address, setAddress] = useState(customer.address);
  const [staffEmail, setStaffEmail] = useState(customer.staff_email);
  const [customerSalary, setCustomerSalary] = useState(customer.customer_salary);
  const [blackListed, setBlackListed] = useState(customer.black_listed);
  const [staffOptions, setStaffOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchStaffEmails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/staffs`);
        setStaffOptions(response.data.staffs.map((staff: StaffData) => staff.email));
      } catch (error) {
        console.error("Error fetching staff emails:", error);
      }
    };

    fetchStaffEmails();
  }, []);

  useEffect(() => {
    setAddress(customer.address);
    setStaffEmail(customer.staff_email);
    setCustomerSalary(customer.customer_salary);
    setBlackListed(customer.black_listed);
  }, [customer]);

  const responseSwal = async (title: string, text: string, icon: SweetAlertIcon) => {
    const swal = await import("sweetalert2");
    return swal.default.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#00ab55",
      timer: 1500,
    });
  };

  const handleUpdate = async () => {
    const updatedCustomer = {
      ...customer,
      address,
      staff_email: staffEmail,
      customer_salary: customerSalary,
      black_listed: blackListed
    };

    // Update the state in the parent component
    onUpdate(updatedCustomer);

    // Send the update to the API
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/customers/${customer.email}`, updatedCustomer);
      if (response.status === 200) {
        responseSwal('Success', 'Customer updated successfully', 'success');
      } else {
        responseSwal('Error', 'Failed to update customer', 'error');
      }
    } catch (error) {
      responseSwal('Error', 'Failed to update customer', 'error');
    }
  };

  return (
    <div className="bg-[#7b68ca] p-4 mb-4 rounded shadow-lg">
      <h2 className="font-bold mb-2">Customer Email: {customer.email}</h2>
      <div className="mb-2">
        <label className="font-semibold">Address:</label>
        <input
          className="ml-2 p-1 border rounded w-full"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="font-semibold">Staff Email:</label>
        <select
          className="ml-2 p-1 border rounded w-full"
          value={staffEmail}
          onChange={(e) => setStaffEmail(e.target.value)}
        >
          <option value="">Select Staff</option>
          {staffOptions.map((email) => (
            <option key={email} value={email}>{email}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Birth Date:</span> {customer.birth_date}
      </div>
      <div className="mb-2">
        <label className="font-semibold">Customer Salary:</label>
        <input
          className="ml-2 p-1 border rounded w-full"
          type="number"
          value={customerSalary}
          onChange={(e) => setCustomerSalary(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-2">
        <label className="font-semibold">Blacklisted:</label>
        <input
          className="ml-2 p-1 border rounded"
          type="checkbox"
          checked={blackListed}
          onChange={(e) => setBlackListed(e.target.checked)}
        />
      </div>
      <div className="flex justify-end pr-8">
        <button
          onClick={handleUpdate}
          className="text-white bg-blue-500 hover:bg-blue-700 px-8 py-2 rounded-lg"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CustomerSensitiveInfo;