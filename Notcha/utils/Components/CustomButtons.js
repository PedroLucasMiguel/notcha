import React from "react";
import { 
  View,
  TouchableHighlight,
  Pressable,
  Text,
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { MaterialColors } from "../MaterialDesign";

function CustomButton(props) {

  if (props.iconName) {
    return(
      <View style={{
          paddingRight: props.padding,
          paddingLeft: props.padding,
        }}>
        <TouchableHighlight 
          onPress={props.onPress}
          style={{
              borderRadius: props.borderRadius,
              width: props.width,
              height: props.height,
            }}
        >
          <View
            style={{
              height: props.height,
              width: props.width,
              backgroundColor: props.color,
              justifyContent: 'center',
              borderRadius: props.borderRadius,
            }}
          >
            <MaterialCommunityIcons 
              style={{alignSelf: 'center'}} 
              name={props.iconName}
              color={props.iconColor} 
              size={((props.height + props.width)/2)/props.iconDownScale} 
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }


  return(
    <View style={{
        paddingRight: props.padding,
        paddingLeft: props.padding,
      }}>
      <TouchableHighlight 
        onPress={props.onPress}
        
        style={{
            borderRadius: props.borderRadius,
          }}
      >
        <View
          style={{
            height: props.height,
            width: props.width,
            backgroundColor: props.color,
            justifyContent: 'center',
            borderRadius: props.borderRadius,
          }}
        >
          <Text
            style={{
              color: props.textColor,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: props.fontSize,
            }}
          >
              {props.title}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}


function CustomPressableButton(props) {
  return(
    <View style={{
        paddingRight: props.padding,
        paddingLeft: props.padding,
      }}>
      <Pressable 
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        style={{
            borderRadius: props.borderRadius,
          }}
      >
        <View
          style={{
            height: props.height,
            width: props.width,
            backgroundColor: props.color,
            justifyContent: 'center',
            borderRadius: props.borderRadius,
          }}
        >
          <Text
            style={{
              color: props.textColor,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: props.fontSize,
            }}
          >
              {props.title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

// ------------------------------------------------------

function PrimaryButton(props) {

  /*
    Props:
      - title
      - width
      - height
      - padding
      - fontSize
      - onPress
  */

  return(
    <CustomButton
      color={MaterialColors.purple_200}
      textColor='#000000' 
      title={props.title}
      width={props.width}
      height={props.height}
      padding={props.padding}
      fontSize={props.fontSize}
      onPress={props.onPress}
      borderRadius={20}
    />
  );
}

function SecondaryButton(props) {

  /*
    Props:
      - title
      - width
      - height
      - padding
      - fontSize
      - onPress
      - onLongPress
  */

  return(
    <CustomPressableButton
      color={MaterialColors.purple_100}
      textColor='#000000' 
      title={props.title}
      width={props.width}
      height={props.height}
      padding={props.padding}
      fontSize={props.fontSize}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      borderRadius={20}
    />
  );
}

function RoundIconButton(props) {

  /*
    Props:
      - icon
      - size
      - iconName
      - iconColor
      - onPress
  */

  return(
    <CustomButton
      color={props.color} 
      iconName={props.iconName}
      iconColor={props.iconColor}
      iconDownScale={1.7}
      width={props.size}
      height={props.size}
      padding={props.padding}
      onPress={props.onPress}
      borderRadius={60}
    />
  );
}

export { PrimaryButton, SecondaryButton, RoundIconButton };