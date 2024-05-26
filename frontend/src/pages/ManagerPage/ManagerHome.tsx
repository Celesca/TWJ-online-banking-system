import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { WalletData } from "../../model/Wallet"; // Ensure correct path
import { Link } from "react-router-dom";
import "./Manager.css";
import { StaffInfoData } from "../../model/StaffInfoData";

export interface Card {
  link: string;
  image: string;
  title: string;
  description: string;
}

const ManageHomePage = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [staffData, setStaffData] = useState<StaffInfoData | null>(null);
  const [hasWallet, setHasWallet] = useState<boolean>(false);
  const [cashIn, setCashIn] = useState<number>(0);
  const [cashOut, setCashOut] = useState<number>(0);

  const responseSwal = (title: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const queryBankWallet = async (email: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/manager/bank-account/${email}`);
      console.log(response.data)
      console.log(response.data.update_balance[0])
      if (response.data) {
        setWalletData(response.data.balance[0]);
        setStaffData(response.data.staff[0]);
        setCashIn(response.data.update_balance[0].update_balance);
        setCashOut(response.data.update_balance[2].update_balance);
        setHasWallet(true);
      } else {
        responseSwal("No wallet found", "error");
        setHasWallet(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      responseSwal(err.message, "error");
      setHasWallet(false);
    }
  };

  useEffect(() => {
    document.title = "TWJ Online Banking - Home";
    const username = localStorage.getItem("username");
    if (username) {
      queryBankWallet(username);
    } else {
      responseSwal("Please login first", "error").then(
        () => (window.location.href = "/login")
      );
    }
  }, []);

  const cards: Card[] = [
    { link: "/manager/customers", image: "/images/customers.png", title: "Customers", description: "View and manage customers" },
    { link: "/manager/staffs", image: "/images/staff.png", title: "Staff", description: "View and manage staff" },
    { link: "/manager/transactions", image: "/images/transactions.png", title: "Transactions", description: "View and manage transactions"},
    { link: "/manager/loans", image: "/images/loans.png", title: "Loans", description: "View and manage loans"},
    { link: "/manager/interests", image: "/images/interests.png", title: "Interests", description: "View and manage interests"},
    { link: "/manager/history", image: "/images/history.png", title: "History", description: "View and manage history"}
  ];

  return (
    <div className="bg-indigo-500 homepage_container pt-8 px-16">
      <header className="text-greetings text-4xl p-4">
        {staffData && (
          <h1 className="text-dark pb-1">Welcome, {staffData.first_name} {staffData.last_name}</h1>
        )}
      </header>
      <div className="flex">
        <div className="w-1/2 p-4 mt-4 balance-container">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-lg text-center font-semibold">Bank Balance</h2>
            {hasWallet && walletData ? (
              <div className="flex flex-col justify-center">
                <div className="text-4xl font-semibold text-center pt-8">
                  ฿ {walletData?.balance ? walletData.balance.toFixed(2) : '0.00'}
                </div>
                <div className="mt-8 text-xl text-center">Cash in / Cash out for this month</div>
                <div className="flex mt-6">
                <div className="flex-1 flex-col text-center text-green-500">
                    <h1>Cash In</h1>
                    <p>฿ {cashIn.toFixed(2)}</p>
                  </div>
                  <div className="flex-1 flex-col text-center text-red-500">
                    <h1>Cash Out</h1>
                    <p>฿ {cashOut.toFixed(2)}</p>
                  </div>
                  </div>
              </div>
            ) : (
              <div className="text-center text-red-500">No wallet data available</div>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col flex-1 flex-wrap pb-32">

            {cards.map((card, index) => (
              <div key={index} className="p-1 ml-12 card-container rounded-lg shadow-lg m-2">
                <Link to={card.link}>
                  <div className="flex flex-col items-center rounded-lg md:flex-row">
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                        {card.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-200">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageHomePage;