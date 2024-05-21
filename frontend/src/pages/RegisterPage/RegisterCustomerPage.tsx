import axios from "axios";
import React, { useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import "./RegisterCustomerPage.css";
import { Link } from "react-router-dom";

const RegisterCustomerPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [dob, setDob] = useState(new Date());

  const responseSwal = async (
    title: string,
    text: string,
    icon: SweetAlertIcon
  ) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== repassword) {
        responseSwal(
          "Oops...",
          "Password and Re-password are not the same!",
          "error"
        ).then(() => {
          setPassword("");
          setRepassword("");
        });
      }

      const userData = {
        email: email,
        password: password,
      };

      console.log(userData);

      const response = await axios.post(
        import.meta.env.VITE_SERVER_URI + "/api/customers/register",
        userData
      );
      if (response.status === 201) {
        responseSwal("Success", "Register successfully!", "success").then(
          () => {
            setEmail("");
            setPassword("");
            setRepassword("");
            window.location.href = "/login";
          }
        );
      } else {
        responseSwal("Oops...", "Username already exists!", "error").then(
          () => {
            setEmail("");
            setPassword("");
            setRepassword("");
          }
        );
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className="homepage_container overflow-y-auto">
      <div className="flex flex-1 justify-evenly">
        <div className="w-1/2">
          <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 register-container">
                <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6 register-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-1">
                      <div className="firstname-container">
                        <label
                          htmlFor="firstname"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Firstname
                        </label>
                        <input
                          type="text"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          name="confirm-password"
                          id="firstname"
                          placeholder="ex. Sawit"
                          className="px-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      <div className="ml-8 lastname-container">
                        <label
                          htmlFor="lastname"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Lastname
                        </label>
                        <input
                          type="text"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          placeholder="ex. Koseeyaumporn"
                          name="lastname"
                          id="lastname"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                    <label
                        htmlFor="date-of-birth"
                        className="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
                      >
                        Date of Birth
                      </label>
                    <div className="relative max-w-sm pt-0">
                      
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>

                      <input
                        onChange={(e) => setDob(new Date(e.target.value))}
                        value={dob.toISOString().slice(0, 10)}
                        datepicker-autohide
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm password
                      </label>
                      <input
                        type="password"
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          I accept the{" "}
                          <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="#"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Create an account
                    </button>
                    <p className="text-sm font-light text-white dark:text-dark">
                      Already have an account?{" "}
                      <Link to="/login">
                        <a
                          href="/login"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Login here
                        </a>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-1/2 pt-12">
          <div className="promo-container flex flex-col flex-1 w-1/2">
            <h1 className="text-xl">The journey begins!</h1>
            <div className="image-container">
              <img
                src="https://cdn.pixabay.com/photo/2024/01/13/09/18/coins-8505363_1280.jpg"
                width={600}
                className="border-x-emerald-200"
              ></img>
            </div>
            <h2 className="text-3xl pt-12">In the money we trust.</h2>
            <h2 className="text-3xl pt-2 pb-4">
              Choose <span className="brand-text">TWJ Online Banking</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomerPage;
