import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { LoanDetail } from "../../model/LoanDetail";
import { StaffData } from "../../model/StaffData";
import SelectWallet from "../../components/SelectWallet";
import { WalletData } from "../../model/Wallet";
import { CustomerData } from "../../model/CustomerData";

const LoanInfo = () => {
  const { loan_id, customer_email } = useParams();

  const [loanDetail, setLoanDetail] = useState<LoanDetail>();
  const [staffInfo, setStaffInfo] = useState<StaffData>();
  const [customerInfo, setCustomerInfo] = useState<CustomerData>();

  // Wallet
  const [walletData, setWalletData] = useState<WalletData[]>([]);
  const [hasWallet, setHasWallet] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<number>(0);

  const [loanAmount, setLoanAmount] = useState<number>(0);

  const responseSwal = (
    title: string,
    description: string,
    icon: SweetAlertIcon
  ) => {
    return Swal.fire({
      title: title,
      text: description,
      icon: icon,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleSubmitLoan = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const uri = import.meta.env.VITE_SERVER_URI + "/api/loans/apply";
  const username = localStorage.getItem("username");
  if (username) {
    try {
      const response = await axios.post(uri, {
        loan_type_id: loan_id,
        customer_email: customer_email,
        loan_amount: loanAmount,
        account_id: walletData[selectedWallet].account_id,
      });
      if (response.status === 200) {
        responseSwal("Loan request submitted", "", "success").then(() => {
          window.location.href = "/home";
        });
      }
    } catch (error: AxiosError) {
      if (error.response && error.response.status === 400) {
        responseSwal("Loan request failed", "You cannot request loan if you already have loan", "error");
      } else {
        responseSwal("Loan request failed", "Please try again later", "error");
      }
    }
  }
};

  const queryCustomerInfo = async (email: string) => {
    const customer = await axios.get(
      `${import.meta.env.VITE_SERVER_URI}/api/customers/${email}`
    );
    setCustomerInfo(customer.data.users[0]);
  }

  const queryLoanInfo = async (loan_id: string) => {
    const uri = import.meta.env.VITE_SERVER_URI + "/api/loans/info/" + loan_id;
    const response = await axios.get(uri);
    setLoanDetail(response.data.loanData[0]);
  };

  const queryStaffInfo = async (email: string) => {
    const uri = import.meta.env.VITE_SERVER_URI + "/api/staffs/" + email;
    const response = await axios.get(uri);
    setStaffInfo(response.data.staffData[0]);
  };

  const queryWallet = async (email: string) => {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URI + "/api/accounts/" + email
    );
    if (response.data.length > 0) {
      setWalletData(response.data);
      console.log(response.data);
      setSelectedWallet(0);
      setHasWallet(true);
    } else {
      responseSwal("No wallet found", "Create wallet first", "error");
      setHasWallet(false);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      queryWallet(username);
      queryCustomerInfo(username);
    }
    queryLoanInfo(loan_id || "");
    queryStaffInfo(customer_email || "");
  }, []);

  return (
    <div className="homepage_container">
      <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16">Loan Application</h1>
      </div>
      <div className="flex flex-1 gap-2">
        <div className="w-2/5">
          <div className="max-w-sm p-6 ml-16 mt-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg" src="/digital_banking.svg" alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {loanDetail?.loan_type_name}
                </h5>
              </a>
              <p className="mb-3 mt-3 font-normal text-white">
                Interest Rate: {loanDetail?.interest_rate}%
              </p>
              <p className="mb-3 font-normal text-white">
                Interest Period: {loanDetail?.interest_period} months
              </p>
              <p className="font-light text-sm text-gray-700 dark:text-gray-400">
                Note: Requesting an amount not more than 2 times your salary.
                Note: Interest rates are between 24% per year, calculated every
                month.
              </p>
            </div>
          </div>
        </div>
        <div className="w-4/5">

          <div className="flex flex-1 justify-evenly">
            <div className="p-2 mt-8 w-2/5 h-1/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    Staff Information
                  </h5>
                </a>
                <p className="mb-3 mt-3 font-normal text-sm text-white">
                  Name: {staffInfo?.first_name} {staffInfo?.last_name}
                </p>
                <p className="mb-3 font-normal text-sm text-white">
                  Email: {staffInfo?.email}
                </p>
                <p className="mb-3 font-normal text-sm text-white">
                  Phone Number: {staffInfo?.phone_number}
                </p>
              </div>
            </div>
              <div className="p-2 mt-8 w-2/5 h-1/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      Applicant Information
                    </h5>
                  </a>
                  <p className="mb-3 mt-3 font-normal text-sm text-white">
                    Name: {customerInfo?.first_name} {customerInfo?.last_name}
                  </p>
                  <p className="mb-3 font-normal text-sm text-white">
                    Address: {customerInfo?.address}
                  </p>
                  <p className="mb-3 font-normal text-sm text-white">
                    Salary : {customerInfo?.customer_salary || '-'}
                  </p>
                </div>
              </div>
          </div>

          <div className="pt-8">
          {hasWallet && (
            <>
            <div className="mx-16 rounded-lg bg-gray-800 flex justify-evenly items-center">
              <div className="p-8">
                <SelectWallet
                  setSelectedWallet={setSelectedWallet}
                  walletData={walletData}
                />
                <div className="flex flex-col justify-center">
                  <div className="text-2xl pt-4 font-semibold text-center text-white">
                    ฿ {walletData[selectedWallet].balance.toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
              <form onSubmit={handleSubmitLoan}>
              <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount you want to loan
          </label>
          
          <input
            name="amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
            min={1}
            id="amount"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
              </div>
            </div>
            
            </>
            )}
            {!hasWallet && (
              <div className="text-center">
                <h2 className="text-lg font-semibold">No wallet found</h2>
                <p className="text-gray-500 pt-2">
                  Please create a wallet to start using our services.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoanInfo;
