import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/Flow/Profile/ProfileScreen";
import SettingsScreen from "../../screens/Flow/Profile/Settings/SettingsScreen";
import ChangePasswordScreen from "../../screens/Flow/Profile/Settings/ChangePasswordScreen";
import NewPasswordScreen from "../../screens/Flow/Profile/Settings/NewPasswordScreen";
import PersonalInfoScreen from "../../screens/Flow/Profile/PersonalInfo/PersonalInfoScreen";
import EditProfileScreen from "../../screens/Flow/Profile/PersonalInfo/EditProfileScreen";
import AddressScreen from "../../screens/Flow/Profile/PersonalInfo/AddressScreen";
import AddAddressScreen from "../../screens/Flow/Profile/PersonalInfo/AddAddressScreen";
import SearchLocationsScreen from "../../screens/Flow/Profile/PersonalInfo/SearchLocationsScreen";
const ProfileStackNavigator = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNavigator.Screen name="Profile" component={ProfileScreen} />
      <ProfileStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <ProfileStackNavigator.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <ProfileStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
      <ProfileStackNavigator.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
      />
      <ProfileStackNavigator.Screen name="Address" component={AddressScreen} />
      <ProfileStackNavigator.Screen
        name="AddAddress"
        component={AddAddressScreen}
      />

      <ProfileStackNavigator.Screen
        name="SearchLocations"
        component={SearchLocationsScreen}
      />
      <ProfileStackNavigator.Screen
        name="NewPassword"
        component={NewPasswordScreen}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
