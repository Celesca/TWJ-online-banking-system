import { useEffect, useState } from "react"
import React from "react"
import axios from "axios"
import Swal, { SweetAlertIcon } from "sweetalert2"
import './LoginPage.css'
import { Link } from "react-router-dom"

const LoginPage = () => {

  useEffect(() => {
    document.title = "TWJ Login"
    const role = localStorage.getItem("role")
    if (role === "customer") {
      Swal.fire({
        title: "You are already logged in",
        icon: "info",
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => window.location.href = "/home", 1500)
    } else if (role === "staff") {
      Swal.fire({
        title: "You are already logged in",
        icon: "info",
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => window.location.href = "/staff/customers", 1500)
    }
  }, [])

  const responseSwal = (title: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
      icon: icon,
      showConfirmButton: false,
      timer: 1500
    })
  }

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password
    };

    try {
      const response = await axios.post("http://localhost:3000/api/customers/login", userData);
      if (response.status === 200) {
        localStorage.setItem("firstname", response.data.first_name);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", userData.email);
        localStorage.setItem("role", response.data.role);
        responseSwal("Login Success", "success").then(() => window.location.href = "/home");
      } 
    } catch (error) {
      const staffResponse = await axios.post("http://localhost:3000/api/staffs/login", userData);
      if (staffResponse.status === 200) {
        localStorage.setItem("firstname", staffResponse.data.first_name);
        localStorage.setItem("token", staffResponse.data.token);
        localStorage.setItem("username", userData.email);
        console.log(staffResponse);
        console.log(staffResponse.data.role);
        localStorage.setItem("role", staffResponse.data.role);
        if (staffResponse.data.role === "Manager") {
          responseSwal("Login Success", "success").then(() => window.location.href = "/manager/home");
        } else {
          responseSwal("Login Success", "success").then(() => window.location.href = "/staff/customers");
        }
      }
      else {
        responseSwal("Invalid email or password", "error");
      }
    }
  }
  return (
    <div className="homepage_container">
    <div className="flex flex-1 justify-evenly">
      <div className="w-1/2">

      <section className="">
  <div className="flex flex-col items-center justify-center px-6 py-8 mt-12">
      <div className="w-full bg-white rounded-lg shadow dark:border login-form-container md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6 login-form" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={data.email} onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={data.password} onChange={handleChange}
                      name="password" id="password" 
                      placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full sign-in-btn text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-white">
                      Don’t have an account yet? <Link to="/register" ><a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a></Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

      </div>
      <div className="w-1/2 pt-12 mt-6">
          <div className="promo-container flex flex-col flex-1 w-1/2">
          <h1 className="text-xl text-center">Login to TWJ</h1>
            <div className="image-container">
              <img
                src="login.svg"
                width={600}
                className="border-x-emerald-200"
              ></img>
            </div>
            <h2 className="text-3xl pt-12">We are ready to drive you to new world</h2>
            <h2 className="text-3xl pt-2 pb-4">
              <span className="brand-text">TWJ Online Banking</span>
            </h2>
          </div>
        </div>

      </div>
  </div>
  
  )
}

export default LoginPage