import { useEffect, useState } from "react";
import { WalletData } from "../../model/Wallet";
import Swal, { SweetAlertIcon } from "sweetalert2";
import axios from "axios";
import TransactionCard from "../../components/TransactionCard";

interface TransactionData {
  transaction_id: number;
  amount: number;
  transaction_date: string;
  transaction_type_name: string;
  update_bank_balance: number;
  Payee: string;
  from_account_id: string;
  to_account_id: string;
}

const TransactionPage = () => {
    const [walletData, setWalletData] = useState<WalletData[]>([]);
    const [, setSelectedWallet] = useState<number>(0);
    const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
    const [transactionCount, setTransactionCount] = useState<number>(0);
  
    const responseSwal = (title: string, text: string, icon: SweetAlertIcon) => {
      return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        timer: 1500,
        showConfirmButton: false,
      });
    };

    const queryTransaction = async (account_id: string) => {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URI + "/api/transactions/" + account_id
      );
      const count_response = await axios.get(
        import.meta.env.VITE_SERVER_URI + "/api/transactions/count/" + account_id
      );

      if (response.data.length > 0) {
        setTransactionData(response.data);
        setTransactionCount(count_response.data[0].count);
      } else {
        setTransactionData([]);
        responseSwal("No transaction found", "", "error");
      }
    }
    
    const queryWallet = async (username: string) => {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URI + "/api/accounts/" + username
      );
      if (response.data.length > 0) {
        setWalletData(response.data);
        // Call queryTransaction with the account_id of the first wallet
        await queryTransaction(response.data[0].account_id.toString());
      } else {
        responseSwal("No wallet found", "", "error");
      }
    };
    
    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedWallet(parseInt(event.target.value));
      await queryTransaction(walletData[parseInt(event.target.value)]?.account_id.toString());
    }
    
    useEffect(() => {
      const role = localStorage.getItem("role");
      if (role !== "customer") {
        responseSwal("You are not authorized to access this page", "We are redirecting you to the homepage", "error").then(() => {
          window.location.href = "/";
        });
      }
    
      queryWallet(localStorage.getItem("username") || "");
    }, []);
  
    return (
      <div className="bg-gradient-to-r from-indigo-500 homepage_container pb-24">
        <div className="flex w-100vw items-center justify-center header-container">
        <h1 className="text-white text-3xl py-6 px-16">Transaction of account</h1>

            <div className=" flex justify-center">
              <select
                onChange={handleChange}
                id="wallets"
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {walletData.map((wallet, index) => {
                  return (
                    <option key={index} value={index}>
                      {wallet.account_id} - {wallet.account_type_name}
                    </option>
                  );
                })}
              </select>
            </div>
    
        </div>
        <div>
          <h1 className="text-dark text-center pt-8 text-2xl">Total number of transactions: {transactionCount}</h1>
        </div>
        {/* Display the Transactions */}
        <div className="flex flex-col">
            {transactionData.map((transaction, index) => {
               if (transaction) {
                return (
                <TransactionCard key={index} transaction={transaction} />
                );
              }
              else {
                return (
                  <div className="bg-[#7b68ca]">
                    <h1 className="text-white text-center p-8 text-2xl">No transaction data</h1>
                  </div>
                )
              }
            })}
        </div>
      </div>
    );
}

export default TransactionPage