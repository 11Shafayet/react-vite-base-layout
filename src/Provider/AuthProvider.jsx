/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [user, setUser] = useState(null);
  const [checkoutData, setCheckoutData] = useState({});
  const [discountPrice, setDiscountPrice] = useState(null);

  const addToCart = (data) => {
    const itemExist = cartItems.some((item) => item.id === data.id);

    if (itemExist) {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === data.id) {
            return { ...item, quantity: data.quantity + item.quantity };
          }
          return item;
        })
      );
    } else {
      setCartItems((prev) => [...prev, data]);
    }
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const updateCart = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const fetchCartItems = async () => {
    const itemsList = JSON.parse(localStorage.getItem('cartItems'));
    return itemsList || [];
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const userData = localStorage.getItem('user');

    if (userData) {
      let parsedData = JSON.parse(userData);
      setUser(parsedData);
    }
  };

  // setting up popup
  useEffect(() => {
    if (!user) {
      localStorage.setItem('popupShown', 'false');
    } else {
      localStorage.setItem('popupShown', 'true');
    }
  }, [[], user]);

  const authInfo = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCart,
    fetchCartItems,

    user,
    setUser,
    fetchUserData,

    checkoutData,
    setCheckoutData,

    discountPrice,
    setDiscountPrice,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.any,
};
