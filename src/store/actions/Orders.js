import { url } from "../../constants/url";
export const ORDER_NOW = "ORDER_NOW";
export const GET_ORDERS = "GET_ORDERS";
export const orderNow = (token, paymentMethod, lat, lng, address) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/user/order-now`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        paymentMethod: paymentMethod,
        lat: lat,
        lng: lng,
        address: address,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status != 200) {
      throw new Error();
    }
    dispatch({ type: ORDER_NOW, orders: responseJson.allOrders });
  };
};

export const getAllOrders = (token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/user/get-all-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status != 200) {
      throw new Error();
    }
    dispatch({ type: GET_ORDERS, orders: responseJson.allOrders });
  };
};
