import { useCallback, useEffect, useState } from "react";
import { cartApi } from "../services/api.js";

export function useCart() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const refresh = useCallback(async () => {
    try {
      const data = await cartApi.get();
      setCount(data.count);
    } catch {
      /* cart badge can recover on next request */
    }
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  const add = async (id) => {
    const data = await cartApi.add(id);
    setCount(data.count);
    setMessage(data.message);
    window.dispatchEvent(
      new CustomEvent("cart-message", {
        detail: { message: data.message, count: data.count },
      }),
    );
    window.setTimeout(() => setMessage(""), 2600);
    return data;
  };
  useEffect(() => {
    const handler = (event) => setCount(event.detail.count);
    window.addEventListener("cart-message", handler);
    return () => window.removeEventListener("cart-message", handler);
  }, []);
  return { count, message, add };
}
