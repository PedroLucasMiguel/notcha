import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, Image, StyleSheet, Alert, ToastAndroid, Text } from "react-native";
import { AppContext } from "../../Context";

export default function UserPortrait(props) {
  
  const darkTheme = useContext(AppContext).darkTheme;
  const [pageTheme, setPageTheme] = useState(darkTheme ? Styles.dt_text : Styles.wt_text);

  useEffect(() => {
    setPageTheme(darkTheme ? Styles.dt_text : Styles.wt_text);
  }, [darkTheme]);

  return (
    <View style={Styles.view}>
      <Image 
        source={{uri: props.user.photoURL}} 
        style={Styles.profile_pic}
      />
      <Text style={pageTheme}>Welcome back {props.user.displayName}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  view: {
    paddingTop: 20,
    alignItems: 'center',
  },

  profile_pic: {
    width: 80,
    height: 80,
    borderRadius: 90,
  },

  wt_text: {
    paddingTop: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },

  dt_text: {
    paddingTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})