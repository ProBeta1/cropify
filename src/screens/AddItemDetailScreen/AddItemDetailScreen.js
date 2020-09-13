import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { firebase } from "../../firebase/config";

const AddItemDetailScreen = (props) => {
  const { navigation, route } = props;
  const { imageUrl } = route.params;
  const [item, setItem] = useState({
    itemName: "",
    price: "",
    farmName: "",
    farmLocation: "",
    imageUrl: imageUrl,
  });
  return (
    <View>
      <Text>Add more details of the item</Text>
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setItem({ ...item, itemName: text })}
          value={item.itemName}
          placeholder="Name"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setItem({ ...item, price: text })}
          value={item.price}
          placeholder="Price"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setItem({ ...item, farmName: text })}
          value={item.farmName}
          placeholder="Farm name"
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setItem({ ...item, farmLocation: text })}
          value={item.farmLocation}
          placeholder="Farm location"
        />
        <Button
          title="Add item to Cropify!"
          onPress={() => {
            const price = parseFloat(item.price);
            const { itemName, farmName, farmLocation, imageUrl } = item;
            let newItem = { itemName, price, farmName, farmLocation, imageUrl };

            console.log(newItem);
            // setTimeout(() => {
            // }, 1000);
          }}
        />
      </View>
    </View>
  );
};

export default AddItemDetailScreen;

const styles = StyleSheet.create({});
