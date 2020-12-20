export const PROFILE_DATA = "PROFILE_DATA";
export const EDIT_BOOKMARK = "EDIT_BOOKMARK";
export const SELECTED_ADDRESS = "SELECTED_ADDRESS";
export const CHANGE_IMAGE = "CHANGE_IMAGE";
import { url } from "../../constants/url";
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const ADD_ADDRESS = "ADD_ADDRESS";

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

export const checkValidityOfPassword = (password, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user/check-validity-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          password: password,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status !== 200) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
};

export const newPassword = (password, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/auth/new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          password: password,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status != 200) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
};

export const changeImage = (file, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/images/image-upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
        body: file,
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status != 200) {
        throw new Error();
      }
      dispatch({
        type: CHANGE_IMAGE,
        profileData: {
          imageURL: responseJson.details.imageURL,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
};

export const updateUsername = (name, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user/edit-username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          userName: name,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);

      if (response.status != 200) {
        throw new Error(responseJson.Error);
      }
      dispatch({
        type: UPDATE_USERNAME,
        profileData: {
          username: responseJson.details.name,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.Error);
    }
  };
};

export const addAddress = (address, token, lat, lng) => {
  return async (dispatch) => {
    try {
      console.log(address, token, lat, lng);
      const response = await fetch(`${url}/user/add-address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          address: address,
          latitude: lat,
          longitude: lng,
        }),
      });
      const responseJson = await response.json();
      if (response.status != 200) {
        throw new Error(responseJson.Error);
      }
      dispatch({
        type: ADD_ADDRESS,
        profileData: {
          addresses: responseJson.allLocations,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
};
