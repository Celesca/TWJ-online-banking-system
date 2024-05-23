import axios from "axios";
import { useEffect, useState } from "react";
import { SweetAlertIcon } from "sweetalert2";
import { CustomerData } from "../../model/CustomerData";
import CustomerCard from "../../components/CustomerCard";

const StaffCustomer = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [staffEmail, setStaffEmail] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customerData.filter((customer) =>
    customer.first_name.includes(searchTerm) ||
  customer.last_name.includes(searchTerm) ||
  customer.email.includes(searchTerm) ||
  customer.national_card_id.includes(searchTerm)
  );

  const queryCustomer = async (staff_email: string) => {
    const uri =
      import.meta.env.VITE_SERVER_URI + "/api/staffs/customers/" + staff_email;
    const response = await axios.get(uri);
    console.log(response.data.users);
    setCustomerData(response.data.users);
  };

  const responseSwal = async (
    title: string,
    text: string,
    icon: SweetAlertIcon
  ) => {
    const swal = await import("sweetalert2");
    return swal.default.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#00ab55",
      timer: 1500,
    });
  };

  const handleClickCard = (customer_email: string) => {
    window.location.href = "/staff/customers/" + customer_email;
    }

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "staff") {
      responseSwal(
        "You are not authorized to access this page",
        "We are redirecting you to the homepage",
        "error"
      ).then(() => {
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      });
    }
    const email = localStorage.getItem("username");
    if (email) {
      setStaffEmail(email);
    } else {
      responseSwal(
        "You are not logged in",
        "We are redirecting you to the homepage",
        "error"
      ).then(() => {
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      });
    }
  }, []);

  useEffect(() => {
    if (staffEmail) {
      queryCustomer(staffEmail);
    }
  }, [staffEmail]);

  return (
    <div className="homepage_container">
      <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16">Customers List</h1>
      </div>

      <form className="max-w-md mx-auto mt-8">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Customers ..."
            required
            value={searchTerm}
            onChange={handleSearchChange}
          />
        
        </div>
      </form>
      <div className="flex justify-center">
        <div className="w-2/5 p-6">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard key={index} customer={customer} onClickCard={handleClickCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffCustomer;
