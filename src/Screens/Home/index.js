import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';
//   import { NavigationContainer } from '@react-navigation/native';
//   import { createStackNavigator } from '@react-navigation/stack';
  
import React, {useEffect , useState } from 'react';
import auth from '@react-native-firebase/auth';
  import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

  import store from '../../redux/store.js';
  import {Abcd} from '../../redux/actions/index.js';
  import {FbLogin} from '../../redux/actions/index.js';
  

//   import Navigation from './src/Navigation/Stack.js';

import {LoginManager} from 'react-native-fbsdk';

const HomeScreen = (props) => {



  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '48874566521-220kv48vh109ule8nffdhvihbc8a3l0u.apps.googleusercontent.com',
    });
      
  },[])
  



 
       const signInWithFb = () => {
         store.dispatch(FbLogin());  
       }
   
    const GoogleSignIn = async () => {
     
      try {
     
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
    
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
      // const user =  auth().signInWithCredential(googleCredential);
      // alert(JSON.stringify(user));
      // return user;

      
      }

      catch(error)
      {
        alert(error);
      }
      


    };   


    return(
      <View>
        <Text>Home Screen</Text>

        <Button
        title="SIGN IN WITH FACEBOOK"
        onPress={() => signInWithFb()}
      />
       
      <Button
        title="Go to GoogleSignIn"
        onPress={() => GoogleSignIn()}
      />


       
      </View>
    )
  }

  
  export default HomeScreen;