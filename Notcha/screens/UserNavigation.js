import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialColors } from "../utils/MaterialDesign";
import UserNotes from "./UserNotes";
import ConfigScreen from "./ConfigScreen";

const Tab = createMaterialBottomTabNavigator();

export default function UserNavigation() {
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
          component={ConfigScreen}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="cog-outline" color={'#FFFFFF'} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}