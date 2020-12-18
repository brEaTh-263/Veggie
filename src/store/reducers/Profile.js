import {
  EDIT_BOOKMARK,
  PROFILE_DATA,
  SELECTED_ADDRESS,
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
    default: {
      return state;
    }
  }
};
