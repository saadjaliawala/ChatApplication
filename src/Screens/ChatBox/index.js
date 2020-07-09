import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image
  } from 'react-native';

  
  import React , {useEffect , useState} from 'react';
  import store from '../../redux/store.js';
  import {UserDetails} from '../../redux/actions/UserDetails.js';
  import styles from './style.js';
  import Header from '../../components/Header/index.js';



const ChatBoxScreen = (props) => {

    const [ChatUser , SetChatUser] = useState();
    const [CurrentUser , SetCurrentUser] = useState();

    useEffect(() => {
        console.log("chat user" , props.route.params);
        SetChatUser( props.route.params);

        SetCurrentUser(store.getState().UserDetails);
 },[])

    const _renderFunction = () => {
      console.log("current user" , CurrentUser);
        return(
            <View>
              {/* <Text>ChatBox Screen</Text> */}
              {/* <Image 
              source= {{ uri: ChatUser.users?.phot }}
              /> */}
         {ChatUser && <Header 
         props = {props}
          ChatUser={ChatUser}
          />}
        {/* {ChatUser && <Image 
        source={{ uri: ChatUser.users?.photoUrl }}
        style={styles.ChatUserImage}
        />}
              
        {ChatUser&&<Text>{ChatUser.users?.name}</Text>} */}
       

            </View>
          )}

    return(
       _renderFunction()
    )}

  export default ChatBoxScreen;