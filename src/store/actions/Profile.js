export const PROFILE_DATA = "PROFILE_DATA";
export const EDIT_BOOKMARK = "EDIT_BOOKMARK";
export const SELECTED_ADDRESS = "SELECTED_ADDRESS";
import { url } from "../../constants/url";

export const getProfileData = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status != 200) {
        throw new Error(responseJson.Error);
      }
      dispatch({
        type: PROFILE_DATA,
        profileData: {
          email: responseJson.details.email,
          username: responseJson.details.name,
          phoneNumber: responseJson.details.phoneNumber,
          id: responseJson.details._id,
          token: responseJson.token,
          imageURL: responseJson.details.imageURL,
          addresses: responseJson.details.location,
          bookmarks: responseJson.details.bookmarks,
          totalAmount: responseJson.details.totalAmount,
          cartProducts: responseJson.details.cartProducts,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.Error);
    }
  };
};

export const getSelectedAddress = (address, coords) => {
  //get current selected address where products are meant to be delivered..
  return async (dispatch) => {
    dispatch({
      type: SELECTED_ADDRESS,
      profileData: {
        address: address,
        coords: coords,
      },
    });
  };
};

export const addBookmark = (id, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user/add-bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: EDIT_BOOKMARK,
        profileData: {
          bookmarks: responseJson.details.bookmarks,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeBookmark = (id, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user/remove-bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: EDIT_BOOKMARK,
        profileData: {
          bookmarks: responseJson.details.bookmarks,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
