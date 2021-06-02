import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyTeam from "./MyTeam";
import AddPlayer from "./AddPlayer";
import NewTeam from "./NewTeam";

const Tab = createMaterialTopTabNavigator();

export default function TabDisplay({ navigation, route }) {
  var id = route.params.id;
  var team = route.params.team == "first" ? route.params.team : "second";
  console.log("IDDD", id, "TEAMM", team);
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
      <Tab.Screen
        name="Create New Team"
        children={() => (
          <NewTeam matchid={id} teamName={team} navigation={navigation} />
        )}
      />
      <Tab.Screen name="My Teams" component={MyTeam} />
      <Tab.Screen name="Add Player" component={AddPlayer} />
    </Tab.Navigator>
  );
}
