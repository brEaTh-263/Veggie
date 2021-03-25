import { GET_ORDERS, ORDER_NOW } from "../actions/Orders";
import { PROFILE_DATA } from "../actions/Profile";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_NOW: {
      return {
        orders: action.orders,
      };
    }
    case PROFILE_DATA: {
      return {
        orders: action.profileData.orders,
      };
    }
    case GET_ORDERS: {
      return {
        orders: action.orders,
      };
    }
    default: {
      return state;
    }
  }
};
