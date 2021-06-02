import React, { Component } from "react";
import { Button } from "react-native";
import { StyleSheet, View } from "react-native";
import firebase from "../../../firebase";
import { ListItem, Avatar } from "react-native-elements";

export default class MyTeam extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      uid: firebase.auth().currentUser.uid,
      teamName: "",
      teamCityName: "",
      teamImage: "",
      myteams: [],
      newarray:
        this.props.route.params == undefined ? "" : this.props.route.params,
    };
  }

  componentDidMount() {
    // this.props.route.params;
    console.log("New Array", this.state.newarray);
    // if (this.state.newarray != "") {
    this._isMounted = true;
    firebase
      .firestore()
      .collection("teamdata/3EPg32kwMDdmg6sOg6ck/first/")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          var data = snapshot.data();
          var newArr = this.state.myteams;
          newArr.push(data);
          if (this._isMounted) {
            this.setState({ myteams: newArr });
          }
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    //}
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.myteams.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            containerStyle={{
              padding: 20,
              marginBottom: 15,
              backgroundColor: "white",
              borderRadius: 15,
            }}
          >
            {l.TeamLogo == "" ? (
              <Avatar
                rounded
                size={50}
                title={
                  l.TeamName.charAt(0) + l.TeamName.charAt(1).toUpperCase()
                }
                containerStyle={{ backgroundColor: "black" }}
              />
            ) : (
              <Avatar size={50} rounded source={{ uri: l.TeamLogo }} />
            )}
            <ListItem.Content>
              <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
                {l.TeamName}
              </ListItem.Title>
              <ListItem.Subtitle>{l.TeamCity}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 10,
  },
});
