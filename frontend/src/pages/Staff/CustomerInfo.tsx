import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { WalletData } from "../../model/Wallet";
import { CustomerData } from "../../model/CustomerData";
import { InsightAccount } from "../../model/InsightAccount";
import { InsightLoan } from "../../model/InsightLoan";


const CustomerInfo = () => {
    const { customer_email } = useParams();

    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [accountData, setAccountData] = useState<InsightAccount[]>([]);
    const [customerData, setCustomerData] = useState<CustomerData>();
    const [loanData, setLoanData] = useState<InsightLoan>();

    async function getCustomerInfo(theCustomerEmail: string) {
        const response = await axios.get(import.meta.env.VITE_SERVER_URI + "/api/staffs/customers/insight/" + theCustomerEmail);
        setAccountData(response.data.accounts);
        setTotalBalance(response.data.total_balance);
        setLoanData(response.data.loans[0]);

        const customer = await axios.get(import.meta.env.VITE_SERVER_URI + "/api/customers/" + theCustomerEmail);
        setCustomerData(customer.data.users[0]);
    }

    useEffect(() => {
        getCustomerInfo(customer_email ?? "")
    
    }, [])

  return (
    <div className="homepage_container">
      <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16">
          {customerData?.first_name} {customerData?.last_name} | {customerData?.email}
        </h1>
      </div>
      <div className="flex flex-1 justify-evenly mx-12 my-8">
        <div className="account-container w-2/5">
          <div className="account-total-container bg-[#5742ac]">
          <h1 className="text-white text-3xl py-6 px-16 text-center">Total Balance</h1>
          </div>
        </div>
        <div className="loan-container w-2/5">
          <div className="bg-[#5CCFC6]">
            <h1 className="text-white text-center text-3xl py-6 px-16">Loan</h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CustomerInfo