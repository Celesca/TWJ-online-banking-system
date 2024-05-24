import axios from "axios";
import { MyLoan } from "../../model/MyLoan";
import { useEffect, useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import SelectWallet from "../../components/SelectWallet";
import { WalletData } from "../../model/Wallet";
import { Link } from "react-router-dom";

const LoanPage = () => {

    const [userLoan, setUserLoan] = useState<MyLoan>();
    const [walletData, setWalletData] = useState<WalletData[]>([]);
    const [hasWallet, setHasWallet] = useState<boolean>(false);
    const [selectedWallet, setSelectedWallet] = useState<number>(0);

    const responseSwal = (title: string, description: string,icon: SweetAlertIcon) => {
        return Swal.fire({
            title: title,
            text: description,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const queryWallet = async (email: string) => {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_URI + "/api/accounts/" + email
        );
        if (response.data.length > 0) {
          setWalletData(response.data);
          console.log(response.data);
          setSelectedWallet(0);
          setHasWallet(true);
        } else {
          responseSwal("No wallet found", "Please create the wallet first", "error");
          setHasWallet(false);
        }
      };

    const queryLoan = async () => {
        const email = localStorage.getItem("username");
        const res = await axios.get(`/api/loans/${email}`);
        setUserLoan(res.data.loanData);
    }

    useEffect(() => {
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");
        if (role === "customer" && username) {
            queryWallet(username);
            queryLoan();
        } else {
            responseSwal("You are not logged in", "Please log in first", "error");
            setTimeout(() => window.location.href = "/login", 1500);
        }
        queryLoan();
    
    }, []);

  return (
    <div className="homepage_container">
    <div className="flex w-100vw header-container">
      <h1 className="text-white text-3xl py-6 px-16">Loan</h1>
    </div>

    <div className="flex">
        <div className="w-1/2 p-4 mt-12 balance-container">
          <div className="bg-white rounded-lg shadow-lg p-12">
            {userLoan && (
              <>
                <h2 className="text-lg text-center font-semibold">Balance</h2>
                <div className="flex flex-col justify-center">
                  <div className="text-4xl font-semibold text-center pt-8">
                    ฿ {totalBalance.toFixed(2)}
                  </div>
                </div>
                
                {hasWallet && (
                    <SelectWallet
                    setSelectedWallet={setSelectedWallet}
                    walletData={walletData}
                />
                )}
                {!hasWallet && (
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">No wallet found</h2>
                        <p className="text-gray-500 pt-2">
                            Please create a wallet to start using our services.
                            </p>
                            </div>
                            )}

              </>
            )}
            {!userLoan && (
              <div className="text-center">
                <h2 className="text-lg font-semibold">No wallet found</h2>
                <p className="text-gray-500 pt-2">
                  Please create a wallet to start using our services.
                </p>
              </div>
            )}

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
  )
}

export default LoanPage