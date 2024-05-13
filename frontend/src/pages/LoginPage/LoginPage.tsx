import { useEffect, useState } from "react"
import React from "react"
import axios from "axios"
import Swal from "sweetalert2"

const LoginPage = () => {

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/home"
    }
  }, [])

  const [data, setData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password
    };

    try {
      axios.post("http://localhost:3000/api/customers/login", userData).then((response) => {
        if (response.status === 200) {
          console.log("response", response.data.token)
          localStorage.setItem("token", response.data.token)
          Swal.fire({
            title: "Login Success",
            text: "We are redirecting you to the homepage",
            icon: "success",
            timer: 2000,
            
          }).then(() => {
            window.location.href = "/main"
          })
        } else {
          throw new Error("Login Failed")
        } 
      })
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        title: "Login Failed",
        text: "Username or Password is incorrect",
        icon: "error",
        timer: 2000
      })
    }
  

  }
  return (
    <div className="bg-gradient-to-r from-indigo-500 homepage_container">
    <div className="flex w-100vw h-24 mt-16 justify-center text-white text-5xl">Welcome to User Login</div>
      <form className="max-w-sm mx-auto bg-slate-900 rounded-lg mt-4 p-12" onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input name="username" 
        value={data.username} 
        onChange={handleChange}
        type="text" id="email" 
        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="guy.rachanon" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input name="password"
        value={data.password}
        onChange={handleChange}
        type="password" id="password" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
  </div>
  )
}

export default LoginPage