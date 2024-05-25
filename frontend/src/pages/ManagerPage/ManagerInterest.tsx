import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AccountType } from '../../model/AccountType';
import { LoanType } from '../../model/LoanType';
import Swal, { SweetAlertIcon } from 'sweetalert2';

const ManagerInterestInfo: React.FC = () => {
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
  const [updatedAccountRates, setUpdatedAccountRates] = useState<{ [key: number]: number }>({});
  const [updatedLoanRates, setUpdatedLoanRates] = useState<{ [key: number]: number }>({});

  const responseSwal = (title: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  };

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

  const handleAccountTypeChange = (id: number, interest_rate: number) => {
    setUpdatedAccountRates((prevRates) => ({
      ...prevRates,
      [id]: interest_rate,
    }));
  };

  const handleLoanTypeChange = (id: number, interest_rate: number) => {
    setUpdatedLoanRates((prevRates) => ({
      ...prevRates,
      [id]: interest_rate,
    }));
  };

  const handleAccountTypeUpdate = async (id: number) => {
    try {
      const interest_rate = updatedAccountRates[id];
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/manager/account_types/${id}`, { interest_rate });
      setAccountTypes(accountTypes.map(at => (at.account_type_id === id ? response.data : at)));
      responseSwal('Account interest rate updated', 'success');
    } catch (error) {
      console.error('Error updating account type interest rate:', error);
    }
  };

  const handleLoanTypeUpdate = async (id: number) => {
    try {
      const interest_rate = updatedLoanRates[id];
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URI}/api/manager/loan_types/${id}`, { interest_rate });
      setLoanTypes(loanTypes.map(lt => (lt.loan_type_id === id ? response.data : lt)));
      responseSwal('Loan interest rate updated', 'success');
    } catch (error) {
      console.error('Error updating loan type interest rate:', error);
    }
  };

  return (
    <div className="flex p-8 bg-gray-100 rounded-lg homepage_container shadow-md">
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
                value={updatedAccountRates[accountType.account_type_id] ?? accountType.interest_rate}
                onChange={(e) => handleAccountTypeChange(accountType.account_type_id, parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={() => handleAccountTypeUpdate(accountType.account_type_id)}
                className="inline-flex items-center px-4 py-2 mt-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
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
                value={updatedLoanRates[loanType.loan_type_id] ?? loanType.interest_rate}
                onChange={(e) => handleLoanTypeChange(loanType.loan_type_id, parseFloat(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={() => handleLoanTypeUpdate(loanType.loan_type_id)}
                className="inline-flex items-center px-4 py-2 mt-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerInterestInfo;