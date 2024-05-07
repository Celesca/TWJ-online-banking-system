import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainMenuPage from "../pages/MainMenuPage/MainMenuPage";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "" , element: <HomePage />},
            { path: "login" , element: <LoginPage />},
            { path: "register" , element: <LoginPage />},
            { path: "main" , element: <MainMenuPage/> }
        ]
    }
])