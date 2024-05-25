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
import LoanPage from "../pages/LoanPage.tsx/LoanPage";
import LoanInfo from "../pages/LoanPage.tsx/LoanInfo";
import TransferSummary from "../pages/TransferPage/TransferSummary";
import ManagerCustomer from "../pages/ManagerPage/ManagerCustomer";
import ManagerHome from "../pages/ManagerPage/ManagerHome";
import ManagerCustomerInfo from "../pages/ManagerPage/ManagerCustomerInfo";
import StaffTransactionPage from "../pages/Staff/StaffTransactionPage";
import StaffHome from "../pages/Staff/StaffHome";
import ManagerTransactionPage from "../pages/ManagerPage/ManagerTransactions";
import ManagerStaff from "../pages/ManagerPage/ManagerStaff";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "" , element: <WelcomePage />},
            { path: "login" , element: <LoginPage />},
            { path: "register" , element: <RegisterCustomerPage />},
            { path: "deposit" , element: <DepositPage/> },
            { path: "transactions" , element: <TransactionPage/>},
            { path: "transfer", element: <TransferPage/>},
            { path: "transfer/review/:transactionId", element: <TransferSummary/>},
            { path: "home" , element: <HomePage/> },
            { path: "loan" , element: <LoanPage/> },
            { path: "loan/:loan_id/:customer_email", element: <LoanInfo/>},
            // Staff routes
            { path: "staff/home", element: <StaffHome/>},
            { path: "staff/customers", element: <StaffCustomer/>},
            { path: "staff/customers/:customer_email", element: <CustomerInfo/>},
            { path: "staff/transactions", element: <StaffTransactionPage/>},
            // Manager routes
            { path: "manager/home", element: <ManagerHome/>},
            { path: "manager/customers", element: <ManagerCustomer/>},
            { path: "manager/staffs", element: <ManagerStaff/>},
            { path: "manager/customers/:customer_email", element: <ManagerCustomerInfo/>},
            { path: "manager/transactions", element: <ManagerTransactionPage/>},
        ]
    }
])