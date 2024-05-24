import axios from "axios";
import { useEffect, useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { TransactionData } from "../model/TransactionData";
import { ConfirmTransactionData } from "../model/ConfirmTransactionData";


interface ModalProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    transactionData: TransactionData;
  }

const ConfirmTransfer: React.FC<ModalProps> = ({
    isVisible,
    setIsVisible,
    transactionData,
}) => {

    const [showData, setShowData] = useState<ConfirmTransactionData>();

    const responseSwal = (title: string, text: string, icon: SweetAlertIcon) => {
        return Swal.fire({
          title: title,
          text: text,
          icon: icon,
          timer: 1500,
          showConfirmButton: false,
        });
      };

    const handleShowData = async (informationData : TransactionData) => {
        
        const origin_response = await axios.get(import.meta.env.VITE_SERVER_URI + "/api/accounts/info/" + informationData.from_account_id);
        const destination_response = await axios.get(import.meta.env.VITE_SERVER_URI + "/api/accounts/info/" + informationData.to_account_id);
        if (origin_response.data.length > 0 && destination_response.data.length > 0) {
            const preshowData: ConfirmTransactionData = {
                from_account_id: informationData.from_account_id,
                from_account_firstname: origin_response.data[0].first_name,
                from_account_lastname: origin_response.data[0].last_name,
                to_account_id: informationData.to_account_id,
                to_account_firstname: destination_response.data[0].first_name,
                to_account_lastname: destination_response.data[0].last_name,
                amount: informationData.amount,
        
            }
            setShowData(preshowData);
        }
    
    }

    useEffect(() => {
        handleShowData(transactionData);
        if (isVisible) {
            document.getElementById("default-modal")?.focus();
        }
    }, [isVisible]);

    const transferMoney = async() => {
        const response = await axios.post(import.meta.env.VITE_SERVER_URI + "/api/transfers", transactionData
);
        if (response.status === 201) {
          responseSwal("Transfer successfully", "", "success");
          setIsVisible(false);
          setTimeout(() => {
              window.location.href = '/transfer/review/' + response.data.insertId;
            }, 1000);
        } else {
          responseSwal("Deposit failed", "", "error");
        }
      }

    const handleConfirm = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, transfer it!'
          }).then((result) => {
            if (result.isConfirmed) {
                transferMoney();

            }
            else {
                setIsVisible(false);
            }

    });
    }

  return (
    <div>
      {/* Modal */}
      <div id="default-modal" tabIndex={-1} aria-hidden={!isVisible} className={`overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center flex ${
        isVisible ? "" : "hidden"
      }`}>
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Transaction Information
                </h3>
                <button type="button" 
                onClick={() => setIsVisible(false)}
                className="text-dark bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                <h1 className="text-lg text-white">From : </h1>
                <p className="text-base leading-relaxed text-white">
                    Account ID - {showData?.from_account_id}
                </p>
                <p className="text-base leading-relaxed text-white">
                    Name - {showData?.from_account_firstname} {showData?.from_account_lastname}
                </p>
                <h1 className="text-lg text-white">To : </h1>
                <p className="text-base leading-relaxed text-white">
                    Account ID - {showData?.to_account_id}
                </p>
                <p className="text-base leading-relaxed text-white">
                    Name - {showData?.to_account_firstname} {showData?.to_account_lastname}
                </p>
                <h1 className="text-base text-yellow-400">Amount : {showData?.amount}</h1>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={() => handleConfirm()}
                data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="default-modal" onClick={() => setIsVisible(false)}
                type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div>
        </div>
    </div>
</div>

    </div>
  )
}

export default ConfirmTransfer