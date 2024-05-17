import { useEffect } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import React from "react";
import "./DepositPage.css";
import axios from "axios";

const DepositPage = () => {

  const responseSwal = (title: string, text: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const queryWallet = async (username: string) => {
    const response = await axios.get(
      "http://localhost:3000/api/accounts/" + username
    );
    if (response.data.length > 0) {
        console.log(response.data);
    } else {
      responseSwal("No wallet found", "", "error");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "customer") {
      responseSwal("You are not authorized to access this page", "We are redirecting you to the homepage", "error").then(() => {
        window.location.href = "/";
      });
    }
    queryWallet(localStorage.getItem("username") || "");
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 homepage_container">
      <div className="flex w-100vw h-24 mt-16 justify-center text-white text-5xl">
        Deposit (ฝากเงิน)
      </div>
      <img src="money.png" alt="money" className="w-24 mx-auto mb-4 " />
      <form
        className="max-w-sm mx-auto bg-slate-900 rounded-lg mt-4 p-12"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-5">
          <form className="max-w-sm mx-auto">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              เลือกบัญชีที่จะฝาก
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </form>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DepositPage;
