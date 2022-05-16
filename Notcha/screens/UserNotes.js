import React from "react";
import { ScrollView, View, StyleSheet, Alert, ToastAndroid } from "react-native";
import { MaterialStyles } from "../utils/MaterialDesign";
import { PrimaryButton, SecondaryButton } from "../utils/Components/CustomButtons";
import Separator from "../utils/Components/Separator";

export default function UserNotes({navigation}) {

  let btns = []

  // Generating the buttons
  for(let i = 1; i <= 10; i++) {
    btns.push(
      <View style={{paddingTop: 5}} key={i}>
        <SecondaryButton
          title={'Note' + i}
          padding={30}
          height={60}
          fontSize={20}
          onPress={() => navigation.navigate('NoteEditor', {fileName: 'Note' + i, initialText: '<h1>Note' + i + '</h1>'})}
          onLongPress={() => Alert.alert(
              'Note' + i + ' options:',
              'Do you want to remove that note?',
              [
                {
                  text: 'Yes',
                  onPress: () => ToastAndroid.showWithGravityAndOffset(
                    'Work in Progress!',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    30,
                  )
                },
              
                {
                  text: 'No'
                }
              ]
            )
          }
      />
      </View>
    );
  }

  return(
    <ScrollView style={MaterialStyles.wt_background}>
      <View style={Styles.topView}>
        <PrimaryButton
          title='Create a note'
          padding={30}
          height={60}
          fontSize={20}
          onPress={() => navigation.navigate('NoteEditor', {fileName: 'NewFile', initialText: ''})}
        />
      </View>
      <Separator text='Your notes'/>
      <View style={Styles.bottomView}>
        {btns}
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  topView: {
    paddingTop:25, 
    paddingBottom: 20,
  },

  bottomView: {
    paddingTop: 15,
  }
});