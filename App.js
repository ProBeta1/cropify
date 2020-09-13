import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  AddItemScreen,
  FarmSearchScreen,
  LocationSearchScreen,
} from "./src/screens";
import { decode, encode } from "base-64";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { firebase } from "./src/firebase/config";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="AddItem">
              {(props) => <AddItemScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="BuyItem">
              {(props) => <SearchScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="FarmSearch">
              {(props) => <FarmSearchScreen {...props} extraData={user} />}
            <Stack.Screen name="LocationSearch">
              {(props) => <LocationSearchScreen {...props} extraData={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
});

export default App;
