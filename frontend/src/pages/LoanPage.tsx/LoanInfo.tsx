import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { LoanDetail } from "../../model/LoanDetail";

const LoanInfo = () => {
  const { loan_id, customer_email } = useParams();

  const [loanDetail, setLoanDetail] = useState<LoanDetail>();

  const responseSwal = (
    title: string,
    description: string,
    icon: SweetAlertIcon
  ) => {
    return Swal.fire({
      title: title,
      text: description,
      icon: icon,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const queryLoanInfo = async (loan_id: string) => {
    const uri = import.meta.env.VITE_SERVER_URI + "/api/loans/info/" + loan_id;
    const response = await axios.get(uri);
    setLoanDetail(response.data[0]);
  }

  useEffect(() => {queryLoanInfo(loan_id || "");

  }, []);



  return (
    <div className="homepage_container">
      <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16">Loan Application</h1>
      </div>
      <div className="flex flex-1 gap-2">
        <div className="w-1/2">
          <div className="max-w-sm p-6 ml-16 mt-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg" src="/digital_banking.svg" alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {loanDetail?.loan_type_name}
                </h5>
              </a>
              <p className="mb-3 mt-3 font-normal text-gray-700 dark:text-gray-400">
                Interest Rate: {loanDetail?.interest_rate}%
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Interest Period: {loanDetail?.interest_period} months
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanInfo;
