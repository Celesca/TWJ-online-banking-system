import Swal, { SweetAlertIcon } from "sweetalert2";
import { WalletData } from "../model/Wallet";

interface SelectProps {
  setSelectedWallet: (index: number) => void;
  walletData: WalletData[];
}

const SelectWallet: React.FC<SelectProps> = ({ setSelectedWallet, walletData}) => {

  function responseSwal(title: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWallet(parseInt(event.target.value));
    responseSwal("Wallet selected", "success")
  };

  return (
    <form className="max-w-sm mx-auto">
  <label htmlFor="wallets" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose your wallet</label>
  <select onChange={handleChange} id="wallets" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    {
      walletData.map((wallet, index) => {
        return (
          <option key={index} value={index}>{wallet.account_id} | {wallet.first_name} - {wallet.account_type_name}</option>
        )
      
      })
    }
  </select>
</form>
  )
}

export default SelectWallet;