import React, { useRef, useState } from "react";
import { 
  ScrollView,
  TextInput, 
  Text,
  View,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { MaterialStyles, MaterialColors } from "../../utils/MaterialDesign";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NoteEditor({route, navigation}) {
  const richText = useRef(null);
  const editorView = useRef(null);
  const [editorText, setEditorText] = useState('');

  return(
    <ScrollView 
      style={MaterialStyles.wt_background}
      ref={editorView}
      onContentSizeChange={ () => editorView.current.scrollToEnd({ animated: false })}
    >
      <View style={Styles.file_name_view}>
        <Text style={Styles.file_name}>File name:</Text>
        <TextInput 
          defaultValue={route.params.fileName}
          style={Styles.file_name_field}
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
          initialContentHTML={route.params.initialText}
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
                ToastAndroid.showWithGravityAndOffset(
                  "Work in Progress!",
                  ToastAndroid.SHORT,
                  ToastAndroid.TOP,
                  25,
                  30,
                );
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

  file_name: {
    color: '#000000',
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