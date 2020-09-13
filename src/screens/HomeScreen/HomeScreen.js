import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../HomeScreen/styles";

export default function HomeScreen(props) {
  const user = props.extraData;

  const onAddLinkPress = () => {
    props.navigation.navigate("AddItem");
  };

  const onBuyLinkPress = () => {
    props.navigation.navigate("BuyItem");
  };

  return (
    <View>
      <View style={styles.headerView}>
        <Text style={styles.headText}>
          Hey {user.fullName}, welcome to Cropify!
        </Text>
      </View>

      <View style={styles.Box}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("FarmSearch")}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/pastel-glyph/2x/search--v2.png",
            }}
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <Text style={[styles.text]}>Search for a nearby farm</Text>
      </View>

      <View style={styles.Box}>
        <TouchableOpacity onPress={onAddLinkPress}>
          <Image
            source={{
              uri:
                "https://cdn.iconscout.com/icon/premium/png-512-thumb/sell-13-736060.png",
            }}
            style={styles.sellIcon}
          />
        </TouchableOpacity>

        <Text style={styles.text}>Got stuff to sell ? Add Here</Text>
      </View>

      <View style={styles.Box}>
        <TouchableOpacity onPress={onBuyLinkPress}>
          <Image
            source={{
              uri:
                "https://cdn.iconscout.com/icon/premium/png-512-thumb/buy-now-5-622218.png",
            }}
            style={styles.buyIcon}
          />
        </TouchableOpacity>

        <Text style={styles.text}>Wanna buy something ?</Text>
      </View>
    </View>
  );
}
