import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainMenuPage from "../pages/MainMenuPage/MainMenuPage";
import RegisterIdPage from "../pages/RegisterPage/RegisterIdPage";
import RegisterCustomerNamePage from "../pages/RegisterPage/RegisterCustomerNamePage";
import RegisterInformationPage from "../pages/RegisterPage/RegisterInformationPage";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "" , element: <HomePage />},
            { path: "login" , element: <LoginPage />},
            { path: "register/checkid" , element: <RegisterIdPage />},
            { path: "register/checkusername" , element: <RegisterCustomerNamePage />},
            { path: "register/information" , element: <RegisterInformationPage />},
            { path: "main" , element: <MainMenuPage/> },

        ]
    }
])