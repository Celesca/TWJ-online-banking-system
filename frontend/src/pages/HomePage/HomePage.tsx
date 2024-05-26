import { useEffect, useState } from "react";
import "./HomePage.css";
import axios, { AxiosError } from "axios";
import Swal, { SweetAlertIcon } from "sweetalert2";
import CreateWalletModal from "../../components/CreateWalletModal";
import { Cards } from "../../model/Card";
import SelectWallet from "../../components/SelectWallet";
import { WalletData } from "../../model/Wallet";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [walletData, setWalletData] = useState<WalletData[]>([]);
  const [hasWallet, setHasWallet] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<number>(0);
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

    const querySummary = async (account_id: string) => {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URI + "/api/transactions/balance_summary/" + account_id
    );
    console.log(response.data.cash_in[0].cash_in);
    setCashIn(response.data.cash_in[0].cash_in);
    setCashOut(response.data.cash_out[0].cash_out);
  }

  const queryWallet = async (email: string) => {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URI + "/api/accounts/" + email
    );
    if (response.data.length > 0) {
      setWalletData(response.data);
      setSelectedWallet(0);
      setHasWallet(true);
    } else {
      responseSwal("No wallet found", "error");
      setHasWallet(false);
    }
  };

  const createWallet = async (account_type_id: string, email: string) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URI + "/api/accounts/create-account",
        {
          account_type_id: account_type_id,
          email: email,
        }
      );
      if (response.status === 201) {
        queryWallet(email);
        responseSwal("Wallet created successfully", "success");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        responseSwal("Failed to create wallet", "error");
      } else {
        responseSwal("An error occurred", "error");
      }
    }
  };

  useEffect(() => {
    const current_account_id = walletData[selectedWallet]?.account_id;
    querySummary(current_account_id ? current_account_id.toString() : "");
  }, [selectedWallet, queryWallet])

  useEffect(() => {
    document.title = "TWJ Online Banking - Home";
    // Check the balance of the account
    const username = localStorage.getItem("username");
    if (username) {
      queryWallet(username);
    } else {
      responseSwal("Please login first", "error").then(
        () => (window.location.href = "/login")
      );
    }
  }, []);

  const cards = Cards;

  return (
    <div className="bg-indigo-500 homepage_container pt-12 px-16 pb-24">
      <header className="text-greetings text-4xl p-4">
        Hello,{" "}
        {walletData[selectedWallet]
          ? walletData[selectedWallet].first_name
          : "User"}
        . <span>what to do today? </span>
      </header>
      <div className="flex">
        <div className="w-1/2 p-4 balance-container">
          <div className="bg-white rounded-lg shadow-lg p-12">
            {hasWallet && (
              <>
              <div className="text-end">
                <Link to="/transactions">
              <button className="p-2 rounded-lg text-white bg-[#4048ff]">View Transaction</button>
              </Link>
              </div>
                <h2 className="text-lg text-center font-semibold">Balance</h2>
                
                <div className="flex flex-col justify-center">
                  <div className="text-4xl font-semibold text-center pt-8">
                    ฿ {walletData[selectedWallet].balance.toFixed(2)}
                  </div>
                  <div className="mt-8 text-xl text-center">Cash in / Cash out for this month</div>
                <div className="flex mt-6">
                <div className="flex-1 flex-col text-center text-green-500">
                    <h1>Cash In</h1>
                    <p>฿ {cashIn?.toFixed(2) || 0}</p>
                  </div>
                  <div className="flex-1 flex-col text-center text-red-500">
                    <h1>Cash Out</h1>
                    <p>฿ {cashOut?.toFixed(2) || 0}</p>
                  </div>
                  </div>
              </div>
                <SelectWallet
                  setSelectedWallet={setSelectedWallet}
                  walletData={walletData}
                />
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
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white mt-4 py-2 px-4 rounded-full"
                onClick={() => setIsModalVisible(true)}
              >
                สร้าง Wallet ใหม่
              </button>
            </div>
            <CreateWalletModal
              isVisible={isModalVisible}
              setIsVisible={setIsModalVisible}
              createWallet={createWallet}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col flex-1 flex-wrap">
            {cards.map((card, index) => (
              <div key={index} className="p-4 ml-12 card-container rounded-lg shadow-lg m-2">
                <Link to={card.link}>
                  <a
                    href="#"
                    className="flex flex-col items-center rounded-lg md:flex-row"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-46 md:h-auto md:w-24 md:rounded-none md:rounded-s-lg"
                      src={card.image}
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                        {card.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-200">
                        {card.description}
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
