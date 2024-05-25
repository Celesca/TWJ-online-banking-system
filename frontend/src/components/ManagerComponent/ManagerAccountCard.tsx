import React, { useState } from 'react';

export interface InsightAccount {
  account_id: number;
  account_type_name: string;
  balance: number;
  status: string;
  interest_rate: number;
  interest_rate_change: number;
}

import axios from 'axios';
import { SweetAlertIcon } from 'sweetalert2';

interface AccountCardProps {
  account: InsightAccount;
  onUpdate: (updatedAccount: InsightAccount) => void;
}

const ManagerAccountCard: React.FC<AccountCardProps> = ({ account, onUpdate }) => {
  const [interestRateChange, setInterestRateChange] = useState(account.interest_rate_change);
  const [status, setStatus] = useState(account.status);

  const responseSwal = async (
    title: string,
    text: string,
    icon: SweetAlertIcon
  ) => {
    const swal = await import("sweetalert2");
    return swal.default.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#00ab55",
      timer: 1500,
    });
  };

  const handleDelete = async () => {
    // Send a DELETE request to the backend API
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/accounts/${account.account_id}`);
      if (response.status === 200) {
        // Display a success message if the deletion was successful
        responseSwal('Success', 'Account deleted successfully', 'success');

        setTimeout(() => {
          window.location.reload();
        }, 1500);
        // onUpdate(deletedAccount);
      } else {
        // Display an error message if the deletion failed
        responseSwal('Error', 'Failed to delete account', 'error');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      // Display an error message if the deletion failed
      responseSwal('Error', 'Failed to delete account', 'error');
    }
  };

  const handleUpdate = async () => {
    if (status !== 'active' && status !== 'closed') {
        responseSwal('Invalid status', 'Status must be either "active" or "closed"', 'error');
        return;
        }

    const updatedAccount = { ...account, interest_rate_change: interestRateChange, status };

    // Update the state in the parent component
    onUpdate(updatedAccount);
    // Send the update to the API
    console.log(updatedAccount)
    const response = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/accounts/${account.account_id}`, updatedAccount);
    if (response.status === 200) {
        responseSwal('Success', 'Account updated successfully', 'success');
    } else {
        responseSwal('Error', 'Failed to update account', 'error');
    }

};

  return (
    <div className="bg-[#7b68ca] p-4 mb-4 rounded shadow-lg">
      <h2 className="font-bold mb-2">Account ID: {account.account_id}</h2>
      <div className="mb-2">
        <span className="font-semibold">Type :</span> {account.account_type_name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Interest (%) :</span> {account.interest_rate}
      </div>
      <div className="mb-2">
        <label className="font-semibold">Change (%) :</label>
        <input
          className="ml-2 p-1 border rounded"
          type="number"
          value={interestRateChange}
          onChange={(e) => setInterestRateChange(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-2">
        <label className="font-semibold">Status (active/closed) :</label>
        <input
          className="ml-2 p-1 border rounded"
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <span className="font-semibold">Balance : ฿</span> {account.balance}
      </div>
      <div className="flex justify-end pr-8">
      <button 
        onClick={handleUpdate} 
        className="text-white mr-4 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Update
      </button>
        <button 
          onClick={handleDelete} 
          className="text-white bg-red-500 hover:bg-red-700 px-4 py-1 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManagerAccountCard;