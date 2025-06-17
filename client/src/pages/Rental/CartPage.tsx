import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Trash2, ShoppingBag, AlertCircle } from "lucide-react";
import apiService from "../../services/apiService";
import { CartItem } from "../../types"; // Assuming CartItem type is defined in src/types

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null); // For item-specific loading state
  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.get<CartItem[]>("/cart");
      setCartItems(response.data);
    } catch (err: any) {
      console.error("Error fetching cart items:", err);
      setError(err.response?.data?.message || "Failed to load cart items. Please try again.");
      setCartItems([]); // Clear items on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleQuantityChange = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 0) return; // Should be handled by input type="number" min="0"

    setUpdatingItemId(cartItemId);
    try {
      if (newQuantity === 0) {
        // If quantity is 0, remove the item
        await apiService.delete(`/cart/${cartItemId}`);
      } else {
        await apiService.put(`/cart/${cartItemId}`, { quantity: newQuantity });
      }
      await fetchCartItems(); // Re-fetch cart to reflect changes
    } catch (err: any) {
      console.error(`Error updating quantity for item ${cartItemId}:`, err);
      alert(err.response?.data?.message || "Failed to update quantity."); // Simple alert for now
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    setUpdatingItemId(cartItemId);
    try {
      await apiService.delete(`/cart/${cartItemId}`);
      await fetchCartItems(); // Re-fetch cart
    } catch (err: any) {
      console.error(`Error removing item ${cartItemId}:`, err);
      alert(err.response?.data?.message || "Failed to remove item.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true); // Use main loader for checkout process
    try {
      const response = await apiService.post("/orders/checkout");
      // Navigate to an order confirmation page or show success message
      // Pass order details if needed: navigate('/order-confirmation', { state: { order: response.data.order } });
      alert(`Checkout successful! Order ID: ${response.data.order.id}`);
      navigate("/"); // Navigate to homepage or orders page
    } catch (err: any) {
      console.error("Error during checkout:", err);
      setError(err.response?.data?.message || "Checkout failed. Please try again.");
      // Keep isLoading true if error occurs during checkout to prevent multiple clicks,
      // or set it to false and let user retry. For now, set to false.
      setIsLoading(false);
    }
    // setIsLoading(false); // Already handled in finally if error
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (isLoading && cartItems.length === 0 && !error) { // Show full page loader only on initial load
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="ml-4 text-lg">Loading your cart...</p>
      </div>
    );
  }

  if (error && !isLoading) { // Show error only if not also loading something else critical
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <button
          onClick={fetchCartItems}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Try Again"}
        </button>
      </div>
    );
  }

    if (cartItems.length === 0 && !isLoading) { // Ensure not to show if initial load is happening
    return (
      <div className="max-w-4xl mx-auto p-6 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/" 
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalAmount = calculateTotalAmount();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-custom bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center sm:text-left">Your Shopping Cart</h1>
      
      <div className="bg-white shadow-xl rounded-lg">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item.id} className={`p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 ${updatingItemId === item.id ? 'opacity-50 pointer-events-none' : ''}`}>
              <img
                src={item.imageUrl || "https://via.placeholder.com/100"}
                alt={item.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md border border-gray-200"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">Category: {item.category}</p>
                <p className="text-md font-medium text-blue-600">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
                 <div className="flex items-center space-x-2">
                    <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-600 sr-only">Quantity:</label>
                    <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="0" 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                        disabled={updatingItemId === item.id}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={updatingItemId === item.id}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                        aria-label="Remove item"
                    >
                        {updatingItemId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                 </div>
                <p className="text-md font-semibold text-gray-800">
                  Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Total</h2>
            <p className="text-2xl font-bold text-blue-600">₹{totalAmount.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isLoading || cartItems.length === 0} 
            className={`w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150
                        ${(isLoading || cartItems.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading && updatingItemId === null ? ( 
                <Loader2 className="w-5 h-5 mx-auto animate-spin" />
            ) : (
                "Proceed to Checkout"
            )}
          </button>
          {error && updatingItemId === null && !isLoading && ( 
            <p className="text-red-500 text-sm text-center mt-3">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;