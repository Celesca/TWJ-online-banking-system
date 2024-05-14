import { Link } from "react-router-dom"
import './WelcomePage.css'

const WelcomePage = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 homepage_container">
        <div className="pt-16 text-center">
          <h1 className="head_text text-white">TWJ Online Banking</h1>
        </div>
        <div className="login-container pt-16">
        <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 focus:delay-300 transition delay-100 duration-300 ease-in-out font-medium rounded-lg text-sm px-12 py-4 text-center me-2 mb-2">
          <Link to="/login">Login</Link>
        </button>
          <div className="text-white text-lg m-12">
          don't have account? <Link to="/register/checkid" className="underline decoration-solid text-blue-900">Sign up</Link>
          </div>
        </div>
        
    </div>
  )
}

export default WelcomePage