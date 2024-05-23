import axios from "axios";
import { useEffect, useState } from "react"
import { SweetAlertIcon } from "sweetalert2";
import { CustomerData } from "../../model/CustomerData";

const StaffCustomer = () => {
    const [customerData, setCustomerData] = useState<CustomerData[]>([]);
    const [staffEmail, setStaffEmail] = useState<string>("");

    const queryCustomer = async (staff_email: string) => {
        console.log(staff_email);
        const uri = import.meta.env.VITE_SERVER_URI + "/api/customers/staff/" + staff_email;
        const response = await axios.get(uri);
        console.log(response.data);
        setCustomerData(response.data);
    }

    const responseSwal = async (title: string, text: string, icon: SweetAlertIcon) => {
        const swal = await import("sweetalert2");
        return swal.default.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonColor: "#00ab55",
            timer: 1500,
        });
    
    }

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "staff") {
            responseSwal("You are not authorized to access this page", "We are redirecting you to the homepage", "error").then(() => {
                setTimeout(() => {
                window.location.href = "/";
                }, 1500);
            });
        }
        const email = localStorage.getItem("username");
        if (email) {
            setStaffEmail(email);
        }
        else {
            responseSwal("You are not logged in", "We are redirecting you to the homepage", "error").then(() => {
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
    }, [staffEmail])

  return (
    <div className="homepage_container">
     <div className="flex w-100vw header-container">
        <h1 className="text-white text-3xl py-6 px-16">Customers List</h1>
      </div>
      <div>
        {customerData.length > 0 ? (
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">First Name</th>
                    <th className="px-4 py-2">Last Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">National Card ID</th>
                </tr>
                </thead>
                <tbody>
                {customerData.map((customer) => (
                    <tr key={customer.email}>
                    <td className="border px-4 py-2">{customer.first_name}</td>
                    <td className="border px-4 py-2">{customer.last_name}</td>
                    <td className="border px-4 py-2">{customer.email}</td>
                    <td className="border px-4 py-2">{customer.phone_number}</td>
                    <td className="border px-4 py-2">{customer.national_card_id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <p className="text-center">No customers found</p>
            
        )}
      </div>
  </div>
  )
}

export default StaffCustomer