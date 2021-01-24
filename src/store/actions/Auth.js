import { url } from "../../constants/url";
export const SIGN_UP_DEFAULT = "SIGN_UP_DEFAULT";
export const DID_TRY_AUTO_AL = "DID_TRY_AUTO_AL";
export const LOG_OUT = "LOG_OUT";
export const SKIP_AUTHENTICATION = "SKIP_AUTHENTICATION";
export const CONTINUE_WITH_AUTHENTICATION = "CONTINUE_WITH_AUTHENTICATION";

export const signInUsingPhoneNumber = (phoneNumber) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/signup-phonenumber`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status != 200) {
        throw new Error();
      }
    } catch (error) {
      throw new Error();
    }
  };
};

export const skipAuthentication = () => {
  return async (dispatch) => {
    dispatch({ type: SKIP_AUTHENTICATION });
  };
};

export const continueWithAuthentication = () => {
  return async (dispatch) => {
    dispatch({ type: CONTINUE_WITH_AUTHENTICATION });
  };
};

export const verifyPhoneNumberForPhoneNumberSignIn = (code, phoneNumber) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/authenticate-phonenumber`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          phoneNumber,
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
      throw new Error();
    }
  };
};

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

export const signInEmail = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/signIn-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }

      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      throw new Error();
    }
  };
};

export const signUpEmail = (email, name) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/signUp-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }

      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      throw new Error();
    }
  };
};

export const authenticateSignUpEmail = (email, code, name) => {
  return async (dispatch) => {
    console.log(name);
    try {
      const response = await fetch(`${url}/auth/authenticate-signUp-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          code,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }

      const responseJson = await response.json();
      console.log(responseJson);

      dispatch({
        type: SIGN_UP_DEFAULT,
        authData: {
          token: responseJson.token,
        },
      });
    } catch (error) {
      throw new Error();
    }
  };
};

export const authenticateSignInEmail = (email, code) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/authenticate-signIn-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });
      if (response.status != 200) {
        throw new Error();
      }

      const responseJson = await response.json();
      console.log(responseJson);

      dispatch({
        type: SIGN_UP_DEFAULT,
        authData: {
          token: responseJson.token,
        },
      });
    } catch (error) {
      throw new Error();
    }
  };
};

export const log_out = () => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT });
  };
};
