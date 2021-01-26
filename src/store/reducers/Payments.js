import { ORDER_NOW } from "../actions/Orders";
import { ADD_CARD, GET_PAYMENT_METHOD } from "../actions/Payments";
import { PROFILE_DATA } from "../actions/Profile";

const initialState = {
  cardDetails: [],
  paymentMethod: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      return {
        ...state,
        cardDetails: action.details,
      };
    }
    case PROFILE_DATA: {
      return {
        ...state,
        cardDetails: action.profileData.cards,
      };
    }
    case GET_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.profileData.method,
      };
    }
    case ORDER_NOW: {
      return {
        ...state,
        paymentMethod: "",
      };
    }

    default: {
      return state;
    }
  }
};
