import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialColors } from "../utils/MaterialDesign";
import Login from "./LoginScreen";
import UserNotes from "./User/Notes";

const Tab = createMaterialBottomTabNavigator();

export default function UserScreen() {
  return(
      <Tab.Navigator
        initialRouteName='Notes'
        activeColor='#FFFFFF'
        barStyle={{ backgroundColor: MaterialColors.purple_700 }}
      >
        <Tab.Screen 
          name="Notes" 
          component={UserNotes}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="note-edit-outline" color={'#FFFFFF'} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={Login}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="cog-outline" color={'#FFFFFF'} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}