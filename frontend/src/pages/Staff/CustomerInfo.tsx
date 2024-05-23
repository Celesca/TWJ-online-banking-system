import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { WalletData } from "../../model/Wallet";


const CustomerInfo = () => {
    const { customer_email } = useParams();

    const [customerInfoData, setCustomerInfoData] = useState([]);
    const [accountData, setAccountData] = useState<WalletData[]>([]);

    async function getCustomerInfo(theCustomerEmail: string) {
        const response = await axios.get(import.meta.env.VITE_SERVER_URI + "/api/staffs/customers/insight" + theCustomerEmail);
        setCustomerInfoData(response.data);
        console.log(customerInfoData);
    }

    useEffect(() => {
        getCustomerInfo(customer_email ?? "")
    
    }, [])



  return (
    <div className="homepage_container">
      <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16"></h1>
      </div>
      CustomerInfo

        {customer_email}
    </div>
  )
}

export default CustomerInfo