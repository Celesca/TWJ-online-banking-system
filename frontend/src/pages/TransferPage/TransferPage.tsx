import { useEffect, useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import React from "react";
import axios from "axios";
import { WalletData } from "../../model/Wallet";
import "./TransferPage.css";

const TransferPage = () => {
  const [walletData, setWalletData] = useState<WalletData[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [targetWallet, setTargetWallet] = useState<string>("");

  const responseSwal = (title: string, text: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const queryWallet = async (email: string) => {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URI + "/api/accounts/" + email
    );
    if (response.data.length > 0) {
        setWalletData(response.data);
    } else {
      responseSwal("No wallet found", "", "error");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWallet(parseInt(event.target.value));
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(import.meta.env.VITE_SERVER_URI + "/api/transactions/deposit", {
      amount: amount,
      customer_username: walletData[selectedWallet].customer_email,
      account_id: walletData[selectedWallet].account_id
    });
    if (response.status === 201) {
      responseSwal("Deposit successfully", "", "success").then(() => {
        window.location.href = "/home";
      });
    } else {
      responseSwal("Deposit failed", "", "error");
    }

  };

  return (
    <div className="homepage_container">
      <div className="flex w-100vw h-24 p-16 text-dark text-3xl">
        Transfer
      </div>
      <img src="money.png" alt="money" className="w-24 mx-auto mb-4 " />
      <form
        className="max-w-sm mx-auto bg-slate-900 rounded-lg mt-4 p-12"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-5">
          <form className="max-w-sm mx-auto">
            <label
              htmlFor="wallets"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              เลือกบัญชีที่จะฝาก
            </label>
            <select
              onChange={handleChange}
              id="wallets"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {walletData.map((wallet, index) => {
                return (
                  <option key={index} value={index}>
                    {wallet.first_name} - {wallet.account_type_name}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
        <div className="mb-5">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount
          </label>
          <input
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            min={1}
            id="amount"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default TransferPage;
