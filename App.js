// App.js

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from "react-native-paper";

import CustomNavigationBar from "./components/StartAMatch/CustomNavigationBar";
import DrawerContent from "./components/StartAMatch/SideDrawer";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Home from "./components/StartAMatch/Home";
import Dashboard from "./components/StartAMatch/Dashboard/Dashboard";
import MatchDetail from "./components/StartAMatch/MatchDetails/MatchDetail";
import MyTeam from "./components/StartAMatch/Team/MyTeam";
import TabDisplay from "./components/StartAMatch/Team/TabDisplay";
import AddPlayer from "./components/StartAMatch/Team/AddPlayer";
import NewTeam from "./components/StartAMatch/Team/NewTeam";
import NewPlayer from "./components/StartAMatch/Team/Player/NewPlayer";
import SearchPlayer from "./components/StartAMatch/Team/Player/SearchPlayer";
import TabForPlayer from "./components/StartAMatch/Team/Player/TabForPlayer";
import FantasyLeague from "./components/FantasyLeague/FantasyLeague";
import Settings from "./components/StartAMatch/Settings";
import Logout from "./components/StartAMatch/Logout";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ title: "Home" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ title: "Dashboard" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="TabDisplay"
        component={TabDisplay}
        options={({ title: "TabDisplay" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="NewTeam"
        component={NewTeam}
        options={({ title: "NewTeam" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Add Player"
        component={AddPlayer}
        options={({ title: "PlayerName" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="MyTeam"
        component={MyTeam}
        options={({ title: "MyTeam" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="MatchDetail"
        component={MatchDetail}
        options={({ title: "MatchDetail" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="NewPlayer"
        component={NewPlayer}
        options={({ title: "NewPlayer" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Search Player"
        component={SearchPlayer}
        options={({ title: "SearchPlayer" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="TabForPlayer"
        component={TabForPlayer}
        options={({ title: "TabForPlayer" }, { headerLeft: null })}
      />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          gestureEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Signup"
        component={Signup}
        options={{
          gestureEnabled: false,
        }}
      />
      <Drawer.Screen
        name="MyStack"
        component={MyStack}
        options={{
          drawerLabel: "MyStack",
          title: "bolo",
          headerTitleStyle: "bold",
        }}
      />
      <Drawer.Screen
        name="FantasyLeague"
        component={FantasyLeague}
        options={{ drawerLabel: "FantasyLeague" }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ drawerLabel: "Settings" }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ drawerLabel: "Logout" }}
      />
    </Drawer.Navigator>
  );
}

// function AuthStack(loggedIn) {
//   <Stack.Navigator initialRouteName="Login">
//     <Stack.Screen name="Login" component={Login} initialParams={{ loggedIn }} />
//     <Stack.Screen name="Signup" component={Signup} />
//   </Stack.Navigator>;
// }

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}
