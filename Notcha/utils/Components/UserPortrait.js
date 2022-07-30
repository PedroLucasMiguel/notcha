import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, Image, StyleSheet, Alert, ToastAndroid, Text } from "react-native";

export default function UserPortrait(props) {

  

  return (
    <View style={Styles.view}>
      <Image 
        source={{uri: props.user.photoURL}} 
        style={Styles.logo}
      />
      <Text style={Styles.wt_text}>Welcome back {props.user.displayName}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  view: {
    paddingTop: 20,
    alignItems: 'center',
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 90,
  },

  wt_text: {
    paddingTop: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  }
})