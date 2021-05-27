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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Icon } from "react-native-elements";
import Contacts from "react-native-unified-contacts";
import ImagePicker from "react-native-image-crop-picker";
import firebase from "../../../../firebase";
import { Snackbar } from "react-native-paper";

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
      contactNo: "",
      imageSrc: imgUrl,
      visible: false,
      message: "",
      allow: false,
      playerInfo: [
        {
          playerContactNumber: "9799172078",
          playerImage: "",
          playerName: "Kalpesh",
        },
      ],
      isLoading: false,
      contactTextDisable: true,
    };
    this.getPlayerImage = this.getPlayerImage.bind(this);
  }

  componentDidMount() {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
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

  handleDelete = (i) => {
    let playerInfo = [...this.state.playerDetails];
    playerInfo.splice(i, 1);
    this.setState({
      playerDetails: playerInfo,
      isLoading: false,
    });
  };

  addplayer = () => {
    this.setState((prevState) => ({
      playerDetails: [
        ...prevState.playerDetails,
        { playerImage: "", playerName: "", playerContactNumber: "" },
      ],
      contactNo: "",
      contactTextDisable: true,
    }));
  };

  addPlayerThroughContact() {
    this.setState((prevState) => ({
      playerDetails: [
        ...prevState.playerDetails,
        {
          playerImage: "",
          playerName: "",
          playerContactNumber: this.state.contactNo,
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
        let str = contact.phoneNumbers[0].digits;
        str = str.replace("+91", "");
        this.setState({ contactNo: str });
        this.addPlayerThroughContact();
      }
    });
  };

  getPlayerImage = (imageIndex) => {
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
  };

  checkIfPlayerAlreadyExist = async (contact) => {
    this.setState({
      isLoading: true,
    });
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

  save = async (index) => {
    const channel = await this.checkIfPlayerAlreadyExist(
      this.state.playerDetails[index].playerContactNumber
    );
    var newPlayer = this.state.playerInfo.concat(
      this.state.playerDetails[index]
    );
    this.setState({ playerInfo: newPlayer });
    console.log("Player Info", this.state.playerInfo);
    if (channel) {
      console.log("Already Exist!!");
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
        .then(() => {
          this.setState({
            visible: true,
            message: "Successfully Added New Player!!",
          });
        })
        .catch((err) => {
          console.error("Error found: ", err);
        });
    }
    this.handleDelete(index);
  };

  render() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
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
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "black" }}>
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
            onPress={() => {}}
          />
        </TouchableOpacity>
      );
    };
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
          <FlatList
            data={this.state.playerInfo}
            renderItem={renderItem}
            keyExtractor={(item) => Math.random().toString()}
            contentContainerStyle={{
              padding: 20,
            }}
          />
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
                      style={styles.inputStyleName}
                      placeholder="Player Full Name *"
                      value={player.playerName || ""}
                      onChangeText={this.handleNameText.bind(this, index)}
                    />
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ top: 7 }}> {"+91   "} </Text>
                      <TextInput
                        style={styles.inputStyleContact}
                        editable={
                          player.playerContactNumber || ""
                            ? this.state.contactTextDisable
                            : true
                        }
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
                  loading={
                    player.playerContactNumber == "" || player.playerName == ""
                      ? false
                      : this.state.isLoading
                  }
                  disabled={
                    player.playerContactNumber == "" || player.playerName == ""
                      ? true
                      : false
                  }
                  onPress={() => this.save(index)}
                />
              </View>
              <View style={styles.space} />
            </View>
          ))}
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
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});
