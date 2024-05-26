import React, { useState } from 'react';
import { InsightAccount } from '../model/InsightAccount';
import axios from 'axios';
import { SweetAlertIcon } from 'sweetalert2';

interface AccountCardProps {
  account: InsightAccount;
  onUpdate: (updatedAccount: InsightAccount) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onUpdate }) => {
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

  const handleUpdate = async () => {
    if (status !== 'active' && status !== 'closed') {
        responseSwal('Invalid status', 'Status must be either "active" or "closed"', 'error');
        return;
        }

        const updatedAccount = { 
          ...account, 
          interest_rate_change: interestRateChange, 
          status, 
          old_interest_rate: account.interest_rate_change, // Keep the old interest rate
          staff_email: localStorage.getItem('username')
        };
      

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
        className="text-white bg-blue-500 hover:bg-blue-700 px-8 py-2 rounded-lg"
      >
        Update
      </button>
      </div>
    </div>
  );
};

export default AccountCard;