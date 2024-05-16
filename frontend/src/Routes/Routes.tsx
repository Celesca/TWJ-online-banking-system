import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import RegisterIdPage from "../pages/RegisterPage/RegisterIdPage";
import RegisterCustomerNamePage from "../pages/RegisterPage/RegisterCustomerNamePage";
import DepositPage from "../pages/DepositPage/DepositPage";
import CreateWallet from "../pages/WalletPage/CreateWallet";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "" , element: <WelcomePage />},
            { path: "login" , element: <LoginPage />},
            { path: "register/checkid" , element: <RegisterIdPage />},
            { path: "register/checkusername" , element: <RegisterCustomerNamePage />},
            { path: "deposit" , element: <DepositPage/> },
            { path: "create-wallet", element: <CreateWallet/>},
            { path: "home" , element: <HomePage/> },
        ]
    }
])