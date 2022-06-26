import React, { useEffect } from 'react';
import { StatusBar, PermissionsAndroid, BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/LoginScreen';
import UserNavigation from './screens/UserNavigation';
import NoteEditor from './screens/NoteEditor';
import { MaterialColors } from './utils/MaterialDesign';
import AboutScreen from './screens/AboutScreen';
import AppContextProvider from './Context';

/*
  Aqui se encontra grande parte do mecanismo de navegação do aplicativo

  Basicamente possuimos um "stack navigator" que possui as seguintes telas:
  - Login
  - Notas (Página do usuário)
  - Editor de notas
  - Sobre

  Este tipo de abordagem permite que as telas citadas possam acessar umas as outras
  de forma mais simples.
*/

// Função que realiza a solicitação de permissões do App
async function requireFileSystemPermissions() {
  try {

    // Solicita as permissões
    const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE],
      {
        title: 'Notcha! Storage Permission',
        message:
          "Notcha! needs to access your storage to " +
          "create and edit notes.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    
    if (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } 

    else {
      return false;
    }

  } catch (err) {
    Alert.alert('UKNONW ERROR')
    console.log(err)
  }
}


const Stack = createNativeStackNavigator();

export default function App() {

  // Quando o app é carregado, realiza o controle das permissões
  useEffect(() => {

    async function fetchPermission() {

      if (await requireFileSystemPermissions() === false) {
        Alert.alert(
          'Permission dennied!',
          'You must enable the read and write permissions.',
          [
            { text: 'ok', onPress: () => BackHandler.exitApp() }
          ]
        )
      }

    }

    fetchPermission()
  });
  
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
