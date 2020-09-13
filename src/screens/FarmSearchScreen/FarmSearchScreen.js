import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

// cropify project
const GCP_API_KEY = "AIzaSyDg3QleDVQIZMBzAHylCxsPaZLf1eSQXSE";

const FarmSearchScreen = () => {
  const [location, setLocation] = useState("");
  const [farms, setFarms] = useState(null);

  const onPress = () => {
    // Google Places API
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=farms+India+${location}&radius=30000&key=${GCP_API_KEY}
    `
      )
      .then((response) => {
        const raw = response.data.results;
        setFarms(raw);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ScrollView>
      <Text>Farm Search</Text>
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setLocation(text)}
          placeholder="Enter a location"
          value={location}
        />
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="ios-search" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        {farms &&
          farms.map((farm, i) => {
            return (
              <View key={i} style={{ marginBottom: 10 }}>
                <Text>{farm.name}</Text>
                <Text>{farm.formatted_address}</Text>
                <Text>Rating: {farm.rating}/5</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default FarmSearchScreen;

const styles = StyleSheet.create({});
