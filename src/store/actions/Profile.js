export const PROFILE_DATA = "PROFILE_DATA";
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
