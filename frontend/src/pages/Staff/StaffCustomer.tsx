import { useState } from "react"

const StaffCustomer = () => {
    const [customerData, setCustomerData] = useState<customerData[]>([]);

  return (
    <div className="homepage_container">
     <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16">Customers List</h1>
      </div>
  </div>
  )
}

export default StaffCustomer