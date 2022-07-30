import React, { useRef, useState, useContext, useEffect } from "react";
import { ScrollView, TextInput, Text, View, StyleSheet, ToastAndroid, Alert } from "react-native";
import { MaterialStyles, MaterialColors } from "../utils/MaterialDesign";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from "../Context";

/*
  Essa é a tela de edição de notas.

  Ela permite que sejam criadas novas notas, ou então, que notas já existentes sejam editadas.

  O editor de texto usado é o chamado "react-native-pell-rich-editor", cujo GitHub pode
  ser encontrado aqui: https://github.com/wxik/react-native-rich-editor/
*/

async function saveFile(fileName, text, RNFS) {
  await RNFS.writeFile(RNFS.DocumentDirectoryPath + '/' + fileName + '.html', text, 'utf8')
  .then(() => { Alert.alert('File saved succefuly!', RNFS.DocumentDirectoryPath + '/' + fileName + '.html') })
  .catch(() => { Alert.alert('Error to save file') })
}

export default function NoteEditor({route, navigation}) {

  var RNFS = require('react-native-fs');
  const theme = useContext(AppContext).darkTheme;
  const setRefreshNotes = useContext(AppContext).setRefreshNotes;
  const refreshNotes = useContext(AppContext).refreshNotes;
  const [pageTheme, setPageTheme] = useState(theme ? [MaterialStyles.dt_background, Styles.dt_file_name] : [MaterialStyles.wt_background, Styles.wt_file_name]);
  const richText = useRef(null);
  const editorView = useRef(null);
  const [fileName, setFileName] = useState(route.params.newFile ? 'NewFile' : route.params.fileName);
  const [editorText, setEditorText] = useState('');

  useEffect(() => {
    
    async function fetchText() {
      RNFS.readFile(RNFS.DocumentDirectoryPath + '/' + fileName + '.html', 'utf8')
      .then(text => {setEditorText(text)})
    }
    
    // Apenas tenta carregar as informações se não for um arquivo novo
    if (!route.params.newFile)
      fetchText();

  },[])

  // Hook que realiza a atualização do tema caso ele tenha sido alterado
  useEffect(() => {
    setPageTheme(theme ? [MaterialStyles.dt_background, Styles.dt_file_name] : [MaterialStyles.wt_background, Styles.wt_file_name]);
  }, [theme])

  return(
    <ScrollView 
      style={pageTheme[0]}
      ref={editorView}
      onContentSizeChange={ () => editorView.current.scrollToEnd({ animated: false })}
    >
      <View style={Styles.file_name_view}>
        <Text style={pageTheme[1]}>File name:</Text>
        <TextInput 
          defaultValue={fileName}
          style={Styles.file_name_field}
          onChangeText={setFileName}
        />
      </View>
      <View style={Styles.editor_view}>
        <RichEditor
          ref={richText}
          initialHeight={200}
          onChange={ 
            descriptionText => {
                setEditorText(descriptionText);
            }
          }
          initialContentHTML={editorText}
          pasteAsPlainText={true}
          initialFocus={true}
        />
        
        <RichToolbar
            editor={richText}
            actions={
              [ 
                actions.undo, 
                actions.redo,
                actions.setBold, 
                actions.setItalic, 
                actions.setUnderline, 
                actions.heading1, 
                'save', 
              ]
            }
            iconMap={
              { 
                [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), 
                save: ({tintColor}) => (<MaterialCommunityIcons name="content-save" color={tintColor} size={25} />),
              }
            }
            save={
              () => { 
                saveFile(fileName, editorText, RNFS)
                setRefreshNotes(!refreshNotes)
              }
            }
          />

      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  file_name_view: {
    backgroundColor: MaterialColors.purple_200,
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

  wt_file_name: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom: 10,
  },

  dt_file_name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom: 10,
  },

  file_name_field: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 15,
    color: '#000000',
    fontSize: 15,
  },

  editor_view: {
    backgroundColor: MaterialColors.purple_200,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    marginTop: 10,
    borderRadius: 10,
  },

});