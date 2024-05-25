import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface AccountType {
  account_type_id: number;
  description: string;
  account_type_name: string;
  interest_rate: number;
  value_of_package: number;
}

export interface LoanType {
  loan_type_id: number;
  loan_type_name: string;
  interest_rate: number;
  interest_period: number;
  value_of_package: number;
}

const ManagerInterest: React.FC = () => {
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);

  useEffect(() => {
    fetchAccountTypes();
    fetchLoanTypes();
  }, []);

  const fetchAccountTypes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/manager/account_types`);
      setAccountTypes(response.data);
    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };

  const fetchLoanTypes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/manager/loan_types`);
      setLoanTypes(response.data);
    } catch (error) {
      console.error('Error fetching loan types:', error);
    }
  };

  const handleAccountTypeUpdate = async (id: number, interest_rate: number) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/account_types/${id}`, { interest_rate });
      setAccountTypes(accountTypes.map(at => (at.account_type_id === id ? response.data : at)));
    } catch (error) {
      console.error('Error updating account type interest rate:', error);
    }
  };

  const handleLoanTypeUpdate = async (id: number, interest_rate: number) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/loan_types/${id}`, { interest_rate });
      setLoanTypes(loanTypes.map(lt => (lt.loan_type_id === id ? response.data : lt)));
    } catch (error) {
      console.error('Error updating loan type interest rate:', error);
    }
  };

  return (
    <div className="flex p-8 bg-gray-100 rounded-lg shadow-md">
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Account Types</h2>
        <div>
          {accountTypes.map(accountType => (
            <div key={accountType.account_type_id} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{accountType.account_type_name}</h3>
              <p>{accountType.description}</p>
              <p>Interest Rate: {accountType.interest_rate}%</p>
              <input
                type="number"
                value={accountType.interest_rate}
                onChange={(e) => handleAccountTypeUpdate(accountType.account_type_id, parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Loan Types</h2>
        <div>
          {loanTypes.map(loanType => (
            <div key={loanType.loan_type_id} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{loanType.loan_type_name}</h3>
              <p>Interest Rate: {loanType.interest_rate}%</p>
              <input
                type="number"
                value={loanType.interest_rate}
                onChange={(e) => handleLoanTypeUpdate(loanType.loan_type_id, parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerInterest;