interface ModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  handleDeposit: () => void;
}

const ConfirmDeposit: React.FC<ModalProps> = ({
  isVisible,
  setIsVisible,
  handleDeposit,
}) => {
  return (
    <div>
    {/* Modal */}
    <div id="default-modal" tabIndex={-1} aria-hidden={!isVisible} className={`overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center flex ${
      isVisible ? "" : "hidden"
    }`}>
  <div className="relative p-4 w-full max-w-2xl max-h-1/2">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Deposit Information
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
            <div className="flex justify-center">
              <img src="digital_banking.svg" width={300}></img>
            </div>
              <p className="text-base leading-relaxed text-white">
                  Please scan QR code with your payment method and click continue
              </p>
          </div>
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button onClick={handleDeposit}
              data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue</button>
          </div>
      </div>
  </div>
</div>

  </div>
  )
}

export default ConfirmDeposit