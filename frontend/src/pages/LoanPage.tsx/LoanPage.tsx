import axios from "axios";
import { MyLoan } from "../../model/MyLoan";
import { useEffect, useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import SelectWallet from "../../components/SelectWallet";
import { WalletData } from "../../model/Wallet";
import { Link } from "react-router-dom";
import { LoanDetail } from "../../model/LoanDetail";
import "./LoanPage.css";

const LoanPage = () => {
    const [userLoan, setUserLoan] = useState<MyLoan>();
    const [walletData, setWalletData] = useState<WalletData[]>([]);
    const [hasWallet, setHasWallet] = useState<boolean>(false);
    const [selectedWallet, setSelectedWallet] = useState<number>(0);
    const [loanList, setLoanList] = useState<LoanDetail[]>([]);
    const [hasLoan, setHasLoan] = useState<boolean>(false);

    const responseSwal = (title: string, description: string, icon: SweetAlertIcon) => {
        return Swal.fire({
            title: title,
            text: description,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const queryWallet = async (email: string) => {
        try {
            const response = await axios.get(import.meta.env.VITE_SERVER_URI + "/api/accounts/" + email);
            if (response.data.length > 0) {
                setWalletData(response.data);
                console.log(response.data);
                setSelectedWallet(0);
                setHasWallet(true);
            } else {
                responseSwal("No wallet found", "Please create the wallet first", "error");
                setHasWallet(false);
            }
        } catch (error) {
            console.error("Error querying wallet:", error);
            responseSwal("Error", "Could not retrieve wallet data", "error");
        }
    };

    const queryLoanList = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_SERVER_URI + `/api/loans`);
            if (Array.isArray(response.data)) {
                setLoanList(response.data);
            } else {
                console.error('response.data is not an array:', response.data);
                responseSwal("Error", "Invalid loan list data", "error");
            }
        } catch (error) {
            console.error("Error querying loan list:", error);
            responseSwal("Error", "Could not retrieve loan list", "error");
        }
    };

    const queryLoan = async (email: string) => {
        try {
            const res = await axios.get(import.meta.env.VITE_SERVER_URI + `/api/loans/${email}`);
            console.log("userLoan" ,res.data.loanData);
            if (res.data.loanData.length > 0) {
                setUserLoan(res.data.loanData[0]);
                setHasLoan(true);
            }else {
                setHasLoan(false);
            }

        } catch (error) {
            console.error("Error querying loan:", error);
            responseSwal("Error", "Could not retrieve loan data", "error");
        }
    };

    const payLoan = async (loan_id: number, interest_rate_change: number, npl: number) => {
        try {
            const response = await axios.put(import.meta.env.VITE_SERVER_URI + `/api/loans/pay/${loan_id}`, {
                interest_rate_change: interest_rate_change,
                npl: npl
            });
            console.log(response.data);
            responseSwal("Success", "Loan payment successful", "success");
        } catch (error) {
            console.error("Error paying loan:", error);
            responseSwal("Error", "Could not pay the loan", "error");
        }
    };

    useEffect(() => {
        console.log("useEffect called");
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");
        console.log("Role:", role, "Username:", username);
        if (role === "customer" && username) {
            console.log("Customer detected, querying wallet and loans...");
            queryWallet(username);
            queryLoan(username);
            queryLoanList();
        } else {
            console.log("User not logged in or not a customer");
            responseSwal("You are not logged in", "Please log in first", "error");
            setTimeout(() => window.location.href = "/login", 1500);
        }
    }, []);

    return (
        <div className="homepage_container">
            <div className="flex w-100vw header-container">
                <h1 className="text-white text-3xl py-6 px-16">Loan</h1>
            </div>

            <div className="flex">
                <div className="w-1/2 p-4 balance-container">
                    <div className="bg-white ml-8 rounded-lg shadow-lg p-12">
                        {hasLoan && (
                            <>
                                <h2 className="text-2xl text-center font-semibold">Current Loan Amount</h2>
                                <div className="flex flex-col justify-center">
                                    <div className="text-4xl font-semibold text-red-500 text-center pt-8">
                                        ฿ {userLoan?.current_loan.toFixed(2)}
                                    </div>
                                    <div className="p-4 flex flex-1 justify-evenly">
                                        <p>Interest Rate: {(userLoan?.interest_rate ?? 0) + (userLoan?.interest_rate_change ?? 0)}%</p>
                                        <p>Interest Period: Day {userLoan?.interest_period} every month</p>
                                        
                                    </div>
                                </div>
                                
                                {hasWallet && (
                                    <div>
                                        <h2 className="text-lg text-center font-semibold">Your wallet : </h2>
                                        <SelectWallet
                                            setSelectedWallet={setSelectedWallet}
                                            walletData={walletData}
                                        />
                                        
                                        <div className="flex justify-center items-center mt-4">
                                        <h2 className="text-lg text-center font-semibold">Wallet balance : </h2>
                                            <div className="text-lg text-center">
                                                &nbsp; ฿ {walletData[selectedWallet]?.balance.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                        <button className="rounded-lg px-8 py-2 mt-4 text-center pay-button">Pay the loan with this wallet</button>
                                        </div>
                                    </div>
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
                        {!hasLoan && (
                            <div className="text-center">
                                <h2 className="text-lg font-semibold">No Loan found</h2>
                                <p className="text-gray-500 pt-2">
                                    You can start to apply for a loan. See the list right here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-1/2">
                    <h1 className="text-2xl p-4 ml-8 font-bold">Available Loans</h1>
                    <div className="flex flex-col flex-1 flex-wrap">
                        {loanList.map((loan, index) => (
                            <div key={index} className="p-4 ml-12 card-container rounded-lg shadow-lg m-2">
                                <Link to={`/loan/${loan.loan_type_id}/${localStorage.getItem('username')}`}>
                                    <div className="flex flex-col items-center rounded-lg md:flex-row">
                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                                                {loan.loan_type_name}
                                            </h5>
                                            <p className="mb-3 mt-2 font-normal text-gray-200">
                                                Interest Rate : {loan.interest_rate.toFixed(2)}
                                                
                                            </p>
                                            <p className="font-normal text-gray-200">
                                                Interest Period : Day {loan.interest_period} every month
                                                
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
}

export default LoanPage;
