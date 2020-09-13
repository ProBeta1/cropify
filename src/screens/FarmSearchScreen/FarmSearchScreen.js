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
import { GetCovidInfo } from "../../utilities/GetCovidInfo";

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
  const [covidInfo, setCovidInfo] = useState(null);
  const [activeCases, setActiveCases] = useState(0);

  const onPress = async () => {
    // Google Places API: query: farms, India, $location
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=farms+India+${location}&radius=20000&key=${GCP_API_KEY}
    `
      )
      .then(async (response) => {
        const raw = response.data.results;
        setFarms(raw);
        let coordsList = new Array();
        raw.forEach((data) => {
          const latLng = data.geometry.location;
          const newLatLng = { latitude: latLng.lat, longitude: latLng.lng };
          coordsList.push({
            latlng: newLatLng,
            title: data.name,
            rating: data.rating,
          });
        });
        let firstCoords = coordsList[0].latlng;
        firstCoords.latitudeDelta = 0.05;
        firstCoords.longitudeDelta = 0.05;

        setRegion(firstCoords);
        setCoords(coordsList);

        // Get covid info of the location
        const result = await GetCovidInfo(location);
        if (result.msg === "ok") {
          setActiveCases(result.active);
          setCovidInfo(result.covidInfo);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ScrollView>
      <Text style={{ fontSize: 30, margin: 10 }}>Search for a farm</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 3, margin: 5, padding: 10, width: '85%' }}
          onChangeText={(text) => setLocation(text)}
          placeholder="Enter a location"
          value={location}
        />
        <TouchableOpacity onPress={onPress} style={{ alignSelf: 'center', marginLeft: 10 }}>
          <Ionicons name="ios-search" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {covidInfo && (
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 18 }}>District: {location}</Text>
          <Text style={{ fontSize: 18 }}>Total Population: {covidInfo.meta.population}</Text>
          <Text style={{ fontSize: 18 }}>Active Covid Cases: {activeCases}</Text>
          {/* <Text>Today's confirmed cases: {covidInfo.delta.confirmed}</Text> */}
        </View>
      )}
      <View >
        <MapView
          style={{ width: Dimensions.get("window").width, height: 300 }}
          region={region}
          provider="google"
        >
          {coords &&
            coords.map((coord, i) => (
              <Marker
                key={i}
                coordinate={coord.latlng}
                title={coord.title}
                description={`Google Rating: ${coord.rating.toString()}/5`}
              />
            ))}
        </MapView>
      </View>
    </ScrollView>
  );
};

export default FarmSearchScreen;

const styles = StyleSheet.create({});
