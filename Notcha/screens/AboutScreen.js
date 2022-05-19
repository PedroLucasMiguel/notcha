import React, { useContext, useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { MaterialStyles } from "../utils/MaterialDesign";
import Separator from "../utils/Components/Separator";
import { AppContext } from "../Context";

export default function AboutScreen() {

  const theme = useContext(AppContext).darkTheme;
  const [pageTheme, setPageTheme] = useState(theme ? [MaterialStyles.dt_background, Styles.dt_title, Styles.dt_title2, Styles.dt_author, Styles.dt_author_data] : [MaterialStyles.wt_background, Styles.wt_title, Styles.wt_title2, Styles.wt_author, Styles.wt_author_data]);

  useEffect(() => {
    setPageTheme(theme ? [MaterialStyles.dt_background, Styles.dt_title, Styles.dt_title2, Styles.dt_author, Styles.dt_author_data] : [MaterialStyles.wt_background, Styles.wt_title, Styles.wt_title2, Styles.wt_author, Styles.wt_author_data]);
  }, [theme]);

  return(
    <ScrollView style={pageTheme[0]}>
      <Text style={pageTheme[1]}>Notcha!</Text>
      <Text style={pageTheme[2]}>A app made with 💜 By:</Text>
      <Text style={pageTheme[3]}>Pedro Lucas Miguel</Text>
      <Text style={pageTheme[4]}>pedro.l.miguel@unesp.br</Text>
      <Text style={pageTheme[3]}>Matheus Augusto</Text>
      <Text style={pageTheme[4]}>matheus-augusto.santos@unesp.br</Text>
      <View style={Styles.third_party_view}>
        <Separator text='Third party' />
        <Text style={pageTheme[3]}>stulip</Text>
        <Text style={pageTheme[4]}>react-native-rich-editor</Text>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  wt_title: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
  },

  dt_title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
  },

  wt_title2: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  dt_title2: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  wt_author: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 40,
  },

  dt_author: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 40,
  },

  wt_author_data: {
    color: '#000000',
    fontSize: 15,
    marginLeft: 10,
  },

  dt_author_data: {
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 10,
  },

  third_party_view: {
    marginTop: 20,
  }

});