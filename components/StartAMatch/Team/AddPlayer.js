import React, { Component } from "react";
import { StatusBar } from "react-native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  RefreshControl,
} from "react-native";
import { SearchBar, Icon, Button } from "react-native-elements";
import firebase from "../../../firebase";

export default class AddPlayer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    let imgUrl = props.image
      ? { uri: props.image }
      : require("../../../assets/teamicon.jpg");
    this.state = {
      search: "",
      countPlayers: "",
      players: [],
      isSelected: null,
      playingSquad: 0,
      defaultLogo: imgUrl,
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  componentDidMount() {
    this._isMounted = true;
    firebase
      .firestore()
      .collection("Player")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          var data = snapshot.data();
          var newPlayer = this.state.players.concat(data);
          if (this._isMounted) {
            this.setState({ players: newPlayer });
          }
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // removePlayer = () => {
  //   firebase
  //     .firestore()
  //     .collection("Player")
  //     .doc("A0xWdDomzYk7eueHj4hd")
  //     .delete()
  //     .then(() => {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch((error) => {
  //       console.error("Error removing document: ", error);
  //     });
  // };

  onSelectItem = (id) => {
    let newArr = [...this.state.players];
    for (let data of newArr) {
      if (data.Contact === id) {
        data.selected = data.selected == null ? true : !data.selected;
        break;
      }
    }
    this.setState({ players: newArr });
  };

  render() {
    const renderItem = ({ item }) => {
      return (
        <View>
          <TouchableOpacity
            style={[
              {
                flex: 1,
                flexDirection: "row",
                padding: 7,
                marginBottom: 10,
                borderRadius: 12,
                alignItems: "center",
              },
              item.selected == true
                ? {
                    backgroundColor: "gold",
                  }
                : {
                    backgroundColor: "white",
                  },
            ]}
            onPress={() => this.onSelectItem(item.Contact)}
          >
            <Image
              source={
                item.Image == "" ? this.state.defaultLogo : { uri: item.Image }
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
              {item.Name}
            </Text>
            {/* <Icon
              name="remove"
              color="red"
              size={23}
              containerStyle={{
                backgroundColor: "darkred",
                position: "absolute",
                right: 10,
                borderRadius: 100,
              }}
              onPress={() => this.removePlayer()}
            /> */}
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.selectPlayersContainer}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 6,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Select Playing Squad ({this.state.playingSquad})
          </Text>
          <Button title="Select All" type="raised" onPress={() => {}} />
        </View>
        <View style={styles.searchwithbutton}>
          <SearchBar
            placeholder={"Quick Search"}
            inputStyle={{ backgroundColor: "white", fontSize: 15 }}
            containerStyle={{
              backgroundColor: "none",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            inputContainerStyle={{
              height: 40,
              backgroundColor: "white",
              borderWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 5,
              width: 200,
            }}
            value={this.state.search}
            onChangeText={this.updateSearch}
          />
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => this.props.navigation.navigate("TabForPlayer")}
          >
            <Icon name="add" color="white" size={20} />
            <Text style={{ fontWeight: "bold", color: "white" }}>
              ADD PLAYER
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.FlatList
          data={this.state.players}
          renderItem={renderItem}
          keyExtractor={(item) => Math.random().toString()}
          //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{
            padding: 20,
            paddingTop: StatusBar.currentHeight || 42,
          }}
        />

        <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
          <TouchableOpacity style={styles.btnAddTeam} onPress={this.getData}>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 15 }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectPlayersContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "space-evenly",
  },
  searchwithbutton: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
  },
  inputStyle: {
    width: "80%",
    marginBottom: 15,
    paddingBottom: 15,
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 50,
    padding: 2,
    margin: 10,
  },
  space: {
    width: 20,
    height: 20,
  },
  buttonAdd: {
    height: 40,
    backgroundColor: "blue",
    marginTop: 8,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnAddTeam: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2ea44f",
  },
  item: {
    padding: 10,
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 44,
    backgroundColor: "red",
  },
});
