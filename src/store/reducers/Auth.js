// import {
//   SIGN_UP_DEFAULT,
//   LOG_OUT,
//   SIGN_UP_OAUTH,
//   DID_TRY_AUTO_AL,
//   OTP_VERIFIED,
// } from "../actions/Auth";
// import AsyncStorage from "@react-native-community/async-storage";
const initialState = {
  oAuth: false,
  token: "",
  didTryAutoLogin: false,
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case SIGN_UP_DEFAULT: {
    //   AsyncStorage.setItem("tokenId", action.authData.token);

    //   return {
    //     ...state,
    //     isAuth: true,
    //     token: action.authData.token,
    //   };
    // }
    // case SIGN_UP_OAUTH: {
    //   // AsyncStorage.setItem("tokenId", action.authData.token);
    //   return {
    //     ...state,
    //     token: action.authData.token,
    //     oAuth: true,
    //     isAuth: true,
    //   };
    // }
    // case DID_TRY_AUTO_AL: {
    //   return {
    //     ...state,
    //     didTryAutoLogin: true,
    //   };
    // }
    // case LOG_OUT: {
    //   AsyncStorage.removeItem("tokenId");

    //   return initialState;
    // }
    // case OTP_VERIFIED: {
    //   return {
    //     ...state,
    //     token: action.authData,
    //   };
    // }
    default: {
      return state;
    }
  }
};
