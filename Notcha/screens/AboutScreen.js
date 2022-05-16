import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { MaterialStyles } from "../utils/MaterialDesign";
import Separator from "../utils/Components/Separator";

export default function AboutScreen() {
  return(
    <ScrollView style={MaterialStyles.wt_background}>
      <Text style={Styles.title}>Notcha!</Text>
      <Text style={Styles.title2}>A app made with 💜 By:</Text>
      <Text style={Styles.author}>Pedro Lucas Miguel</Text>
      <Text style={Styles.author_data}>pedro.l.miguel@unesp.br</Text>
      <Text style={Styles.author}>Matheus Augusto</Text>
      <Text style={Styles.author_data}>I dunno yur mail sowuy ;-;</Text>
      <View style={Styles.third_party_view}>
        <Separator text='Third party' />
        <Text style={Styles.author}>stulip</Text>
        <Text style={Styles.author_data}>react-native-rich-editor</Text>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  title: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
  },

  title2: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    
  },

  author: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 40,
  },

  author_data: {
    color: '#000000',
    fontSize: 15,
    marginLeft: 10,
  },

  third_party_view: {
    marginTop: 20,
  }
});