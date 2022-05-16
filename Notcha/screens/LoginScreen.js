import React from "react";
import { ScrollView, Text, StyleSheet, Image, ToastAndroid, View } from "react-native";
import { PrimaryButton, RoundIconButton } from "../utils/Components/CustomButtons";
import { MaterialColors } from "../utils/MaterialDesign";
import Separator from "../utils/Components/Separator";

/*
  Here we have out "Login screen"

  By the fact that the "Login" screen is in the same "stack" as the
  UserScreen, we can easily go to the UserScreen by using "navigation"
*/

export default function Login({navigation}) {
  return(
    
    <ScrollView style={Styles.main_view}>
      <View style={Styles.about_view}>
        <RoundIconButton
          color={MaterialColors.purple_100}
          iconName='information-variant'
          iconColor='#000000'
          size={40}
          onPress={() => navigation.navigate('AboutScreen')}
        />
      </View>
      <Image 
        source={{uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/162.png'}} 
        style={Styles.logo}
      />
      <Text style={Styles.login_text}>Welcome to Notcha</Text>
      <PrimaryButton
        title='Login as Google'
        padding={30}
        height={60}
        fontSize={20}
        onPress={() => {
          ToastAndroid.showWithGravityAndOffset(
            "Work in Progress!",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            30,
          );
        }}
      />
      <Separator 
        text='Or'
        padding={10}
      />
      <PrimaryButton
        title='Login as Guest'
        padding={30}
        height={60}
        fontSize={20}
        onPress={() => navigation.navigate('NotesHome')}
      />
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  main_view: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
  },

  login_text: {
    color: '#000000',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 55,
    paddingTop: 10,
  },

  logo: {
    paddingTop: 100,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },

  btn: {
    paddingTop: 50,
  },

  about_view: {
    marginLeft: '87%',
  }

});