import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { cartApi } from "../services/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart from Spring Boot
  const loadCart = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await cartApi.get();
      setItems(response.items || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load cart"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cart when provider mounts
  useEffect(() => {
    loadCart();

    // Reload cart after login/logout in this tab
    const handleAuthChange = () => loadCart();

    // Reload when another tab changes authentication
    const handleStorageChange = () => loadCart();

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadCart]);

  // Add package
  const addToCart = async (serviceId, quantity = 1) => {
    if (!localStorage.getItem("token")) {
      throw new Error("Please login first");
    }

    const response = await cartApi.add(serviceId, quantity);
    setItems(response.items || []);

    return response;
  };

  // Update quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const response = await cartApi.update(itemId, newQuantity);
    setItems(response.items || []);
  };

  // Remove package
  const remove = async (itemId) => {
    try {
      const response = await cartApi.remove(itemId);

      // Use updated cart returned by backend when available
      if (response?.items) {
        setItems(response.items);
      } else {
        setItems((previousItems) =>
          previousItems.filter((item) => item.id !== itemId)
        );
      }
    } catch (err) {
      console.error("Failed to remove cart item:", err);
      throw err;
    }
  };

  // Clear cart
 const clearCart = async () => {
  try {
    await cartApi.clear();
    setItems([]);
    setError(null);
  } catch (err) {
    console.error("Failed to clear cart:", err);
    throw err;
  }
};

  const count = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        loading,
        error,
        add: addToCart,
        update: updateQuantity,
        delete: remove,
        clear: clearCart,
        addToCart,
        updateQuantity,
        remove,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Access shared cart state from any component
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}