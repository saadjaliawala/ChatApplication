import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';

  
  import React , {useEffect , useState} from 'react';
  import {LoginManager} from 'react-native-fbsdk';
  import auth from '@react-native-firebase/auth';
  import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
  import store from '../../redux/store.js';
import { Abcd } from '../../redux/actions/index.js';
import {UserDetails} from '../../redux/actions/UserDetails.js';



const ChatScreen = () => {


  const [FirebaseUser , SetFirebaseUser] = useState();
  const [isDidUpdate , SetDidUpdate] = useState(true);


  useEffect(() => {
   
    if(isDidUpdate)
    {
      SetDidUpdate(false);

     store.subscribe(() => {

      console.log("saad1" , store.getState().UserDetails )
      
      SetFirebaseUser(store.getState().UserDetails);
  
    })
    // console.log("saad" , FirebaseUser);
    
  }
  }, [])

    const SignOut = async () => {
      store.dispatch(UserDetails(null));
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