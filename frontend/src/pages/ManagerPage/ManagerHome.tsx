import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { WalletData } from "../../model/Wallet"; // Ensure correct path
import { Link } from "react-router-dom";
import "./Manager.css";

export interface Card {
  link: string;
  image: string;
  title: string;
  description: string;
}

const ManageHomePage = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [hasWallet, setHasWallet] = useState<boolean>(false);

  const responseSwal = (title: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const queryBankWallet = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/manager/bank-account`);
      console.log(response.data)
      if (response.data) {
        setWalletData(response.data[0]);
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
      queryBankWallet();
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
    { link: "/manager/interests", image: "/images/interests.png", title: "Interests", description: "View and manage interests"}

  ];

  return (
    <div className="bg-indigo-500 homepage_container pt-8 px-16">
      <header className="text-greetings text-4xl p-4">
        <h1 className="text-dark pb-1">TWJ Online Control Panel</h1>
      </header>
      <div className="flex">
        <div className="w-1/2 p-4 mt-12 balance-container">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-lg text-center font-semibold">Bank Balance</h2>
            {hasWallet && walletData ? (
              <div className="flex flex-col justify-center">
                <div className="text-4xl font-semibold text-center pt-8">
                  ฿ {walletData?.balance ? walletData.balance.toFixed(2) : '0.00'}
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