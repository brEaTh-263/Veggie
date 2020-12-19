import { url } from "../../constants/url";
export const SIGN_UP_DEFAULT = "SIGN_UP_DEFAULT";
export const DID_TRY_AUTO_AL = "DID_TRY_AUTO_AL";
export const LOG_OUT = "LOG_OUT";
export const setDidTryAutoLogin = () => {
  return async (dispatch) => {
    dispatch({ type: DID_TRY_AUTO_AL });
  };
};

export const autoLogIn = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/autoLogIn`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      const responseJson = await response.json();
      // console.log(responseJson);
      if (response.status != 200) {
        throw new Error(responseJson.Error);
      }
      dispatch({
        type: SIGN_UP_DEFAULT,
        authData: {
          token: responseJson.tokenId,
        },
      });
    } catch (error) {
      throw new Error();
    }
  };
};

export const signUpDefault = (username, email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status != 200) {
        throw new Error(responseJson.Error);
      }
      dispatch({
        type: SIGN_UP_DEFAULT,
        authData: {
          token: responseJson.tokenId,
        },
      });
    } catch (err) {
      throw new Error(err.Error);
    }
  };
};

export const signInDefault = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const responseJson = await response.json();
      if (response.status !== 200) {
        throw new Error(responseJson.Error);
      }
      dispatch({
        type: SIGN_UP_DEFAULT,
        authData: {
          token: responseJson.tokenId,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.Error);
    }
  };
};

export const log_out = () => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT });
  };
};
