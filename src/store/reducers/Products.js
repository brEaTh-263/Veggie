import { GET_ALL_PRODUCTS } from "../actions/Products";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      return {
        products: action.data,
      };
    }

    default: {
      return state;
    }
  }
};
