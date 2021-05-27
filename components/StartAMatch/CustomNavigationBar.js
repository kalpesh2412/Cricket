import { Appbar } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";

export default function CustomNavigationBar({ navigation, previous }) {
  return (
    <Appbar.Header statusBarHeight={10} style={{ backgroundColor: "#FFD600" }}>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {!previous ? (
        <Appbar.Action
          icon="menu"
          color="black"
          onPress={() => navigation.openDrawer()}
        />
      ) : null}
      <Appbar.Content
        title={"Cric" + "War"}
        color="navy"
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        onPress={() => navigation.navigate("Home")}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({});
