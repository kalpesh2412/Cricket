import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import firebase from "../../../firebase";
import { Snackbar, TextInput } from "react-native-paper";

export default class NewTeam extends Component {
  constructor(props) {
    super(props);
    let imgUrl = props.image
      ? { uri: props.image }
      : require("../../../assets/teamicon.jpg");
    this.state = {
      uid: firebase.auth().currentUser.uid,
      teamName: "",
      teamCity: "",
      image: null,
      isVisible: false,
      defaultTeamLogo: imgUrl,
      teamLogo: "",
      visible: false,
      message: "",
    };
  }

  handleString = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  launchImageLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((images) => {
        this.setState({
          teamLogo: images.path,
        });
      })
      .catch((err) => {
        if (err.code === "E_PICKER_CANCELLED") {
          return false;
        }
      });
  };

  addTeam = () => {
    if (this.state.teamName == "") {
      this.setState({
        visible: true,
        message: "Please Enter Team Name!!",
      });
    } else if (this.state.teamCity == "") {
      this.setState({
        visible: true,
        message: "Please Enter Team City!!",
      });
    } else {
      const ref = firebase
        .firestore()
        .collection("users")
        .doc(this.state.uid)
        .collection("match")
        .doc();

      ref
        .set({
          TeamLogo: this.state.teamLogo,
          TeamName: this.state.teamName,
          TeamCity: this.state.teamCity,
        })
        .then(() => {
          this.setState({
            teamLogo: "",
            teamName: "",
            teamCity: "",
            visible: true,
            message: "Team Created Successfully!!",
          });
          console.log("Ye ID hai", ref.id);
        })
        .catch((err) => {
          console.error("Error found: ", err);
        });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Avatar
          size={100}
          rounded
          source={
            this.state.teamLogo == ""
              ? this.state.defaultTeamLogo
              : {
                  uri: this.state.teamLogo,
                }
          }
          onPress={() => this.launchImageLibrary()}
          activeOpacity={0.7}
          containerStyle={{
            marginTop: 30,
            borderWidth: 1,
          }}
        >
          <Avatar.Accessory
            name="pencil-alt"
            type="font-awesome-5"
            color="white"
            size={23}
          />
        </Avatar>
        <View style={styles.space} />
        <Text style={styles.textlogo}>Team Logo</Text>
        <View style={styles.space} />
        <TextInput
          style={styles.inputStyle}
          label={"Team Name" + "  *"}
          value={this.state.teamName}
          onChangeText={(val) => this.handleString(val, "teamName")}
        />
        <View style={styles.space} />
        <TextInput
          style={styles.inputStyle}
          label={"City/Town" + "  *"}
          value={this.state.teamCityName}
          onChangeText={(val) => this.handleString(val, "teamCity")}
        />
        <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
          <TouchableOpacity
            style={styles.btnAddTeam}
            onPress={() => this.addTeam()}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 14 }}>
              ADD TEAM
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.visible ? (
          <Snackbar
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
            duration={2000}
            style={{
              marginBottom: 50,
              height: 55,
              backgroundColor: "darkred",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {this.state.message}
            </Text>
          </Snackbar>
        ) : null}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputStyle: {
    width: "92%",
    backgroundColor: "grey",
    borderBottomWidth: 1,
  },
  space: {
    width: 20,
    height: 20,
  },
  btnAddTeam: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2ea44f",
  },
  textlogo: {
    fontWeight: "bold",
    color: "grey",
  },
});
