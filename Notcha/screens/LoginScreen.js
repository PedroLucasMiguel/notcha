import React, { useContext, useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, Image, ToastAndroid, View } from "react-native";
import { PrimaryButton, RoundIconButton } from "../utils/Components/CustomButtons";
import { MaterialColors } from "../utils/MaterialDesign";
import Separator from "../utils/Components/Separator";
import { AppContext } from "../Context";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Função responsável pelo processo de login com conta google
export async function googleLogin(setGoogleUser) {
  // Recebe o ID do token do usuário
  const { idToken } = await GoogleSignin.signIn();

  // Cria uma credencial google com o token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Autentica o usuário adiciona o mesmo no context
  // Isso permite que qualquer tela tenha acesso ao usuário
  setGoogleUser((await auth().signInWithCredential(googleCredential)))
}

// Função responsável pelo processo de sign out da conta google
export async function googleSignOut(setGoogleUser) {
  await GoogleSignin.signOut();

  setGoogleUser(null);
}

export default function Login({navigation}) {

  // Verifica se o usuário possui os serviços da Google instalados no seu dispositivo.
  // Em caso negativo, ele impede o usuário de utilizar a aplicação.
  // Isso é necessário pois não é possível realizar o login com a Google sem os serviços instalados.
  GoogleSignin.hasPlayServices({ autoResolve: true, showPlayServicesUpdateDialog: true })

  // Configurando API
  GoogleSignin.configure({
      webClientId: '1003019054639-8j3j71ck41vuf233nuedjgdvf5qio2ad.apps.googleusercontent.com',
  });

  const googleUser = useContext(AppContext).googleUser;
  const setGoogleUser = useContext(AppContext).setGoogleUser;

  const theme = useContext(AppContext).darkTheme;
  const [pageTheme, setPageTheme] = useState(theme ? [Styles.dt_main_view, Styles.dt_login_text, '#FFFFFF'] : [Styles.wt_main_view, Styles.wt_login_text, '#000000']);

  // Hook que realiza a atualização do tema caso ele tenha sido alterado
  useEffect(() => {
    setPageTheme(theme ? [Styles.dt_main_view, Styles.dt_login_text, '#FFFFFF'] : [Styles.wt_main_view, Styles.wt_login_text, '#000000']);
  }, [theme]);

  return(
    
    <ScrollView style={pageTheme[0]}>
      <View style={Styles.about_view}>
        <RoundIconButton
          color={MaterialColors.purple_100}
          iconName='information-variant'
          iconColor={pageTheme[2]}
          size={40}
          onPress={() => navigation.navigate('AboutScreen')}
        />
      </View>
      <Image 
        source={require('../assets/Logo.png')} 
        style={Styles.logo}
      />
      <Text style={pageTheme[1]}>Welcome to Notcha</Text>
      <PrimaryButton
        title='Login as Google'
        padding={30}
        height={60}
        fontSize={20}
        onPress={() => {
          googleLogin(setGoogleUser).then(() => {
            console.log('Signed in with Google!');
            navigation.navigate('NotesHome');
          });
        }}
      />
      <Separator 
        text='Or'
        padding={10}
      />
      <PrimaryButton
        title='Login as Guest'
        padding={30}
        height={60}
        fontSize={20}
        onPress={() => {
          // Caso o usuário (por algum motivo) decida usar a seção guest ao invés da google
          // realiza o logout seguro.
          if (googleUser != null) {
            googleSignOut(setGoogleUser)
          }
          navigation.navigate('NotesHome');
        }}
      />
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  wt_main_view: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
  },

  dt_main_view: {
    backgroundColor: '#000000',
    paddingTop: 5,
  },

  wt_login_text: {
    color: '#000000',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 55,
    paddingTop: 10,
  },

  dt_login_text: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 55,
    paddingTop: 10,
  },

  logo: {
    paddingTop: 100,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },

  btn: {
    paddingTop: 50,
  },

  about_view: {
    marginLeft: '87%',
  }

});