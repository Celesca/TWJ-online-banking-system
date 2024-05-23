import React, { useState } from 'react';
import { InsightAccount } from '../model/InsightAccount';
import axios from 'axios';

interface AccountCardProps {
  account: InsightAccount;
  onUpdate: (updatedAccount: InsightAccount) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onUpdate }) => {
  const [interestRateChange, setInterestRateChange] = useState(account.interest_rate_change);
  const [status, setStatus] = useState(account.status);

  const handleUpdate = async () => {
    const updatedAccount = { ...account, interest_rate_change: interestRateChange, status };
    // Update the state in the parent component
    onUpdate(updatedAccount);
    // Send the update to the API
    await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/accounts/${account.account_id}`, updatedAccount);
  };

  return (
    <div className="account-card">
      <h2>Account ID: {account.account_id}</h2>
      <div>
        <label>Interest Rate Change:</label>
        <input
          type="number"
          value={interestRateChange}
          onChange={(e) => setInterestRateChange(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Status:</label>
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

export default AccountCard;