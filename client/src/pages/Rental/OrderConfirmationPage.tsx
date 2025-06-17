import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ShoppingBag, AlertCircle } from 'lucide-react'; // Added ShoppingBag & AlertCircle
import { motion } from 'framer-motion'; // Added framer-motion
import { Order } from '../../types';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Make sure to type `location.state` if you know its shape, or cast safely
  const order = (location.state as { order?: Order })?.order;


  useEffect(() => {
    if (!order) {
      // console.warn("No order data found in location state for OrderConfirmationPage.");
      // Optional: redirect after a delay or show a more permanent error if direct access is not desired.
      // setTimeout(() => navigate('/'), 3000); // Example redirect
    }
  }, [order, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-custom">
        <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">Order Information Not Found</h1>
        <p className="text-gray-500 mb-6">
          This page is typically accessed after a successful checkout.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 font-custom">
      <motion.div // Added motion to the main card for an entry animation
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl max-w-2xl w-full text-center"
      >
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150, delay: 0.2 }}
            className="mb-6"
        >
            <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto" />
        </motion.div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Thank You!</h1>
        <p className="text-lg text-gray-600 mb-6">Your order has been placed successfully.</p>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-left space-y-3 mb-8 border border-gray-200">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-semibold text-gray-700 break-all">{order.id}</span> {/* Added break-all for long IDs */}
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Order Date:</span>
            <span className="font-semibold text-gray-700">{formatDate(order.orderDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Amount:</span>
            <span className="font-semibold text-blue-600">₹{order.totalAmount.toFixed(2)}</span>
          </div>
           <div className="flex justify-between">
            <span className="text-gray-500">Payment Status:</span>
            <span className="font-semibold text-green-600 capitalize">{order.paymentStatus.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="mb-8 text-left"> {/* Aligned to left */}
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Items Ordered:</h3>
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2 border rounded-md p-3 bg-gray-50">
                {order.items.map((item, index) => (
                    <li key={index} className="flex items-center p-3 bg-white border rounded-md text-sm shadow-sm">
                        <img src={item.imageUrl || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 object-cover rounded mr-3"/>
                        <div className="flex-grow">
                            <p className="font-medium text-gray-700">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity} | Price: ₹{item.price.toFixed(2)}</p>
                        </div>
                        <p className="font-semibold text-gray-700 ml-2">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          You will receive an email confirmation shortly with your order details.
          If you have any questions, please contact our support team.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/" // Link to homepage (adjust if your rental home is elsewhere)
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          {/* <Link
            to="/my-orders" // Example path
            className="w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-150 flex items-center justify-center"
          >
            <Package className="w-5 h-5 mr-2" />
            View My Orders
          </Link> */}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;