import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Avatar, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default class CreatePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerDetails: [
        {
          playerName: props.playerName,
          playerContactNumber: props.playerContactNumber,
        },
        props.playerObject,
      ],
      contactNo: "",
      index: props.ind,
    };
  }

  handleNameText(idx, e) {
    const newPlayerDetails = this.state.playerDetails.map((player, pidx) => {
      if (idx !== pidx) return player;
      return { ...player, playerName: e };
    });
    this.setState({ playerDetails: newPlayerDetails });
  }

  handleContactText(idx, e) {
    const newPlayerDetails = this.state.playerDetails.map((player, pidx) => {
      if (idx !== pidx) return player;
      return { ...player, playerContactNumber: e };
    });
    this.setState({ playerDetails: newPlayerDetails });
  }

  handleDelete = (i) => (e) => {
    console.log("Index in delete function", i);
    e.preventDefault();
    let playerDetails = [...this.state.playerDetails];
    playerDetails.splice(i, 1);
    this.props.childHandler(playerDetails);
  };

  render() {
    return (
      <View key={this.state.index}>
        <View style={styles.containerForView}>
          <View style={styles.miniContainer}>
            <View>
              {console.log("Child me", this.state.playerDetails)}
              <Avatar
                rounded
                //source={{uri: player.playerImage}}
                size="large"
                title="LW"
                containerStyle={{
                  backgroundColor: "black",
                  marginTop: 30,
                }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                Player Photo
              </Text>
            </View>
            <View>
              <Button
                icon={
                  <Icon
                    name="times-circle"
                    size={20}
                    color="black"
                    onPress={this.handleDelete(this.state.index)}
                  />
                }
                buttonStyle={{
                  marginLeft: 145,
                  width: 35,
                  height: 20,
                  display: "flex",
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
              />
              <TextInput
                style={styles.inputStyle}
                placeholder="Player Full Name"
                value={this.state.playerDetails.playerName}
                onChangeText={this.handleNameText.bind(this, this.state.index)}
              />

              <TextInput
                style={styles.inputStyle}
                keyboardType="numeric"
                placeholder="Valid Mobile Number"
                value={this.state.playerDetails.playerContactNumber}
                onChangeText={this.handleContactText.bind(
                  this,
                  this.state.index
                )}
              />
            </View>
          </View>
          <Button title="Add" type="clear" onPress={() => {}} />
        </View>
        <View style={styles.space} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
  },
  containerForView: {
    borderRadius: 5,
    backgroundColor: "white",
    height: 200,
    width: 300,
    padding: 5,
  },
  inputStyle: {
    width: "100%",
    marginTop: 10,
    padding: 5,
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  miniContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
  },
  miniContainersecond: {
    width: 200,
  },
});
