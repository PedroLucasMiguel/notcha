import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Alert, ToastAndroid, Text } from "react-native";
import { MaterialStyles } from "../utils/MaterialDesign";
import { PrimaryButton, SecondaryButton } from "../utils/Components/CustomButtons";
import Separator from "../utils/Components/Separator";
import { AppContext } from "../Context";

export default function UserNotes({navigation}) {

  var RNFS = require('react-native-fs');
  const darkTheme = useContext(AppContext).darkTheme;
  const refreshNotes = useContext(AppContext).refreshNotes;
  const [pageTheme, setPageTheme] = useState(darkTheme ? MaterialStyles.dt_background : MaterialStyles.wt_background);

  const [btns, setBtns] = useState([])

  useEffect(() => {
    setPageTheme(darkTheme ? MaterialStyles.dt_background : MaterialStyles.wt_background);
  }, [darkTheme]);

  useEffect(() => {
    
    async function getFiles() {
      let fnames = await RNFS.readdir(RNFS.DocumentDirectoryPath)

      let fnamesAux  = []

      for(let i = 0; i < fnames.length; i++) {
        if (fnames[i].endsWith('.html')) {
          fnamesAux.push(fnames[i].split('.')[0])
        }
      }

      // Gerando os botões de place holder
      let btnAux = []
      for(let i = 0; i < fnamesAux.length; i++) {
        btnAux.push(
          <View style={{paddingTop: 5}} key={i}>
            <SecondaryButton
              title={fnamesAux[i]}
              padding={30}
              height={60}
              fontSize={20}
              onPress={() => navigation.navigate('NoteEditor', {fileName: fnamesAux[i]})}
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

      setBtns(btnAux)
    } 
    
    getFiles()

    return

  }, [refreshNotes])

  return(
    <ScrollView style={pageTheme}>
      <View style={Styles.topView}>
        <Text style={{color: 'black'}}>{}</Text>
        <PrimaryButton
          title='Create a note'
          padding={30}
          height={60}
          fontSize={20}
          onPress={() => navigation.navigate('NoteEditor', {newFile: true})}
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