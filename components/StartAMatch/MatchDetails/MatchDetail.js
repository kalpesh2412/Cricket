import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import imageOfBat from "../../../assets/batting.jpg";
import imageOfBowl from "../../../assets/bowling.jpg";
import SimpleSelectButton from "react-native-simple-select-button";
import firebase from "../../../firebase";
import { whoWonToss } from "../../Common/Util";

export default class MatchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchName: "JPL",
      noOfOver: "",
      city: "",
      groundName: "",
      dateTime: new Date().toLocaleString(),
      matchId: "",
      toss: "",
      isCheckedTeamA: false,
      isCheckedTeamB: false,
      isBatChecked: false,
      isBowlChecked: false,
    };
  }

  textHandler = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  handleCheckmarkTeamA = () => {
    this.setState({
      isCheckedTeamA: !this.state.isCheckedTeamA,
      isCheckedTeamB: false,
      isBatChecked: false,
      isBowlChecked: false,
    });
  };

  handleCheckmarkTeamB = () => {
    this.setState({
      isCheckedTeamB: !this.state.isCheckedTeamB,
      isCheckedTeamA: false,
      isBatChecked: false,
      isBowlChecked: false,
    });
  };

  handleCheckmarkBat = () => {
    this.setState({
      isBatChecked: !this.state.isBatChecked,
      isBowlChecked: false,
    });
  };

  handleCheckmarkBowl = () => {
    this.setState({
      isBowlChecked: !this.state.isBowlChecked,
      isBatChecked: false,
    });
  };

  handleSubmit = () => {
    console.log("hello");
    let result = whoWonToss(
      this.state.isCheckedTeamA,
      this.state.isCheckedTeamB,
      this.state.isBatChecked,
      this.state.isBowlChecked
    );
    firebase
      .firestore()
      .collection("matches")
      .doc()
      .set({
        MatchName: this.state.matchName,
        Overs: this.state.noOfOver,
        City: this.state.city,
        Ground: this.state.groundName,
        DateTime: this.state.dateTime,
        Toss: result,
      })
      .then((res) => {
        console.log("goodbye");
        this.setState({ toss: result });
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
    console.log("bye bye");
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="No. of Over's"
          keyboardType="numeric"
          value={this.state.noOfOver}
          maxLength={2}
          onChangeText={(val) => this.textHandler(val, "noOfOver")}
        />
        <View style={styles.space} />
        <TextInput
          style={styles.inputStyle}
          placeholder="City"
          value={this.state.city}
          onChangeText={(val) => this.textHandler(val, "city")}
        />
        <View style={styles.space} />
        <TextInput
          style={styles.inputStyle}
          placeholder="Ground Name"
          value={this.state.groundName}
          onChangeText={(val) => this.textHandler(val, "groundName")}
        />
        <View style={styles.space} />
        <TextInput
          style={styles.inputStyle}
          placeholder="Date and Time"
          value={this.state.dateTime}
          editable={false}
          selectTextOnFocus={false}
        />
        <View style={styles.space} />
        <Text style={styles.textStyle}>Who won the toss?</Text>
        <View style={styles.space} />
        <View style={styles.toss}>
          <SimpleSelectButton
            text="Team A"
            textSize={14}
            buttonDefaultColor="brown"
            buttonSelectedColor="yellow"
            textDefaultColor="white"
            textSelectedColor="black"
            isChecked={this.state.isCheckedTeamA}
            onPress={this.handleCheckmarkTeamA}
          />
          <View style={styles.space} />
          <SimpleSelectButton
            text="Team B"
            textSize={14}
            buttonDefaultColor="brown"
            buttonSelectedColor="yellow"
            textDefaultColor="white"
            textSelectedColor="black"
            isChecked={this.state.isCheckedTeamB}
            onPress={this.handleCheckmarkTeamB}
          />
        </View>
        <View style={styles.space} />
        <Text style={styles.textStyle}>Winner of the toss elected to?</Text>
        <View style={styles.space} />
        <View style={styles.toss}>
          <TouchableOpacity
            style={
              this.state.isBatChecked
                ? {
                    alignItems: "center",
                    borderWidth: 3,
                  }
                : { alignItems: "center" }
            }
            disabled={
              this.state.isCheckedTeamA
                ? false
                : this.state.isCheckedTeamB
                ? false
                : true
            }
            onPress={this.handleCheckmarkBat}
          >
            <Image source={imageOfBat} style={styles.battingImage}></Image>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
              Bat
            </Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={
              this.state.isBowlChecked
                ? {
                    alignItems: "center",
                    borderWidth: 3,
                  }
                : { alignItems: "center" }
            }
            disabled={
              this.state.isCheckedTeamA
                ? false
                : this.state.isCheckedTeamB
                ? false
                : true
            }
            onPress={this.handleCheckmarkBowl}
          >
            <Image source={imageOfBowl} style={styles.battingImage}></Image>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 20 }}>
              Bowl
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.space} />
        <TouchableOpacity style={styles.buttonAdd} onPress={this.handleSubmit}>
          <Text style={{ fontWeight: "bold", color: "white" }}>Toss</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "80%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 32,
  },
  space: {
    width: 20,
    height: 20,
  },
  buttonAdd: {
    height: 40,
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    alignItems: "center",
    backgroundColor: "#2ea44f",
    padding: 10,
  },
  toss: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 50,
    marginRight: 50,
  },
  battingImage: {
    width: 80,
    height: 80,
  },
});
