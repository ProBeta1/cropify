import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { firebase } from "../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { allDistricts } from "../../utilities/IndianDistrict";

const AddItemDetailScreen = (props) => {
  const { navigation, route } = props;
  const { imageUrl } = route.params;
  const [dropdown, setDropDown] = useState(null);

  const handleAdded = () => {
    Alert.alert(item.itemName + " succesfully added :)");
    navigation.navigate("Home");
  };

  const searchFilterFunction = (text) => {
    const newData = allDistricts.filter((item) => {
      const itemData = `${item.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setDropDown(newData);
  };

  const [item, setItem] = useState({
    itemName: "",
    price: "",
    farmName: "",
    farmLocation: "",
    imageUrl: imageUrl,
  });
  return (
    <View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <Text style={{ margin: 20, fontSize: 20, fontWeight: "bold" }}>
          Add the Details
        </Text>
        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: "black",
              borderWidth: 2,
              margin: 20,
              padding: 10,
              fontSize: 16,
            }}
            onChangeText={(text) => setItem({ ...item, itemName: text })}
            value={item.itemName}
            placeholder="Item name"
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "black",
              borderWidth: 2,
              margin: 20,
              padding: 10,
              fontSize: 16,
            }}
            onChangeText={(text) => setItem({ ...item, price: text })}
            value={item.price}
            placeholder="Price"
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "black",
              borderWidth: 2,
              margin: 20,
              padding: 10,
              fontSize: 16,
            }}
            onChangeText={(text) => setItem({ ...item, farmName: text })}
            value={item.farmName}
            placeholder="Farm name"
          />
          <TextInput
            style={{
              height: 40,
              borderColor: "black",
              borderWidth: 2,
              margin: 20,
              padding: 10,
              fontSize: 16,
            }}
            onChangeText={(text) => {
              setItem({ ...item, farmLocation: text });
              searchFilterFunction(text);
            }}
            value={item.farmLocation}
            placeholder="Farm location"
          />
          <Text style={{ fontSize: 12 }}>Recommended locations</Text>

          <View
            style={{
              minHeight: 50,
              maxHeight: 150,
              borderWidth: 2,
              borderColor: "black",
            }}
          >
            <FlatList
              data={dropdown}
              renderItem={({ item, index }) => (
                <Text
                  key={index}
                  style={{ paddingVertical: 5, paddingLeft: 10 }}
                >
                  {item}
                </Text>
              )}
              style={{ maxHeight: 150, borderColor: "black", borderWidth: 2 }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={{ margin: 20, padding: 30 }}>
            <Button
              title="Sell It"
              color="#3d348b"
              onPress={() => {
                const price = parseFloat(item.price);
                const { itemName, farmName, farmLocation, imageUrl } = item;
                let newItem = {
                  itemName,
                  price,
                  farmName,
                  farmLocation,
                  imageUrl,
                };

                console.log(newItem);

                // Add item to firestore
                const db = firebase.firestore();
                db.collection("items")
                  .add(newItem)
                  .then((docRef) => {
                    //console.log("Item added: ", docRef.id);
                    handleAdded();
                  })
                  .catch((err) => console.log(`Cannot add item: ${err}`));

                // setTimeout(() => {
                // }, 1000);
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddItemDetailScreen;

const styles = StyleSheet.create({});
