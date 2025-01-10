import React, { useState } from "react";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=LCD+Monitor",
    },
    {
      id: 2,
      name: "HI Gamepad",
      price: 550,
      quantity: 2,
      image: "https://via.placeholder.com/100x100?text=Gamepad",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCouponApply = () => {
    alert(`Coupon "${couponCode}" applied!`);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty!</p>
          <button
            onClick={() => alert("Redirecting to shop...")}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4">Product</th>
                  <th className="text-center p-4">Price</th>
                  <th className="text-center p-4">Quantity</th>
                  <th className="text-center p-4">Subtotal</th>
                  <th className="text-center p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md mr-4"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="text-center p-4">₹{item.price}</td>
                    <td className="text-center p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                        >
                          <span>-</span>
                        </button>
                        <span className="px-4 py-2 border border-gray-300 rounded">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                        >
                          <span>+</span>
                        </button>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      ₹{item.price * item.quantity}
                    </td>
                    <td className="text-center p-4">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="flex flex-col md:flex-row justify-between mt-8">
            {/* Coupon Section */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-lg font-bold mb-4">Apply Coupon</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border border-gray-300 rounded-md w-full p-2"
                />
                <button
                  onClick={handleCouponApply}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Cart Total Section */}
            <div className="border border-gray-300 rounded-md p-6 md:w-1/3">
              <h2 className="text-lg font-bold mb-4 text-center">Cart Total</h2>
              <div className="flex justify-between mb-4">
                <span>Subtotal:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-xl mb-4">
                <span>Total:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
