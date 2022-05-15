import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import NoteEditor from './screens/User/NoteEditor';
import { MaterialColors } from './utils/MaterialDesign';

const Stack = createNativeStackNavigator();

/*
  In this file we have the "main" navigation stack.

  Into this stack we have:
    - User Login screen
    - User Screen (witch have a bottom navigator)
    - Editor screen

  This was made like this because is much easir to make this flow:
    User Login -> User Screen (Notes/Settings) -> Edit/Create Note
*/

export default function App() {
  return(
    <NavigationContainer>
      <StatusBar 
        backgroundColor={MaterialColors.purple_700} 
      />
      <Stack.Navigator 
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {backgroundColor: MaterialColors.purple_500},
          headerTintColor: '#FFFFFF',
        }}
      >
        <Stack.Screen // Login Screen
          name='Login' 
          component={Login}
        />
        <Stack.Screen // User Screen
          name='NotesHome' 
          component={UserScreen}
          options={{
            title: 'Welcome to Notcha',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen // Editor Screen
          name='NoteEditor' 
          component={NoteEditor}
          options={{
            title: 'Note Editor',
            animation: 'none'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
