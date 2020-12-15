import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/Flow/Profile/ProfileScreen";
// import SettingsScreen from "../screens/Profile/Settings/SettingsScreen";
// import ChangePasswordScreen from "../screens/Profile/Settings/ChangePasswordScreen";
// import PersonalInfoScreen from "../screens/Profile/PersonalInfoScreen";
// import EditProfileScreen from "../screens/Profile/PersonalInfo/EditProfileScreen";
// import PhoneNumberScreen from "../screens/Profile/PersonalInfo/PhoneNumberScreen";
// import OTPScreen from "../screens/Profile/OTPScreen";
// import AddAddressScreen from "../screens/Profile/PersonalInfo/AddAddressScreen";
// import SearchLocationsScreen from "../screens/Profile/PersonalInfo/SearchLocationsScreen";
// import AddressScreen from "../screens/Profile/PersonalInfo/AddressScreen";
// import NewPasswordScreen from "../screens/Profile/Settings/NewPasswordScreen";
const ProfileStackNavigator = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNavigator.Screen name="Profile" component={ProfileScreen} />
      {/* <ProfileStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <ProfileStackNavigator.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <ProfileStackNavigator.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
      />
      <ProfileStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
      <ProfileStackNavigator.Screen
        name="PhoneNumber"
        component={PhoneNumberScreen}
      />
      <ProfileStackNavigator.Screen name="OTP" component={OTPScreen} />
      <ProfileStackNavigator.Screen
        name="AddAddress"
        component={AddAddressScreen}
      />
      <ProfileStackNavigator.Screen
        name="SearchLocations"
        component={SearchLocationsScreen}
      />
      <ProfileStackNavigator.Screen name="Address" component={AddressScreen} />
      <ProfileStackNavigator.Screen
        name="NewPassword"
        component={NewPasswordScreen}
      /> */}
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
