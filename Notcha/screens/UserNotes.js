import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Alert, ToastAndroid, Text } from "react-native";
import { MaterialStyles } from "../utils/MaterialDesign";
import { PrimaryButton, SecondaryButton } from "../utils/Components/CustomButtons";
import Separator from "../utils/Components/Separator";
import { AppContext } from "../Context";

export default function UserNotes({navigation}) {

  let btns = []

  // Gerando os botões de place holder
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

  const darkTheme = useContext(AppContext).darkTheme;
  const [pageTheme, setPageTheme] = useState(darkTheme ? MaterialStyles.dt_background : MaterialStyles.wt_background);

  useEffect(() => {
    setPageTheme(darkTheme ? MaterialStyles.dt_background : MaterialStyles.wt_background);
  }, [darkTheme]);

  return(
    <ScrollView style={pageTheme}>
      <View style={Styles.topView}>
        <Text style={{color: 'black'}}>{}</Text>
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