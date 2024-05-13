import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainMenuPage from "../pages/MainMenuPage/MainMenuPage";
import RegisterIdPage from "../pages/RegisterPage/RegisterIdPage";
import RegisterCustomerNamePage from "../pages/RegisterPage/RegisterCustomerNamePage";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "" , element: <HomePage />},
            { path: "login" , element: <LoginPage />},
            { path: "register/checkid" , element: <RegisterIdPage />},
            { path: "register/checkusername" , element: <RegisterCustomerNamePage />},
            { path: "main" , element: <MainMenuPage/> },

        ]
    }
])