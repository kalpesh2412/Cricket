import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  LogBox,
  Image,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Icon } from "react-native-elements";
import Contacts from "react-native-unified-contacts";
import ImagePicker from "react-native-image-crop-picker";
import firebase from "../../../../firebase";
import { Snackbar } from "react-native-paper";
import { isMobileNumberValid, isStringValid } from "../../../Common/Validation";

export default class NewPlayer extends Component {
  constructor(props) {
    super(props);

    let imgUrl = props.image
      ? { uri: props.image }
      : require("../../../../assets/teamicon.jpg");
    this.state = {
      playerDetails: [
        {
          playerImage: "",
          playerName: "",
          playerContactNumber: "",
        },
      ],
      playerInfo: [
        {
          playerContactNumber: "9636131836",
          playerImage: "",
          playerName: "Kalpesh",
        },
      ],
      cric_contact: "",
      cric_name: "",
      imageSrc: imgUrl,
      visible: false,
      message: "",
      allow: false,
      loading: [],
    };
    this.getPlayerImage = this.getPlayerImage.bind(this);
  }

  componentDidMount() {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }

  handleNameText(idx, e) {
    const newPlayerDetails = this.state.playerDetails.map((player, pidx) => {
      if (idx !== pidx) {
        return player;
      }
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

  handleDelete = (i) => {
    let playerData = [...this.state.playerDetails];
    playerData.splice(i, 1);
    this.setState({
      playerDetails: playerData,
    });
  };

  removePlayer(i) {
    let playerData = [...this.state.playerInfo];
    playerData.splice(i, 1);
    this.setState({
      playerInfo: playerData,
    });
  }

  addplayer() {
    this.setState((prevState) => ({
      playerDetails: [
        ...prevState.playerDetails,
        { playerImage: "", playerName: "", playerContactNumber: "" },
      ],
      cric_contact: "",
      cric_name: "",
    }));
  }

  addPlayerThroughContact() {
    this.setState((prevState) => ({
      playerDetails: [
        ...prevState.playerDetails,
        {
          playerImage: "",
          playerName: this.state.cric_name,
          playerContactNumber: this.state.cric_contact,
        },
      ],
      contactTextDisable: false,
    }));
  }

  getContactNumber = () => {
    Contacts.selectContact((error, contact) => {
      if (error) {
        console.error(error);
      } else {
        let mobNo = contact.phoneNumbers[0].digits;
        let name = contact.displayName;
        mobNo = mobNo.replace("+91", "");
        this.setState({ cric_name: name, cric_contact: mobNo });
        this.addPlayerThroughContact();
      }
    });
  };

  getPlayerImage(imageIndex) {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((images) => {
        const newPlayerDetails = this.state.playerDetails.map(
          (player, pidx) => {
            if (imageIndex !== pidx) return player;
            return { ...player, playerImage: images.path };
          }
        );
        this.setState({ playerDetails: newPlayerDetails });
      })
      .catch((err) => {
        console.log("user cancelled image" + err.toString());
      });
  }

  checkIfPlayerAlreadyExist = async (contact) => {
    var test = null;
    try {
      const qsnapshot = await firebase.firestore().collection("Player").get();
      qsnapshot.forEach((snapshot) => {
        var data = snapshot.data();
        if (data.Contact == contact) {
          test = true;
        }
      });
    } catch (error) {
      console.log("Error getting document:", error);
    }
    return test;
  };

  addToFlatList = (index) => {
    var newPlayer = this.state.playerInfo.concat(
      this.state.playerDetails[index]
    );
    this.setState({ playerInfo: newPlayer });
  };

  isValidate(index) {
    var result = "empty";
    if (!isStringValid(this.state.playerDetails[index].playerName)) {
      this.setState({
        visible: true,
        message: "Please Enter Valid Player Name!!",
      });
      result = "something";
    } else if (
      !isMobileNumberValid(this.state.playerDetails[index].playerContactNumber)
    ) {
      this.setState({
        visible: true,
        message: "Please Enter Valid Mobile Number!!",
      });
      result = "anything";
    } else {
      this.addToFlatList(index);
    }
    return result;
  }

  loadingButton = (id) => {
    let load = [...this.state.loading];
    load[id] = true;
    this.setState({
      loading: load,
    });
  };

  save = async (index) => {
    this.loadingButton(this.state.playerDetails[index].playerName);
    if (this.isValidate(index) == "empty") {
      const channel = await this.checkIfPlayerAlreadyExist(
        this.state.playerDetails[index].playerContactNumber
      );
      if (channel) {
        console.log("Player Already Exist!!");
      } else {
        firebase
          .firestore()
          .collection("Player")
          .doc()
          .set({
            Image: this.state.playerDetails[index].playerImage,
            Name: this.state.playerDetails[index].playerName,
            Contact: this.state.playerDetails[index].playerContactNumber,
          })
          .then(() => {})
          .catch((err) => {
            console.error("Error found: ", err);
          });
      }
      this.handleDelete(index);
    } else {
      console.log("Please correct your playername and contactnumber");
    }
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 14,
              color: "grey",
              padding: 20,
              textAlign: "center",
            }}
          >
            You can add players from your contacts or invite them via a link
          </Text>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={this.getContactNumber}
          >
            <Icon
              name="address-book"
              type="font-awesome"
              size={20}
              color="white"
            />
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {"  "}
              FROM CONTACTS
            </Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
            <View>
              <Text style={{ width: 50, textAlign: "center", color: "grey" }}>
                OR
              </Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
          </View>
          <Text
            style={{
              fontSize: 14,
              color: "grey",
              padding: 10,
              textAlign: "center",
            }}
          >
            To add player manually
          </Text>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => this.addplayer()}
          >
            <Icon
              name="plus-square"
              type="font-awesome"
              size={20}
              color="white"
            />
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {"  "} ADD AS A NEW PLAYER
            </Text>
          </TouchableOpacity>
          <View style={styles.space} />
          {this.state.playerDetails.map((player, index) => (
            <View
              key={index}
              style={{
                flex: 0.1,
                justifyContent: "center",
              }}
            >
              <View style={styles.containerForView}>
                <View style={styles.miniContainer}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      rounded
                      size="large"
                      source={
                        player.playerImage == ""
                          ? this.state.imageSrc
                          : {
                              uri: player.playerImage,
                            }
                      }
                      onPress={() => this.getPlayerImage(index)}
                      activeOpacity={0.7}
                      containerStyle={{ marginTop: 25, borderWidth: 1 }}
                    >
                      <Avatar.Accessory
                        name="pencil-alt"
                        type="font-awesome-5"
                        color="white"
                        size={20}
                      />
                    </Avatar>
                    <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                      Player Photo
                    </Text>
                  </View>

                  <View>
                    <Icon
                      name="close"
                      size={25}
                      color="black"
                      containerStyle={{
                        alignSelf: "flex-end",
                        backgroundColor: "grey",
                        borderRadius: 15,
                        elevation: 5,
                      }}
                      onPress={() => this.handleDelete(index)}
                    />
                    <TextInput
                      name="playername"
                      style={styles.inputStyleName}
                      placeholder="Player Full Name *"
                      value={player.playerName || ""}
                      onChangeText={this.handleNameText.bind(this, index)}
                    />
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ top: 7 }}> {"+91   "} </Text>
                      <TextInput
                        name="contactnumber"
                        style={styles.inputStyleContact}
                        keyboardType="numeric"
                        placeholder="Valid Mobile Number *"
                        value={player.playerContactNumber || ""}
                        maxLength={10}
                        onChangeText={this.handleContactText.bind(this, index)}
                      />
                    </View>
                  </View>
                </View>
                <Button
                  title="Add"
                  type="clear"
                  loading={this.state.loading[player.playerName] || false}
                  disabled={
                    player.playerName == "" || player.playerContactNumber == ""
                      ? true
                      : false
                  }
                  onPress={() => this.save(index)}
                />
              </View>
              <View style={styles.space} />
            </View>
          ))}
          {this.state.playerInfo.length > 0
            ? this.state.playerInfo.map((item, ind) => {
                return (
                  <View key={ind}>
                    <TouchableOpacity
                      style={{
                        padding: 7,
                        marginBottom: 10,
                        borderRadius: 12,
                        width: 300,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "white",
                        elevation: 5,
                      }}
                    >
                      <Image
                        source={
                          item.playerImage == ""
                            ? this.state.imageSrc
                            : {
                                uri: item.playerImage,
                              }
                        }
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 100,
                          marginRight: 20,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 17,
                          color: "black",
                        }}
                      >
                        {item.playerName}
                      </Text>
                      <Icon
                        name="close"
                        color="red"
                        size={23}
                        containerStyle={{
                          backgroundColor: "darkred",
                          position: "absolute",
                          right: 10,
                          borderRadius: 100,
                        }}
                        onPress={() => this.removePlayer(ind)}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })
            : null}
          <View>
            <TouchableOpacity style={styles.addbtn}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                ADD THEM IN TEAM
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
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonAdd: {
    height: 40,
    backgroundColor: "#2ea44f",
    padding: 10,
    flexDirection: "row",
  },
  addbtn: {
    height: 45,
    backgroundColor: "navy",
    padding: 10,
    justifyContent: "center",
  },
  space: {
    width: 20,
    height: 20,
  },
  containerForView: {
    flex: 0.1,
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "52%",
    width: 300,
    padding: 5,
    elevation: 5,
  },
  inputStyleName: {
    borderColor: "black",
    borderBottomWidth: 1,
    //backgroundColor: "brown",
    bottom: 7,
  },
  inputStyleContact: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    bottom: 7,
    //backgroundColor: "grey",
  },
  miniContainer: {
    flexDirection: "row",
    width: 280,
    justifyContent: "space-between",
    //backgroundColor: "orange",
  },
});
