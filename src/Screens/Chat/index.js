import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TouchableOpacity
  } from 'react-native';

  
  import React , {useEffect , useState} from 'react';
  import {LoginManager} from 'react-native-fbsdk';
  import auth from '@react-native-firebase/auth';
  import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
  import store from '../../redux/store.js';
import { Abcd } from '../../redux/actions/index.js';
import {UserDetails} from '../../redux/actions/UserDetails.js';
import firestore from '@react-native-firebase/firestore';
// import { TouchableOpacity } from 'react-native-gesture-handler';



const ChatScreen = () => {


  const [FirebaseUser , SetFirebaseUser] = useState();
  const [isDidUpdate , SetDidUpdate] = useState(true);
  const [ChattedUser , SetChattedUser] = useState();


  useEffect(() => {
   
       
    // store.subscribe(() => {
    //   // alert("saad");
    //   SetFirebaseUser(store.getState().UserDetails);
      
    // } )

      // SetDidUpdate(false);
      console.log("saad1" , store.getState().UserDetails );
      let LoginedUser = store.getState().UserDetails;
       SetFirebaseUser(store.getState().UserDetails);
      firestore()
      .collection('Users')
      .doc(LoginedUser?.user?.uid)
      
      .onSnapshot(Data => {
        let array = [];
       { Data._data.ChatId  && 
        Data?._data?.ChatId.map((Datas) => {
          array.push({ name: Datas.name , pushKey: Datas.pushKey , uid: Datas.uid  , photoUrl: Datas.photoUrl })
          // console.log(Datas);
        } )
      
      }
        SetChattedUser(array);
        console.log( "chatted arrays" , array);
        
      } )

    
    
    

  }, [])

    const SignOut = async () => {
      store.dispatch(UserDetails(null));
        LoginManager.logOut();
        auth().signOut();
        await GoogleSignin.signOut();
      }

      const _renderButton = () => {
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


      const _renderChattedUser = () => {
        return(
          <View>
            { ChattedUser?.map(( Users ) => {
        return(
          // <View>
             <TouchableOpacity><Text>{Users.name}</Text></TouchableOpacity>
            //  </View>
        )
      }) }
          </View>
        )
      }


    return(
      <View>

      { _renderButton() }

      {_renderChattedUser()}
      </View>
    )
  }

  
  export default ChatScreen;