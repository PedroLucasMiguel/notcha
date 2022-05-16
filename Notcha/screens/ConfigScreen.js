import React, {useState} from "react";
import { ScrollView, View, Text, StyleSheet, Switch, ToastAndroid, TextInput } from "react-native";
import { PrimaryButton } from "../utils/Components/CustomButtons";
import { MaterialStyles, MaterialColors } from "../utils/MaterialDesign";

function wipMessage() {
  ToastAndroid.showWithGravityAndOffset(
    "Work in Progress!",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    30,
  );
}

export default function ConfigScreen() {
  const [darkThemeSwitch, setDarkThemeSwitch] = useState(false)

  return(
    <ScrollView style={MaterialStyles.wt_background}>
      <View style={Styles.section_view}>
        <Text style={Styles.section_title}>
          Theming
        </Text>
        <View style={Styles.section_inside_view}>
          <Text style={Styles.section_item}>Use Dark theme: </Text>
          <Switch 
            onValueChange={(v) => setDarkThemeSwitch(v)}
            onChange={wipMessage} 
            value={darkThemeSwitch}
            thumbColor={MaterialColors.purple_700} 
            trackColor={MaterialColors.purple_500}
          />
        </View>
      </View>

      <View style={Styles.section_view}>
        <Text style={Styles.section_title}>
          Files
        </Text>
        <View>
          <Text style={Styles.section_item}>Default new file name: </Text>
          <TextInput defaultValue='NewFile' style={Styles.file_name_field} />
        </View>
      </View>

      <View style={Styles.sync_view}>
        <PrimaryButton
            title='Sync with cloud'
            padding={30}
            height={60}
            fontSize={20}
            onPress={wipMessage}
          />
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

  section_title: {
    color: '#000000',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 20,
  },

  section_item: {
    color: '#000000',
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