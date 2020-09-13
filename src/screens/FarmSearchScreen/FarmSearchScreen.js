import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

// cropify project
const GCP_API_KEY = "AIzaSyDg3QleDVQIZMBzAHylCxsPaZLf1eSQXSE";

const FarmSearchScreen = () => {
  const [location, setLocation] = useState("Pune");
  const [farms, setFarms] = useState(null);
  const [coords, setCoords] = useState(null);
  const [region, setRegion] = useState({
    latitude: 18.5169498,
    longitude: 73.8340955,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const onPress = () => {
    // Google Places API
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=farms+India+${location}&radius=20000&key=${GCP_API_KEY}
    `
      )
      .then((response) => {
        const raw = response.data.results;
        setFarms(raw);
        let coordsList = new Array();
        console.log(raw[1]);
        raw.forEach((data) => {
          const latLng = data.geometry.location;
          const newLatLng = { latitude: latLng.lat, longitude: latLng.lng };
          coordsList.push({
            latlng: newLatLng,
            title: data.name,
            rating: data.rating,
          });
        });
        console.log(coordsList);
        setCoords(coordsList);
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
      {/* <View>
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
      </View> */}
      <View>
        <MapView
          style={{ width: Dimensions.get("window").width, height: 300 }}
          region={region}
          // maxZoomLevel={4}
          // initialRegion={{
          //   latitude: 12.8677572,
          //   longitude: 74.899232,
          //   latitudeDelta: 2,
          //   longitudeDelta: 0.0421,
          // }}
          provider="google"
        >
          {coords &&
            coords.map((coord, i) => (
              <Marker
                key={i}
                coordinate={coord.latlng}
                title={coord.title}
                description={`Rating: ${coord.rating.toString()}/5`}
              />
            ))}
        </MapView>
      </View>
    </ScrollView>
  );
};

export default FarmSearchScreen;

const styles = StyleSheet.create({});
