import React, { useState } from 'react';
import axios from 'axios';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export interface InsightLoan {
    loan_id: number;
    loan_type_name: string;
    npl: number;
    interest_rate: number;
    interest_rate_change: number;
    current_loan: number;
}

interface LoanCardProps {
  loan: InsightLoan;
  onUpdate: (updatedLoan: InsightLoan) => void;
}

const ManagerLoanCard: React.FC<LoanCardProps> = ({ loan, onUpdate }) => {
  const [interestRateChange, setInterestRateChange] = useState(loan.interest_rate_change);
  const [status, setStatus] = useState(loan.npl.toString()); // Assuming 'status' refers to 'npl'

  const responseSwal = async (
    title: string,
    text: string,
    icon: SweetAlertIcon
  ) => {
    
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#00ab55",
      timer: 1500,
    });
  };

  const handleUpdate = async () => {
    if (status !== '0' && status !== '1') {
      responseSwal('Invalid status', 'Status must be either "0" or "1"', 'error');
      return;
    }

    const updatedLoan = { ...loan, interest_rate_change: interestRateChange, npl: parseFloat(status) };
    // Update the state in the parent component
    onUpdate(updatedLoan);
    // Send the update to the API
    const response = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/loans/${loan.loan_id}`, updatedLoan);
    if (response.status === 200) {
      responseSwal('Success', 'Loan updated successfully', 'success');
    } else {
      responseSwal('Error', 'Failed to update loan', 'error');
    }
};

  return (
    <div className="bg-gray-200 p-4 mb-4 rounded shadow-lg">
      <h2 className="font-bold mb-2">Loan ID : {loan.loan_id}</h2>
      <div className="mb-2">
        <span className="font-semibold">Type :</span> {loan.loan_type_name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Interest (%) :</span> {loan.interest_rate}
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
        <label className="font-semibold">NPL Status (0/1):</label>
        <input
          className="ml-2 p-1 border rounded"
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <span className="font-semibold">Current Loan :</span> ฿{loan.current_loan.toFixed(2)}
      </div>
      <div className="flex justify-end pr-8">
      <button 
        onClick={handleUpdate} 
        className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Fix
      </button>
      </div>
    </div>
  );
};

export default ManagerLoanCard;