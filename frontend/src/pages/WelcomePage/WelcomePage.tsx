import { Link } from "react-router-dom"
import './WelcomePage.css'

const WelcomePage = () => {
  return (
    <div className="homepage_container">
      <div className="flex flex-1 justify-evenly">
        <div className="mt-12 ml-12 text-center sub_container rounded-lg p-12 h-100">
          <h1 className="head_text text-white">TWJ Online Banking</h1>
          <p className="sub_text text-white">Thailand No.1 Future banking</p>
          <div className="flex justify-center mt-8">
          <img src="digital_banking.svg" width={450} ></img>
          </div>
        </div>
        <div className="login-container py-16 pl-0 mt-8">
          <h1 className="login-text">Welcome to new Era of Banking</h1>
          <p className="login-sub-text text-2xl pt-4">Experience seamless banking with our modern online platform.</p>
          <Link to="/login">
          <button type="button" className="text-white font-medium login-button text-sm px-12 py-4 mt-8 text-center me-2 mb-2">
            Login
          </button>
          </Link>
          <Link to="/register">
            <div className="text-dark text-lg mt-6">
            don't have account? &nbsp;<span className="underline decoration-solid text-blue-900">Join us</span>
            </div>
            </Link>
        </div>
        </div>
    </div>
  )
}

export default WelcomePage