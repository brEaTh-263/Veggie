import { url } from "../../constants/url";
export const SIGN_UP_DEFAULT = "SIGN_UP_DEFAULT";
export const DID_TRY_AUTO_AL = "DID_TRY_AUTO_AL";
export const LOG_OUT = "LOG_OUT";
export const GET_PHONENUMBER_FROM_EMAIL_SEND_OTP =
  "GET_PHONENUMER_FROM_EMAIL_SEND_OTP";
export const VERIFY_OTP = "VERIFY_OTP";
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

export const getPhoneNumberFromEmail = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/Auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status != 200) {
        throw new Error();
      }
      dispatch({
        type: GET_PHONENUMBER_FROM_EMAIL_SEND_OTP,
        profileData: {
          phoneNumber: responseJson.profileDetails.phoneNumber,
          email: responseJson.profileDetails.email,
        },
      });
    } catch (error) {
      // console.log(error);
      throw new Error();
    }
  };
};

export const verifyOTP = (code, email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/Auth/verify-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          email: email,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status != 200) {
        throw new Error();
      }
      dispatch({
        type: VERIFY_OTP,
        authData: responseJson.token,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Invalid OTP");
    }
  };
};

export const newPassword = (password, token) => {
  //DIFFERENCE in profile and auth newPassword action DISPATCHED FOR LOGIN IN AUTH
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          password: password,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status != 200) {
        throw new Error();
      }
      dispatch({
        type: SIGN_UP_DEFAULT,
        authData: {
          token: responseJson.token,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
};
