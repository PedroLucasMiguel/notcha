import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Alert, ToastAndroid, Button, Text } from "react-native";
import { MaterialStyles } from "../utils/MaterialDesign";
import { PrimaryButton, SecondaryButton } from "../utils/Components/CustomButtons";
import Separator from "../utils/Components/Separator";
import { AppContext } from "../Context";
import UserPortrait from "../utils/Components/UserPortrait";
import firestore from '@react-native-firebase/firestore';

async function getFilesFromFirestore(uid) {
  const q = await firestore()
            .collection('UserFiles')
            .where("UID", '==', uid)
            .get()
  return q
}

async function removeFilesFromFirestore(uid, fileName) {
  const q = await firestore()
            .collection('UserFiles')
            .where("UID", '==', uid)
            .where("fileName", "==", fileName)
            .get()

  await firestore().collection('UserFiles').doc(q.docs[0].id).delete()
}

export default function UserNotes({navigation}) {

  const googleUser = useContext(AppContext).googleUser;

  var RNFS = require('react-native-fs');
  const darkTheme = useContext(AppContext).darkTheme;
  const refreshNotes = useContext(AppContext).refreshNotes;
  const setRefreshNotes = useContext(AppContext).setRefreshNotes;
  const [pageTheme, setPageTheme] = useState(darkTheme ? MaterialStyles.dt_background : MaterialStyles.wt_background);
  const [btns, setBtns] = useState([])

  useEffect(() => {
    setPageTheme(darkTheme ? MaterialStyles.dt_background : MaterialStyles.wt_background);
  }, [darkTheme]);

  useEffect(() => {
    
    async function getFiles() {

      // Lê os arquivos presentes no armazenamento local
      let fnames = await RNFS.readdir(RNFS.DocumentDirectoryPath)
      let fnamesAux  = []

      // Formata os nomes para serem usados nos botões
      for(let i = 0; i < fnames.length; i++) {
        if (fnames[i].endsWith('.html'))
          fnamesAux.push(fnames[i].split('.')[0])
      }

      let bkp_files = undefined;
      let bkp_files_name = []

      // Retorna todos os arquivos referentes ao usuário na database
      if (googleUser != null) {
        bkp_files = await getFilesFromFirestore(googleUser.user.uid);

        // Criando um array auxiliar com o nome de todos os arquivos no banco de dados
        for(let i = 0; i < bkp_files.docs.length; i++) {
          bkp_files_name.push(bkp_files.docs[i]._data.fileName);
        }
        
        // Verificando se existem arquivos no armazenamento local que não estão salvos na nuvem.
        // Caso existam, eles serão salvos no banco de dados.
        for(let i = 0; i < fnamesAux.length; i++) {
          if (!bkp_files_name.includes(fnamesAux[i])) {
            await RNFS.readFile(RNFS.DocumentDirectoryPath + '/' + fnamesAux[i] + '.html', 'utf8')
                  .then(text => {
                    firestore()
                    .collection('UserFiles')
                    .add({
                      UID: googleUser.user.uid,
                      fileName: fnamesAux[i],
                      content: text,
                    })
                    .then(() => {
                      ToastAndroid.showWithGravity(
                        fnamesAux[i] + " was syncronized with cloud!",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                      );
                    });
                  })
          }
        }
        
        // Após a leitura dos arquivos presentes no armazenamento local, verifica quais não estão presentes localmente
        // mas estão na database.
        if (bkp_files.docs.length != undefined) {
          for(let i = 0; i < bkp_files.docs.length; i++) {
            if (!fnamesAux.includes(bkp_files.docs[i]._data.fileName)) {
              await RNFS.writeFile(RNFS.DocumentDirectoryPath + '/' + bkp_files.docs[i]._data.fileName + '.html', bkp_files.docs[i]._data.content, 'utf8')
              fnamesAux.push(bkp_files.docs[i]._data.fileName)
              ToastAndroid.showWithGravity(
                fnamesAux[i] + " was restored from the cloud!",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            }
          }
        }
      }

      let btnAux = [];

      // Gerando os botões para cada nota encontrada no sistema
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
                  fnamesAux[i] + ' options:',
                  'Do you want to remove this note?',
                  [
                    {
                      text: 'Yes',
                      onPress: async () => {
                        if (googleUser != null) {
                          await removeFilesFromFirestore(googleUser.user.uid, fnamesAux[i])
                        }
                        await RNFS.unlink(RNFS.DocumentDirectoryPath + '/' + fnamesAux[i] + '.html')
                        .then(() => Alert.alert('File removed succefuly!'))
                        setRefreshNotes(!refreshNotes)
                      }
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
      {googleUser &&
        <UserPortrait user={googleUser.user} />
      }
      <View style={Styles.topView}>
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