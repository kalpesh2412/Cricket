import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SearchBar, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default class SearchPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: "",
    };
  }

  updateSearch = (search) => {
    this.setState({ searchBar: search });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ padding: 20, color: "grey" }}>
          {" "}
          You can search player by his/her name{" "}
        </Text>
        <SearchBar
          placeholder="Search by player name"
          onChangeText={this.updateSearch}
          value={this.state.searchBar}
          inputStyle={{ backgroundColor: "white", fontSize: 15 }}
          containerStyle={{
            backgroundColor: "none",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{
            height: 65,
            backgroundColor: "white",
            borderRadius: 5,
            width: "90%",
          }}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
          <View>
            <Text style={{ width: 50, textAlign: "center", color: "grey" }}>
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
        </View>
        <Text style={{ padding: 20, color: "grey", textAlign: "center" }}>
          Do you have player's QR code? If yes, try following.
        </Text>
        <Button
          icon={<Icon name="qrcode" size={25} color="darkred" />}
          type="outline"
          title="  SCAN A CODE"
          titleStyle={{ color: "darkred" }}
          buttonStyle={{ borderColor: "darkred" }}
          raised
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
