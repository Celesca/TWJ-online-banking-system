import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
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

  const responseSwal = (title: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
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
      console.log(response.data);
      setSelectedWallet(0);
      setHasWallet(true);
    } else {
      responseSwal("No wallet found", "error");
      setHasWallet(false);
    }
  };

  const createWallet = async (account_type_id: string, username: string) => {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URI + "/api/accounts/create-account",
      {
        account_type_id: account_type_id,
        username: username,
      }
    );
    if (response.status === 201) {
      queryWallet(username);
      responseSwal("Wallet created successfully", "success");
    } else {
      responseSwal("Failed to create wallet", "error");
    }
  };

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
    <div className="bg-indigo-500 homepage_container p-16">
      <header className="text-greetings text-4xl p-2">
        Hello, {walletData[selectedWallet] ? walletData[selectedWallet].first_name : 'User'}. <span>what to do today? </span>
      </header>
      <div className="flex">
        <div className="w-1/2 p-4 mt-4 balance-container">
          <div className="bg-white rounded-lg shadow-lg p-12">
            {hasWallet && (
              <>
                <h2 className="text-lg text-center font-semibold">Balance</h2>
                <div className="flex flex-col justify-center">
                  <div className="text-4xl font-semibold text-center pt-8">
                    ฿ {walletData[selectedWallet].balance.toFixed(2)}
                  </div>
                </div>
                <SelectWallet setSelectedWallet={setSelectedWallet} walletData={walletData} />
              </>
            )}
            {!hasWallet && (
              <div className="text-center">
                <h2 className="text-lg font-semibold">No wallet found</h2>
                <p className="text-gray-500 pt-2">
                  Please create a wallet to start using our services.
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white mt-4 py-2 px-4 rounded-full"
                  onClick={() => setIsModalVisible(true)}
                >
                  สร้าง Wallet ใหม่
                </button>
                <CreateWalletModal
                  isVisible={isModalVisible}
                  setIsVisible={setIsModalVisible}
                  createWallet={createWallet}
                />
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
                <Link to={card.link}>
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