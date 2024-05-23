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
    <div className="loan-card">
      <h2>Loan ID: {loan.loan_id}</h2>
      <div>
        <label>Interest Rate Change:</label>
        <input
          type="number"
          value={interestRateChange}
          onChange={(e) => setInterestRateChange(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Status (NPL):</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
};

export default LoanCard;