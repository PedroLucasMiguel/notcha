import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Switch } from "react-native";
import { MaterialStyles, MaterialColors } from "../utils/MaterialDesign";
import { AppContext } from '../Context'

export default function ConfigScreen() {

  const googleUser = useContext(AppContext).googleUser;

  const { darkTheme, setDarkTheme } = useContext(AppContext);
  const [pageTheme, setPageTheme] = useState(darkTheme ? [MaterialStyles.dt_background, Styles.dt_section_title, Styles.dt_section_item] : [MaterialStyles.wt_background, Styles.wt_section_title, Styles.wt_section_item]);

  const [darkThemeSwitch, setDarkThemeSwitch] = useState(false)

  // Hook que realiza a atualização do tema caso ele tenha sido alterado
  useEffect(() => {
    setPageTheme(darkTheme ? [MaterialStyles.dt_background, Styles.dt_section_title, Styles.dt_section_item] : [MaterialStyles.wt_background, Styles.wt_section_title, Styles.wt_section_item]);
  }, [darkTheme])

  return(
    <ScrollView style={pageTheme[0]}>
      <View style={Styles.section_view}>
        <Text style={pageTheme[1]}>
          Theming
        </Text>
        <View style={Styles.section_inside_view}>
          <Text style={pageTheme[2]}>Use Dark theme: </Text>
          <Switch 
            onValueChange={(v) => {
              setDarkThemeSwitch(v);
            }}
            onChange={() => {
              if (darkTheme)
                setDarkTheme(false); 
              else
                setDarkTheme(true);
            }} 
            value={darkTheme}
            thumbColor={MaterialColors.purple_700} 
            trackColor={"#FFFFFF"}
          />
        </View>
      </View>

    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  section_view: {
    backgroundColor: MaterialColors.purple_100,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    borderRadius: 10,
    marginTop: 10,
  },

  section_inside_view: {
    flexDirection: 'row',
  },

  wt_section_title: {
    color: '#000000',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 20,
  },

  dt_section_title: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 20,
  },

  wt_section_item: {
    color: '#000000',
    fontSize: 20,
    paddingBottom: 10,
  },

  dt_section_item: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingBottom: 10,
  },

  file_name_field: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    color: '#000000',
    height: 60,
    fontSize: 20,
    borderRadius: 5,
  },

  sync_view: {
    marginTop: 70,
  }

})