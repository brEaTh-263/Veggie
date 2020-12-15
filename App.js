import React from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { Provider as PaperProvider } from "react-native-paper";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import AuthReducer from "./src/store/reducers/Auth";
import ProfileReducer from "./src/store/reducers/Profile";
// import ProductsReducer from "./src/store/reducers/Products";
// import CartReducer from "./src/store/reducers/Cart";
import AppNavigator from "./src/navigator/AppNavigator";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Profile: ProfileReducer,
  // 	Products: ProductsReducer,
  // 	Cart: CartReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
