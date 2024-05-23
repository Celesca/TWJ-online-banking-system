import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"


const CustomerInfo = () => {
    const { customer_email } = useParams();

    useEffect(() => {
        // Change the favicon to the custom digital_banking.svg image in public folder
        const favicon = document.getElementById("favicon") as HTMLLinkElement;
        
        

    })
    // const [customerInfoData, setCustomerInfoData] = useState([]);

    // async function getCustomerInfo(theCustomerEmail: string) {
    //     const response = await axios.get(import.meta.env.VITE_SERVER_URI + "/api/customers/" + theCustomerEmail);
    //     const responseJson = await response.json();
    //     setCustomerInfoData(responseJson)
    // }

    // useEffect(() => {
    //     getCustomerInfo(customer_email)
    
    // }, [customer_email])

  return (
    <div>CustomerInfo

        {customer_email}
    </div>
  )
}

export default CustomerInfo