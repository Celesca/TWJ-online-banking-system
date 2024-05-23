import { useEffect, useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import React from "react";
import axios from "axios";
import { WalletData } from "../../model/Wallet";
import "./TransferPage.css";
import ConfirmTransfer from "../../components/ConfirmTransfer";

const TransferPage = () => {
  const [walletData, setWalletData] = useState<WalletData[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [targetWallet, setTargetWallet] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<number>(3);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;
    if (optionValue === "inside") {
      setSelectedOption(3);
    } else if (optionValue === "outside" || optionValue === "promptpay") {
      setSelectedOption(2);
    }
  };

  useEffect(() => {
    console.log("Hello World");
    const role = localStorage.getItem("role");
    if (role !== "customer") {
      responseSwal("You are not authorized to access this page", "We are redirecting you to the homepage", "error").then(() => {
        window.location.href = "/";
      });
    }
    queryWallet(localStorage.getItem("username") || "");
  }, []);

  // Transfer amount to another account
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (walletData[selectedWallet]?.balance < amount) {
      responseSwal("This account don't have enough money", "", "error");
      return;
    }

    if (selectedOption === 0) {
      responseSwal("Please select destination", "", "error");
      return;
    }

    if (targetWallet === walletData[selectedWallet]?.account_id) {
      responseSwal("You can't transfer to the same account", "", "error");
      return;
    }

    setIsModalVisible(true)
  };

  return (
    <div className="homepage_container">
      <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16">Transfer</h1>
      </div>
      
      <div className="px-16 w-3/4">
          <h3 className="my-4 text-xl font-medium text-gray-900">Choose your destination</h3>
    <ul className="grid gap-6 grid-cols-3">
        <li>
            <input type="radio" id="inside" name="destination" value="inside" className="hidden peer" 
            onChange={handleOptionChange} required defaultChecked/>
            <label htmlFor="inside" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                <div className="block">
                    <div className="w-full text-lg font-semibold">to TWJ Bank</div>
                    <div className="w-full">โอนเงินภายในธนาคาร</div>
                </div>
                <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </label>
        </li>
        <li>
            <input type="radio" id="outside" name="destination" value="outside" className="hidden peer" onChange={handleOptionChange}/>
            <label htmlFor="outside" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="block">
                    <div className="w-full text-lg font-semibold">Outside TWJ Bank</div>
                    <div className="w-full">โอนเงินธนาคารอื่น</div>
                </div>
                <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </label>
        </li>
        <li>
            <input type="radio" id="promptpay" name="destination" value="promptpay" className="hidden peer" onChange={handleOptionChange}  />
            <label htmlFor="promptpay" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                <div className="block">
                    <div className="w-full text-lg font-semibold">PromptPay</div>
                    <div className="w-full">โอนเงินผ่าน PromptPay</div>
                </div>
                <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </label>
        </li>
    </ul>
</div>
      <h3 className="mt-4 ml-16 text-xl font-medium text-gray-900">Transfer Information</h3>
      <div className="flex flex-1">
      <form
        className="ml-16 w-3/5 bg-slate-900 rounded-lg my-4 p-12"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-1 justify-between items-center">
          {/* Select Your Wallet */}
            <form className="max-w-sm w-1/2">
              <label
                htmlFor="wallets"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your account
              </label>
              <select
                onChange={handleChange}
                id="wallets"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {walletData.map((wallet, index) => {
                  return (
                    <option key={index} value={index}>
                      {wallet?.account_id} | {wallet.first_name} - {wallet.account_type_name}
                    </option>
                  );
                })}
              </select>
            </form>

            <div>
              
              <svg className="w-10 h-5 mx-6 mt-6 rtl:rotate-180 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </div>

            <div className="max-w-sm w-1/2">
                      <label
                        htmlFor="to_account_id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Target Account ID
                      </label>
                      <input
                        type="text"
                        name="to_account_id"
                        id="to_account_id"
                        value={targetWallet}
                        onChange={(e) => setTargetWallet(e.target.value)}
                        className="outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ex. 827631016"
                        required
                      />
                    </div>
        </div>
        <div className="my-5">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount (Baht)
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
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="text-3xl">Your balance : ฿ {walletData[selectedWallet]?.balance}</h1>
        <img src="pocket.svg" className="p-1" width={300}></img>
        <ConfirmTransfer 
                      isVisible={isModalVisible}
                      setIsVisible={setIsModalVisible}
                      transactionData={{
                        amount: amount,
                        from_account_id: walletData[selectedWallet]?.account_id,
                        to_account_id: targetWallet,
                        transaction_type_id: selectedOption
                      }
                    }
                  />
      </div>
      </div>
    </div>
  );
};

export default TransferPage;
