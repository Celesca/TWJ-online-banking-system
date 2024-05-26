import { useEffect, useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import axios from "axios";
import { HistoryData } from "../../model/HistoryData";
import HistoryCard from "../../components/HistoryCard";

const StaffHistory = () => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const responseSwal = (title: string, text: string, icon: SweetAlertIcon) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const queryHistories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/histories`
      );
      console.log(response.data);
      if (response.data.length > 0) {
        setHistoryData(response.data);
      } else {
        setHistoryData([]);
        responseSwal("No transactions found", "", "error");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      responseSwal("Error", "Failed to fetch transactions", "error");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role?.toLowerCase() !== "staff") {
      responseSwal("You are not authorized to access this page", "We are redirecting you to the homepage", "error").then(() => {
        window.location.href = "/";
      });
    } else {
      queryHistories();
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredHistories = historyData.filter((history) =>
    history.entity_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.entity_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.staff_email?.toString().includes(searchTerm)
  );

  return (
    <div className="bg-gradient-to-r from-indigo-500 homepage_container">
      <div className="flex w-100vw items-center justify-center header-container">
        <h1 className="text-white text-3xl py-6 px-16">All History Changes</h1>
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
            placeholder="Search Histories ..."
            required
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </form>

      {/* Display the Transactions */}
      <div className="flex flex-col">
        {filteredHistories.length > 0 ? (
          filteredHistories.map((history, index) => (
            <HistoryCard key={index} history={history} />
          ))
        ) : (
          <div className="bg-[#7b68ca]">
            <h1 className="text-white text-center p-8 text-2xl">No transaction data</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffHistory;