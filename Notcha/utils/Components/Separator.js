// From: https://stackoverflow.com/questions/43380260/draw-horizontal-rule-in-react-native
import React from "react"
import {View, Text} from "react-native"

export default function Separator(props) {
  return(
    <View style={{
        flexDirection: 'row', 
        alignItems: 'center',
        paddingTop: props.padding,
        paddingBottom: props.padding,
      }}
    >
      <View style={{
          flex: 1, 
          height: 1, 
          backgroundColor: 'black'
        }} 
      />
      <View>
        <Text style={{
            width: 60,
            fontSize: 20, 
            textAlign: 'center',
            color: '#000000'
          }}>
          {props.text}
        </Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
  );
}
