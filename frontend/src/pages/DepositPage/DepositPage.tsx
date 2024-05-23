import { useEffect, useState } from "react";
import { CiBank } from "react-icons/ci";
import Swal, { SweetAlertIcon } from "sweetalert2";
import React from "react";
import "./DepositPage.css";
import axios from "axios";
import { WalletData } from "../../model/Wallet";
import ConfirmDeposit from "../../components/ConfirmDeposit";

const DepositPage = () => {

  const [walletData, setWalletData] = useState<WalletData[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<number>(1);
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
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;
    if (optionValue === "promptpay" || optionValue === "truewallet" || optionValue === "otherbank") {
      setSelectedOption(1);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "customer") {
      responseSwal("You are not authorized to access this page", "We are redirecting you to the homepage", "error").then(() => {
        window.location.href = "/";
      });
    }
    queryWallet(localStorage.getItem("username") || "");
  }, []);

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedOption === 1) {
      setIsModalVisible(true);
    }
  }

  return (
    <div className="homepage_container">
      <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl pt-8 pb-8 px-16">Deposit</h1>
      </div>
      <div className="px-16 w-3/4">
          <h3 className="my-4 text-xl font-medium text-gray-900">Choose your method</h3>
    <ul className="grid gap-6 grid-cols-3 ">
        <li className="flex flex-col items-center">
            <input type="radio" id="inside" name="destination" value="inside" className="hidden peer" 
            onChange={handleOptionChange} required defaultChecked/>
            <label htmlFor="inside" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                <div className="flex justify-center items-center">
                  <div className="flex justify-center">
                    <img src="icon-thaiqr.png" width={100} height={100} alt="qr-code"></img>
                  </div>
                  <div>
                    <div className="w-full text-lg font-semibold">Prompt Pay (Recommended)</div>
                    <div className="w-full">เติมเงินผ่าน QR Code</div>
                  </div>
                </div>
            </label>
        </li>
        <li>
            <input type="radio" id="outside" name="destination" value="outside" className="hidden peer" onChange={handleOptionChange}/>
            <label htmlFor="outside" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex justify-center items-center">
                  <div className="flex justify-center">
                    <img src="truemoney.png" width={80} height={100} className="truewallet" alt="truewallet"></img>
                  </div>
                  <div>
                    <div className="w-full text-lg font-semibold">TrueMoney Wallet</div>
                    <div className="w-full">เติมเงินผ่านแอพพลิเคชัน</div>
                  </div>
                </div>
            </label>
        </li>
        <li>
            <input type="radio" id="promptpay" name="destination" value="promptpay" className="hidden peer" onChange={handleOptionChange}  />
            <label htmlFor="promptpay" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
              <div className="flex justify-center items-center">
                  <div className="flex justify-center">
                  <CiBank size={80} className="mr-4" />
                  </div>
                  <div>
                    <div className="w-full text-lg font-semibold">Other bank</div>
                    <div className="w-full">เติมเงินผ่านธนาคารอื่น</div>
                  </div>
                </div>
            </label>
        </li>
    </ul>
</div>
      <h3 className="mt-4 ml-16 text-xl font-medium text-gray-900">Deposit Information</h3>
      <div className="flex flex-1">
      <form
        className="w-2/5 mx-16 bg-slate-900 flex flex-col items-center rounded-lg p-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-5">
          <form className="max-w-sm">
            <label
              htmlFor="wallets"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Choose your account (เลือกบัญชีที่จะฝาก)
            </label>
            <select
              onChange={handleChange}
              id="wallets"
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {walletData.map((wallet, index) => {
                return (
                  <option key={index} value={index}>
                    {wallet.account_id} | {wallet.first_name} - {wallet.account_type_name}
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
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="text-3xl">Your balance : ฿ {walletData[selectedWallet]?.balance}</h1>
        <img src="pocket.svg" className="p-1" width={300}></img>
      </div>
      <ConfirmDeposit isVisible={isModalVisible} setIsVisible={setIsModalVisible} handleDeposit={handleDeposit}/>
    </div>
    </div>
  );
};

export default DepositPage;
