import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/LoginScreen';
import UserNavigation from './screens/UserNavigation';
import NoteEditor from './screens/NoteEditor';
import { MaterialColors } from './utils/MaterialDesign';
import AboutScreen from './screens/AboutScreen';
import AppContextProvider from './Context';

const Stack = createNativeStackNavigator();

/*
  In this file we have the "main" navigation stack.

  Into this stack we have:
    - User Login screen
    - User Screen (witch has a bottom navigator)
    - Editor screen

  This was made like this because is much easir to make this flow:
    User Login -> User Screen (Notes/Settings) -> Edit/Create Note
*/

export default function App() {
  return(
    <AppContextProvider>
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
            component={UserNavigation}
            options={{
              title: 'Welcome to Notcha',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen // About Screen
            name='AboutScreen' 
            component={AboutScreen}
            options={{
              title: 'About',
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
    </AppContextProvider>
  );
}
