import React, { useState } from "react"

const RegisterCustomerNamePage = () => {

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [repassword, setRepassword] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
    } catch (error) {
      console.log("error")
    }

  }
  return (
    <div className="bg-gradient-to-r from-indigo-500 homepage_container">
    <div className="flex w-100vw h-24 mt-16 justify-center text-white text-5xl">Welcome to Customer Register</div>
      <form className="max-w-sm mx-auto bg-slate-900 rounded-lg mt-4 p-12" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขบัตรประชาชน</label>
        <input name="national_card_id" 
        type="text" id="text" value={username} onChange={(e) => setUsername(e.target.value)}
        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="guy.rachanon" required />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
  </div>
  )
}

export default RegisterCustomerNamePage