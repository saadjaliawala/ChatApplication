import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';

  
  import React from 'react';
  import {LoginManager} from 'react-native-fbsdk';
  import auth from '@react-native-firebase/auth';
  import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';



const ChatScreen = () => {

    const SignOut = async () => {
        LoginManager.logOut();
        auth().signOut();
        await GoogleSignin.signOut();
      }

    return(
      <View>
        <Text>Chat Screen</Text>
        <Button
        title="SignOut"
        onPress={() => SignOut()}
      />
      </View>
    )
  }

  
  export default ChatScreen;