import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NewPlayer from "./NewPlayer";
import SearchPlayer from "./SearchPlayer";

const Tab = createMaterialTopTabNavigator();

export default function TabForPlayer() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "#9E9E9E",
        indicatorStyle: { backgroundColor: "blue" },
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        style: { backgroundColor: "#FFD600" },
      }}
    >
      <Tab.Screen name="ADD" component={NewPlayer} />
      <Tab.Screen name="SEARCH" component={SearchPlayer} />
    </Tab.Navigator>
  );
}
