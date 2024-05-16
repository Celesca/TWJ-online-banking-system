interface Card {
  title: string;
  description: string;
  image: string;
  link: string;
}

import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [balance, setBalance] = useState<number>(0);
  let hasWallet = false;

  // const loadAllWallet = async () => {
  //   const response = await axios.get('http://localhost:3000/walletByCustomerId/1')
  //   const data = response.data
  //   console.log(data)
  // }

  const queryWallet = async (username: string) => {
    const response = await axios.get(
      "http://localhost:3000/wallet/" + username
    );
    if (response.data.length > 0) {
      setBalance(response.data[0].balance);
      hasWallet = true;
    } else {
      Swal.fire({
        title: "No wallet found",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    document.title = "TWJ Online Banking - Home";
    // Check the balance of the account
    const username = localStorage.getItem("username");
    if (username) {
      queryWallet(username);
    } else {
      Swal.fire({
        title: "Please login first",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => (window.location.href = "/login"));
    }
  },);

  const cards: Card[] = [
    {
      title: "Deposit",
      description: "ฝากเงินเข้าสู่บัญชีธนาคาร",
      image: "deposit.jpg",
      link: "/deposit",
    },
    {
      title: "Transfer",
      description: "โอนเงินได้ทุกที่ที่เวลา",
      image: "transfer.jpg",
      link: "/transfer",
    },
    {
      title: "Loaning",
      description: "ทำการกู้สินเชื่อกับธนาคาร",
      image: "loan.jpg",
      link: "/loan",
    },
    {
      title: "Loaning",
      description: "กู้สินเชื่อ",
      image: "loan.jpg",
      link: "/loan",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-500 homepage_container p-16">
      <header className="text-greetings text-4xl p-2">
        What do you <span>want to do today?</span>
      </header>
      <div className="flex">
        <div className="w-1/2 p-4 mt-4 balance-container">
          <div className="bg-white rounded-lg shadow-lg p-12">
            {hasWallet && (
              <>
                <h2 className="text-lg text-center font-semibold">Balance</h2>
                <div className="flex flex-col justify-center">
                  <div className="text-4xl font-semibold text-center pt-8">
                    ฿ {balance.toFixed(2)}
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
                <Link to="/create-wallet">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white mt-4 py-2 px-4 rounded-full">
                    สร้าง Wallet ใหม่
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="flex flex-wrap justify-center">
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-1/2 min-w-0 sm:min-w-1/2 p-4 card-content"
              >
                <div className="bg-white rounded-lg shadow-lg pl-4 py-4 pr-0 flex">
                  <div className="flex">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-32 h-32"
                    />
                  </div>
                  <div className="py-4">
                    <h3 className="text-lg text-center font-semibold">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 text-center pt-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
