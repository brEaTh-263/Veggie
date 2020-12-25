import {
  CONTINUE_WITH_AUTHENTICATION,
  DID_TRY_AUTO_AL,
  LOG_OUT,
  SIGN_UP_DEFAULT,
  SKIP_AUTHENTICATION,
} from "../actions/Auth";
import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
  oAuth: false,
  token: "",
  didTryAutoLogin: false,
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_DEFAULT: {
      AsyncStorage.setItem("tokenId", action.authData.token);

      return {
        ...state,
        isAuth: true,
        token: action.authData.token,
      };
    }
    case DID_TRY_AUTO_AL: {
      return {
        ...state,
        didTryAutoLogin: true,
      };
    }
    case LOG_OUT: {
      AsyncStorage.removeItem("tokenId");

      return initialState;
    }
    case SKIP_AUTHENTICATION: {
      return {
        ...state,
        isAuth: true,
      };
    }

    case CONTINUE_WITH_AUTHENTICATION: {
      return {
        ...state,
        isAuth: false,
      };
    }

    default: {
      return state;
    }
  }
};
