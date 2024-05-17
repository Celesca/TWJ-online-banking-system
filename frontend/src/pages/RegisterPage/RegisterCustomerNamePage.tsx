import axios from "axios";
import React, { useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";

const RegisterCustomerNamePage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);

  const responseSwal = async (title: string, text: string, icon: SweetAlertIcon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== repassword) {
        responseSwal("Oops...", "Password and Re-password are not the same!", "error").then(() => {
          setPassword("");
          setRepassword("");
        })
      }

      const userData = {
        username: username,
        password: password,
        salary: salary,
        national_card_id: localStorage.getItem("national_card_id"),
      };

      console.log(userData);

      const response = await axios.post(
        import.meta.env.VITE_SERVER_URI + "/api/customers/register",
        userData
      );
      if (response.status === 201) {
        responseSwal("Success", "Register successfully!", "success").then(() => {
          setUsername("");
          setPassword("");
          setRepassword("");
          localStorage.removeItem("national_card_id");
          window.location.href = "/login";
        })

      } else {
        responseSwal("Oops...", "Username already exists!", "error").then(() => {
          setUsername("");
          setPassword("");
          setRepassword("");
        })
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className="bg-gradient-to-r from-indigo-500 homepage_container overflow-y-auto">
      <div className="flex w-100vw h-24 mt-16 justify-center text-white text-5xl">
        Welcome to Customer Register
      </div>
      <form
        className="max-w-3xl mx-auto bg-slate-900 rounded-lg p-12"
        onSubmit={handleSubmit}
      >
        <div className="mb-5 flex flex-1 justify-evenly itmes-center">
          <div className="">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              id="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="salary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Salary
            </label>
            <input
              name="salary"
              type="number"
              id="salary"
              value={salary}
              min={0}
              onChange={(e) => setSalary(+e.target.value)}
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-8 flex flex-1 justify-evenly items-center">
          <div>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="repassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Re-enter Password
            </label>
            <input
              name="repassword"
              type="password"
              id="repassword"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCustomerNamePage;