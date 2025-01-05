import React from "react";

const QRmodal = ({ toggleModal, amount }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={toggleModal}
      ></div>

      {/* Modal Content */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-auto px-4 z-20">
        <div className="bg-white rounded-md shadow-lg px-6 py-8 relative">
          {/* Close Button */}
          <button
            onClick={toggleModal}
            className="absolute top-4 right-4 p-2 text-gray-400 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Modal Header */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Scan the QR Code
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Screenshot of payment will be required at the time of the event.
            </p>
          </div>

          {/* QR Code Placeholder */}
          <div className="w-40 h-40 mx-auto bg-gray-200 flex items-center justify-center rounded-lg mt-6">
            {/* Replace with a QR Code library like react-qr-code */}
            <span className="text-gray-500">QR Code Here</span>
          </div>

          {/* Amount Section */}
          <div className="mt-4 text-lg font-medium text-gray-700 text-center">
            Amount: ₹{amount}
          </div>

          {/* Action Button */}
          <button
            onClick={toggleModal}
            className="w-full mt-6 py-3 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2 focus:outline-none"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRmodal;



