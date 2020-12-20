import { LOG_OUT } from "../actions/Auth";
import {
  CHANGE_IMAGE,
  EDIT_BOOKMARK,
  PROFILE_DATA,
  SELECTED_ADDRESS,
  UPDATE_USERNAME,
  EDIT_ADDRESS,
} from "../actions/Profile";

const initialState = {
  username: "",
  email: "",
  token: "",
  phoneNumber: "",
  locations: [],
  _id: "",
  imageURL: "",
  bookmarks: [],
  selectedLocation: {
    coords: {
      lat: "",
      lng: "",
    },
    address: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_DATA: {
      const { profileData } = action;
      return {
        ...state,
        username: profileData.username,
        email: profileData.email,
        token: profileData.token,
        phoneNumber: `${profileData.phoneNumber}`,
        _id: profileData.id,
        locations: profileData.addresses,
        imageURL: profileData.imageURL,
        bookmarks: profileData.bookmarks,
      };
    }
    case SELECTED_ADDRESS: {
      return {
        ...state,
        selectedLocation: {
          coords: {
            lat: action.profileData.coords.lat,
            lng: action.profileData.coords.lng,
          },
          address: action.profileData.address,
        },
      };
    }
    case EDIT_BOOKMARK: {
      return {
        ...state,
        bookmarks: action.profileData.bookmarks,
      };
    }
    case CHANGE_IMAGE: {
      return {
        ...state,
        imageURL: action.profileData.imageURL,
      };
    }
    case UPDATE_USERNAME: {
      return {
        ...state,
        username: action.profileData.username,
      };
    }
    case EDIT_ADDRESS: {
      const { profileData } = action;
      return {
        ...state,
        locations: profileData.addresses,
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
