import { url } from "../../constants/url";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const EMPTY_CART = "EMPTY_CART";

export const addProduct = (_id, token, qty, isKg) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          productId: _id,
          qty: qty,
          isKg: isKg,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson);

      if (response.status != 200) {
        throw new Error();
      }

      dispatch({
        type: ADD_TO_CART,
        productData: {
          totalAmount: responseJson.totalAmount,
          cartProducts: responseJson.cartProducts,
        },
      });
    } catch (error) {
      throw new Error();
    }
  };
};

export const removeProduct = (_id, token) => {
  return async (dispatch) => {
    try {
      console.log(_id, token);
      const response = await fetch(`${url}/user/remove-from-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          productId: _id,
        }),
      });

      const responseJson = await response.json();
      console.log("LOG");
      console.log(responseJson);

      if (response.status != 200) {
        // throw new Error();
      }
      dispatch({
        type: REMOVE_FROM_CART,
        productData: {
          totalAmount: responseJson.totalAmount,
          cartProducts: responseJson.cartProducts,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
};

export const addProductNoAuth = (_id, cartProducts, totalAmount, qty, isKg) => {
  return async (dispatch) => {
    let total = parseInt(totalAmount);
    try {
      const response = await fetch(`${url}/user/add-to-cart-no-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: _id,
          totalAmount: total,
          cartProducts: cartProducts,
          qty: qty,
          isKg: isKg,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson);

      if (response.status != 200) {
        throw new Error();
      }

      dispatch({
        type: ADD_TO_CART,
        productData: {
          totalAmount: responseJson.totalAmount,
          cartProducts: responseJson.cartProducts,
        },
      });
    } catch (error) {
      throw new Error();
    }
  };
};

export const removeProductNoAuth = (_id, cartProducts, totalAmount) => {
  return async (dispatch) => {
    let total = parseInt(totalAmount);

    try {
      const response = await fetch(`${url}/user/remove-from-cart-no-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: _id,
          cartProducts: cartProducts,
          totalAmount: total,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson);

      if (response.status != 200) {
        throw new Error();
      }
      dispatch({
        type: REMOVE_FROM_CART,
        productData: {
          totalAmount: responseJson.totalAmount,
          cartProducts: responseJson.cartProducts,
        },
      });
    } catch (error) {
      throw new Error();
    }
  };
};

export const emptyCart = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user/empty-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({ type: EMPTY_CART });
    } catch (error) {}
  };
};
