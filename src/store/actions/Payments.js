import { url } from "../../constants/url";
export const ADD_CARD = "ADD_CARD";
export const GET_PAYMENT_METHOD = "GE_PAYMENT_METHOD";

export const addCard = (
  cardName,
  cardNumber,
  expiryDate,
  nickname,
  type = "Visa",
  token
) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/user/add-card`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        cardName,
        cardNumber,
        expiryDate,
        nickname,
        type,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);

    dispatch({ type: ADD_CARD, details: responseJson.cardDetails });
  };
};

export const editCardNickName = (cardId, nickname, token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/user/edit-nickname-card`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        cardId,
        nickname,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    dispatch({ type: ADD_CARD, details: responseJson.cardDetails });
  };
};

export const deleteCard = (cardId, token) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/user/delete-card`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        cardId,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    dispatch({ type: ADD_CARD, details: responseJson.cardDetails });
  };
};

export const getPaymentMethod = (method) => {
  return async (dispatch) => {
    dispatch({
      type: GET_PAYMENT_METHOD,
      profileData: {
        method,
      },
    });
  };
};
