import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CustomerData } from '../../model/CustomerData';
import { InsightAccount } from '../../model/InsightAccount';
import { InsightLoan } from '../../model/InsightLoan';
import AccountCard from '../../components/AccountCard';
import LoanCard from '../../components/LoanCard';

const CustomerInfo = () => {
  const { customer_email } = useParams();

  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accountData, setAccountData] = useState<InsightAccount[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>();
  const [loanData, setLoanData] = useState<InsightLoan[]>([]);

  async function getCustomerInfo(theCustomerEmail: string) {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URI}/api/staffs/customers/insight/${theCustomerEmail}`
    );
    setAccountData(response.data.accounts);
    setTotalBalance(response.data.total_balance);
    setLoanData(response.data.loans);

    const customer = await axios.get(
      `${import.meta.env.VITE_SERVER_URI}/api/customers/${theCustomerEmail}`
    );
    setCustomerData(customer.data.users[0]);
  }

  const handleAccountUpdate = (updatedAccount: InsightAccount) => {
    setAccountData((prevData) => 
      prevData.map((account) => 
        account.account_id === updatedAccount.account_id ? updatedAccount : account
      )
    );
  };

  const handleLoanUpdate = (updatedLoan: InsightLoan) => {
    setLoanData((prevData) => 
      prevData.map((loan) => 
        loan.loan_id === updatedLoan.loan_id ? updatedLoan : loan
      )
    );
  };

  useEffect(() => {
    getCustomerInfo(customer_email ?? '');
  }, [customer_email]);

  return (
    <div className="homepage_container">
      <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16">
          {customerData?.first_name} {customerData?.last_name} |{' '}
          {customerData?.email}
        </h1>
      </div>
      <div className="flex flex-1 justify-evenly mx-12 my-8">
        <div className="account-container w-2/5">
          <div className="account-total-container bg-[#5842ad]">
            <h1 className="text-white text-3xl py-6 px-16 text-center">
              Total Balance : ฿ {totalBalance.toFixed(2)}
            </h1>
          </div>
          <div className="bg-[#7b68ca]">
            {accountData.length > 0 ? (
            accountData.map((account) => (
              <AccountCard key={account.account_id} account={account} onUpdate={handleAccountUpdate} />
            ))
            ) : (
              <div className="bg-[#5CCFC6]">
                <h1 className="text-white text-center p-8 text-2xl">No account data</h1>
              </div>
            )}
          </div>
        </div>
        <div className="loan-container w-2/5">
          <div className="bg-[#38b1a7]">
            <h1 className="text-white text-center text-3xl py-6 px-16">Loan</h1>
            {loanData.length > 0 ? (
              loanData.map((loan) => (
                <LoanCard key={loan.loan_id} loan={loan} onUpdate={handleLoanUpdate} />
              ))
            ) : (
              <div className="bg-[#5CCFC6]">
                <h1 className="text-white text-center p-8 text-2xl">No loan data</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;