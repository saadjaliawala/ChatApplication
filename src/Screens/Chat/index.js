import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TouchableOpacity,
    Image,
  } from 'react-native';

  
  import React , {useEffect , useState} from 'react';
  import {LoginManager} from 'react-native-fbsdk';
  import auth from '@react-native-firebase/auth';
  import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
  import store from '../../redux/store.js';
import { Abcd } from '../../redux/actions/index.js';
import {UserDetails} from '../../redux/actions/UserDetails.js';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import styles from './style.js';
import Evillcons from 'react-native-vector-icons/EvilIcons';
// import { TouchableOpacity } from 'react-native-gesture-handler';



const ChatScreen = (props) => {


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
          array.push({ name: Datas.name , pushKey: Datas.pushKey , uid: Datas.uid  
            , photoUrl: Datas.photoUrl , lastMessage: Datas.lastMessage  , timeStamp: Datas.timeStamp })
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

      const NavigateToChatBox = (Users) => {
        console.log(Users , "abcjhb");
        let users = {
          name: Users.name,
          uid: Users.uid,
          photoUrl: Users.photoUrl,
        }
        props.navigation.navigate('ChatBox' , {users} )
      }

      const _renderHeader = () => {
        return(
          <View>
            <Evillcons 
            name="search"
            size = {45}
            color =  'black'
            style={styles.HeaderStyle}
            />
            <View style={{ paddingLeft: 15 , paddingBottom: 15 }} >
              <Text style={styles.HeaderMessage} >Messages</Text>
            </View>
          </View>
        )
      }

      const _renderChattedUser = () => {
        return(
          <View>
            { ChattedUser?.map(( Users ) => {
              let fromNowTime = Users.timeStamp;
              let useTime = moment(fromNowTime).fromNow(true);
        return(
          < TouchableOpacity 
          onPress={() => NavigateToChatBox(Users) }
          style={{flexDirection:"row" ,  paddingHorizontal: 15 , paddingTop: 28 }} >
            <View style={{ width: '20%'  }} > 
            <Image 
            source ={{ uri: Users.photoUrl  }}
            style={ styles.ImageStyle }
            />
            </View>
            <View style={{ width:"80%" , flexDirection: 'column' ,  justifyContent: 'space-between'  }} >
              <View style={{ flexDirection: 'row' , justifyContent: 'space-between', width: '100%' }} >
                <View><Text style={{ fontSize: 18 }} >{Users.name}</Text></View>
                 <View><Text style={{ color: 'grey' }} >{useTime}</Text></View>
              </View>
              <View style={{  }} ><Text style={{ color: 'grey' , fontSize: 15 }} >{Users.lastMessage}</Text></View>
            </View>
            
            </TouchableOpacity>
        )
      }) }
          </View>
        )
      }


    return(
      <View>
        { _renderHeader() }

      {/* { _renderButton() } */}

      {_renderChattedUser()}
      </View>
    )
  }

  
  export default ChatScreen;