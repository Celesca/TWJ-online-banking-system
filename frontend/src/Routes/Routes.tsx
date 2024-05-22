import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import RegisterCustomerPage from "../pages/RegisterPage/RegisterCustomerPage";
import DepositPage from "../pages/DepositPage/DepositPage";
import TransactionPage from "../pages/TransactionPage/TransactionPage";
import TransferPage from "../pages/TransferPage/TransferPage";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "" , element: <WelcomePage />},
            { path: "login" , element: <LoginPage />},
            { path: "register" , element: <RegisterCustomerPage />},
            { path: "deposit" , element: <DepositPage/> },
            { path: "transaction" , element: <TransactionPage/>},
            { path: "transfer", element: <TransferPage/>},
            { path: "home" , element: <HomePage/> },
        ]
    }
])