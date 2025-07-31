import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPay = ({ bookingData, onClose }) => {
  const navigate = useNavigate();
  const [isPrinting, setIsPrinting] = useState(false);

  const generateTransactionId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const transactionId = generateTransactionId();

  const handleViewAllBookings = () => {
    navigate("/profile");
    onClose();
  };

  const handlePrintReceipt = () => {
    setIsPrinting(true);

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Booking Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #0A6ADA; padding-bottom: 10px; margin-bottom: 20px; }
            .receipt { max-width: 600px; margin: 0 auto; }
            .section { margin-bottom: 20px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .total { border-top: 2px solid #0A6ADA; padding-top: 10px; font-weight: bold; font-size: 18px; }
            .transaction-id { background: #f0f0f0; padding: 10px; border-radius: 5px; margin: 10px 0; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>Hotel Booking Receipt</h1>
              <p>Transaction ID: ${transactionId}</p>
              <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="section">
              <h3>Guest Information</h3>
              <div class="row">
                <span>Name:</span>
                <span>${bookingData.title} ${bookingData.firstName} ${
      bookingData.lastName
    }</span>
              </div>
              <div class="row">
                <span>Email:</span>
                <span>${bookingData.email}</span>
              </div>
              <div class="row">
                <span>Mobile:</span>
                <span>${bookingData.mobile}</span>
              </div>
              <div class="row">
                <span>Country:</span>
                <span>${bookingData.country}</span>
              </div>
            </div>

            <div class="section">
              <h3>Booking Details</h3>
              <div class="row">
                <span>Hotel:</span>
                <span>${bookingData.hotelName}</span>
              </div>
              <div class="row">
                <span>Check-in:</span>
                <span>${new Date(
                  bookingData.checkIn
                ).toLocaleDateString()}</span>
              </div>
              <div class="row">
                <span>Check-out:</span>
                <span>${new Date(
                  bookingData.checkOut
                ).toLocaleDateString()}</span>
              </div>
              <div class="row">
                <span>Nights:</span>
                <span>${bookingData.nights}</span>
              </div>
            </div>

            <div class="section">
              <h3>Payment Details</h3>
              <div class="row">
                <span>Card Number:</span>
                <span>**** **** **** ${bookingData.cardNumber.slice(-4)}</span>
              </div>
              <div class="row">
                <span>Card Holder:</span>
                <span>${bookingData.cardHolder}</span>
              </div>
            </div>

            <div class="section">
              <h3>Pricing</h3>
              <div class="row">
                <span>Price per night:</span>
                <span>$${bookingData.pricePerNight}</span>
              </div>
              <div class="row">
                <span>Number of nights:</span>
                <span>${bookingData.nights}</span>
              </div>
              <div class="row total">
                <span>Total Amount:</span>
                <span>$${bookingData.totalPrice}</span>
              </div>
            </div>

            <div class="transaction-id">
              <strong>Transaction ID: ${transactionId}</strong>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #666;">
              <p>Thank you for choosing our hotel!</p>
              <p>Your booking has been confirmed.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.documentElement.innerHTML = printContent;
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    setIsPrinting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Success!
          </h2>
          <p className="text-gray-600">
            Your payment has been processed successfully
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
            <p className="font-mono font-bold text-blue-600 text-lg">
              {transactionId}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-gray-800">Booking Summary</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Hotel:</span>
              <span className="font-medium">{bookingData.hotelName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-medium">
                {new Date(bookingData.checkIn).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-medium">
                {new Date(bookingData.checkOut).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Nights:</span>
              <span className="font-medium">{bookingData.nights}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-bold text-blue-600">
                ${bookingData.totalPrice}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-gray-800">Guest Information</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">
                {bookingData.title} {bookingData.firstName}{" "}
                {bookingData.lastName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{bookingData.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Mobile:</span>
              <span className="font-medium">{bookingData.mobile}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleViewAllBookings}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            View All Bookings
          </button>

          <button
            onClick={handlePrintReceipt}
            disabled={isPrinting}
            className="w-full bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-200 disabled:opacity-50"
          >
            {isPrinting ? "Printing..." : "Print Receipt"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPay;
