import React, { useState } from 'react';
import { InsightLoan } from '../model/InsightLoan';
import axios from 'axios';

interface LoanCardProps {
  loan: InsightLoan;
  onUpdate: (updatedLoan: InsightLoan) => void;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onUpdate }) => {
  const [interestRateChange, setInterestRateChange] = useState(loan.interest_rate_change);
  const [status, setStatus] = useState(loan.npl.toString()); // Assuming 'status' refers to 'npl'

  const handleUpdate = async () => {
    const updatedLoan = { ...loan, interest_rate_change: interestRateChange, npl: parseFloat(status) };
    // Update the state in the parent component
    onUpdate(updatedLoan);
    // Send the update to the API
    await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/loans/${loan.loan_id}`, updatedLoan);
  };

  return (
    <div className="bg-gray-200 p-4 mb-4 rounded shadow-lg">
      <h2 className="font-bold mb-2">Loan ID: {loan.loan_id}</h2>
      <div className="mb-2">
        <span className="font-semibold">Type:</span> {loan.loan_type_name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Interest:</span> {loan.interest_rate}
      </div>
      <div className="mb-2">
        <label className="font-semibold">Change:</label>
        <input
          className="ml-2 p-1 border rounded"
          type="number"
          value={interestRateChange}
          onChange={(e) => setInterestRateChange(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-2">
        <label className="font-semibold">Status (NPL):</label>
        <input
          className="ml-2 p-1 border rounded"
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <span className="font-semibold">Current Loan:</span> {loan.current_loan}
      </div>
      <button 
        onClick={handleUpdate} 
        className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded absolute bottom-4 right-4"
      >
        Fix
      </button>
    </div>
  );
};

export default LoanCard;