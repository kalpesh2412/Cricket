// components/dashboard.js

import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import firebase from "../../../firebase";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "react-native-elements";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      firstTeam: "+",
      secondTeam: "+",
      firstTeamSquad: "",
      secondTeamSquad: "",
      matchId: "",
    };
  }

  // returnData = (teamSquad, name, match_id) => {
  //   if(this.state.firstTeam == '+')
  //   this.setState({firstTeamSquad:teamSquad, firstTeam: name, matchId: match_id});
  //   else
  //   this.setState({secondTeamSquad:teamSquad, secondTeam: name});
  // }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["gold", "orange"]}
          style={styles.smallContainer}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        />
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => this.props.navigation.navigate("TabDisplay")}
        >
          {this.state.firstTeam == "" ? (
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 30 }}>
              {this.state.firstTeam}
            </Text>
          ) : (
            <Icon reverse name="add" color="black" size={21} />
          )}
        </TouchableOpacity>
        <View style={styles.spacebtn} />
        <Text style={{ color: "grey", fontSize: 15 }}>
          {this.state.firstTeamSquad == ""
            ? "Select Team A"
            : "Squad (" + this.state.firstTeamSquad + ")"}
        </Text>
        <View style={styles.space} />
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 25 }}>
          Vs
        </Text>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => this.props.navigation.navigate("TabDisplay")}
        >
          {this.state.secondTeam == "" ? (
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 30 }}>
              {this.state.secondTeam}
            </Text>
          ) : (
            <Icon reverse name="add" color="black" size={21} />
          )}
        </TouchableOpacity>
        <View style={styles.spacebtn} />
        <Text style={{ color: "grey", fontSize: 15 }}>
          {this.state.secondTeamSquad == ""
            ? "Select Team B"
            : "Squad (" + this.state.secondTeamSquad + ")"}
        </Text>
        <View style={styles.space} />
        <Button
          style={styles.btn}
          title="Let's Play"
          color="green"
          //disabled = {this.state.firstTeam == '+' || this.state.secondTeam == '+' ? true : false}
          onPress={() =>
            this.props.navigation.navigate("MatchDetail", {
              matchId: this.state.matchId,
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  smallContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    left: "20%",
    bottom: "54.5%",
    borderBottomLeftRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 20,
    margin: 20,
  },
  space: {
    width: 20,
    height: 30,
  },
  spacebtn: {
    width: 20,
    height: 15,
  },
  roundButton: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "white",
    elevation: 10,
  },
});
