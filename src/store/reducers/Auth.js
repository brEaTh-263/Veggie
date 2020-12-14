import { DID_TRY_AUTO_AL, SIGN_UP_DEFAULT } from "../actions/Auth";
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

    default: {
      return state;
    }
  }
};
