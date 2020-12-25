import { LOG_OUT } from "../actions/Auth";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/Cart";
import {
  ADD_TOKEN_AND_CART_PROFILE_DETAILS,
  PROFILE_DATA,
} from "../actions/Profile";

const initialState = {
  cartProducts: [],
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { productData } = action;

      return {
        cartProducts: productData.cartProducts,
        totalAmount: productData.totalAmount,
      };
    }
    case REMOVE_FROM_CART: {
      const { productData } = action;

      return {
        cartProducts: productData.cartProducts,
        totalAmount: productData.totalAmount,
      };
    }
    case PROFILE_DATA: {
      //getting cart details from database
      return {
        cartProducts: action.profileData.cartProducts,
        totalAmount: action.profileData.totalAmount,
      };
    }
    case ADD_TOKEN_AND_CART_PROFILE_DETAILS: {
      return {
        cartProducts: action.profileData.cartProducts,
        totalAmount: action.profileData.totalAmount,
      };
    }
    case LOG_OUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
