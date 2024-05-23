import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import RegisterCustomerPage from "../pages/RegisterPage/RegisterCustomerPage";
import DepositPage from "../pages/DepositPage/DepositPage";
import TransactionPage from "../pages/TransactionPage/TransactionPage";
import TransferPage from "../pages/TransferPage/TransferPage";
import StaffCustomer from "../pages/Staff/StaffCustomer";
import CustomerInfo from "../pages/Staff/CustomerInfo";

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
            { path: "staff_customers", element: <StaffCustomer/>},
            { path: "customer_info/:customer_email", element: <CustomerInfo/>}
        ]
    }
])