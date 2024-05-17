import { useEffect, useState } from "react";
import { WalletData } from "../../model/Wallet";
import Swal, { SweetAlertIcon } from "sweetalert2";
import axios from "axios";

interface TransactionData {
    transaction_id: number;
    transaction_type: string;
    amount: number;
    transaction_date: string;
    account_id: number;
    account_type_name: string;
    customer_username: string;
}

const TransactionPage = () => {
    const [walletData, setWalletData] = useState<WalletData[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<number>(0);
    const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  
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
        if (response.data.length > 0) {
            setTransactionData(response.data);
        } else {
            responseSwal("No transaction found", "", "error");
        }
    }
  
    const queryWallet = async (username: string) => {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URI + "/api/accounts/" + username
      );
      if (response.data.length > 0) {
          setWalletData(response.data);
      } else {
        responseSwal("No wallet found", "", "error");
      }
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedWallet(parseInt(event.target.value));
      queryTransaction(walletData[selectedWallet].account_id.toString());
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
      <div className="bg-gradient-to-r from-indigo-500 homepage_container">
        <div className="flex">
            <div className="flex w-100vw h-24 p-4  text-white text-2xl">
            Transaction ธุรกรรมการเงิน
            </div>
            <div className="mb-5 flex justify-center items-center">
              <select
                onChange={handleChange}
                id="wallets"
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {walletData.map((wallet, index) => {
                  return (
                    <option key={index} value={index}>
                      {wallet.customer_username} - {wallet.account_type_name}
                    </option>
                  );
                })}
              </select>
            </div>
    
        </div>
        {/* Display the Transactions */}
        <div className="flex flex-col">
            {transactionData.map((transaction, index) => {
                return (
                <div key={index} className="flex flex-row justify-between p-2">
                    <div>{transaction.transaction_type}</div>
                    <div>{transaction.amount}</div>
                    <div>{transaction.transaction_date}</div>
                </div>
                );
            })}
        </div>
      </div>
    );
}

export default TransactionPage