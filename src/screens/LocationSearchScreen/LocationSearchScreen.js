import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GetCovidInfo } from "../../utilities/GetCovidInfo";

const LocationSearchScreen = () => {
  const [location, onChangeLocation] = useState("");
  const [covidInfo, setCovidInfo] = useState(null);
  const [activeCases, setActiveCases] = useState(0);

  const onPress = async () => {
    const result = await GetCovidInfo(location);
    if (result.msg === "ok") {
      setActiveCases(result.active);
      setCovidInfo(result.covidInfo);
      console.log(result.covidInfo);
    }
  };

  return (
    <ScrollView>
      <Text>Enter a location:</Text>
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => onChangeLocation(text)}
          placeholder="Enter a location"
          value={location}
        />
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="ios-search" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {covidInfo && (
        <View>
          <Text>Population: {covidInfo.meta.population}</Text>
          <Text>Active Cases: {activeCases}</Text>
          <Text>Today's confirmed cases: {covidInfo.delta.confirmed}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default LocationSearchScreen;

const styles = StyleSheet.create({});
