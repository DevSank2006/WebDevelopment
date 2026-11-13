const CART_KEY = 'cartItems';

export const getCartItems = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const addToCart = (product) => {
  const cartItems = getCartItems();

  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  let updatedCart;

  if (existingItem) {
    updatedCart = cartItems.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [
      ...cartItems,
      { ...product, quantity: 1 },
    ];
  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(updatedCart)
  );

  return updatedCart;
};