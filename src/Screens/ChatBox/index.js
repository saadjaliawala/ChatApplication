import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TextInput,
  Alert
} from 'react-native';


import React , {useEffect , useState} from 'react';
import store from '../../redux/store.js';
import {UserDetails} from '../../redux/actions/UserDetails.js';
import styles from './style.js';
import Header from '../../components/Header/index.js';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
// import styles from './style.js';



const ChatBoxScreen = (props) => {

  const [ChatIdBool , SetChatIdBool] = useState();
  const [UidBool , SetUidBool] = useState();
  // let ChatIdBool = '';
  // let UidBool = '';
  const [ChatUser , SetChatUser] = useState();
  const [CurrentUser , SetCurrentUser] = useState();
  const [Textvalue, onChangeText] = useState();
  const [PushedKey , SetPushedKey] = useState();
  const [UserMessages , SetUserMessages ] = useState([]);

  useEffect(() => {
      // console.log("chat user" , props.route.params);
      const CurrentChatUserInApp = props.route.params;
      SetChatUser( props.route.params);
      const CurrentUserInApp = store.getState().UserDetails;
      SetCurrentUser(store.getState().UserDetails);



       firestore()
 .collection('Users')
 .doc(CurrentUserInApp.user?.uid)
 .onSnapshot(Data => {
  //  console.log(Data);
   if(Data._data?.ChatId)
   {
     SetChatIdBool(true);
    Data._data.ChatId.map((ddata) => {
      console.log(ddata.uid , "Chat id k andaar adeen ki uid");
      console.log(CurrentChatUserInApp?.users?.uid , "login kra hoa banda ki uid adeen");
      if(ddata.uid == CurrentChatUserInApp?.users?.uid )
      {
        // alert("Uid true");
        SetPushedKey(ddata.pushKey);
        SetUidBool(true);
        let array = [];
        firestore()
      .collection('Chat')
        .doc(ddata.pushKey)
        .collection('Messages')
        .onSnapshot(Data => {
          Data.forEach(Datas => {
            console.log(Datas);
          })
        })
        

      }
      else {
        SetUidBool(false);
        alert("uid falase impo");
      }
    })
   }
   else {
    // SetUidBool(false);
     SetChatIdBool(false);
     alert("chat id and uid false");
   }
 })   






},[])


const SendButtonPress = async () => {
//  const messages = {
//   message: Textvalue,
//   senderUid: CurrentUser.user?.uid ,
//   senderName: CurrentUser.user?.displayName,
//  }

 if(! ChatIdBool  )
 {
alert("Chat id false run");
 const pushKey = await firestore()
 .collection('Chat')

  .add({ })

 firestore()
 .collection('Chat')
 .doc(pushKey._documentPath?._parts[1]) 
 .collection('Messages')
 .add({
   message: Textvalue,
  senderUid: CurrentUser.user?.uid ,
  senderName: CurrentUser.user?.displayName,
})

firestore()
.collection('Users')
.doc(CurrentUser?.user?.uid)

.update({
  ChatId: firestore.FieldValue.arrayUnion({ uid: ChatUser.users?.uid , name: ChatUser.users?.name ,
     pushKey: pushKey._documentPath?._parts[1] })
})

firestore()
.collection('Users')
.doc(ChatUser.users?.uid)
.update({
  ChatId: firestore.FieldValue.arrayUnion ({ uid: CurrentUser.user?.uid , 
    name: CurrentUser.user?.displayName , pushKey: pushKey._documentPath?._parts[1] })
  
})

}

 if (!UidBool && ChatIdBool ) {

alert("send else run");
const pushKey = await firestore()
.collection('Chat')

 .add({ })

firestore()
.collection('Chat')
.doc(pushKey._documentPath?._parts[1]) 
.collection('Messages')
.add({
  message: Textvalue,
 senderUid: CurrentUser.user?.uid ,
 senderName: CurrentUser.user?.displayName,
})

firestore()
.collection('Users')
.doc(CurrentUser?.user?.uid)

.update({
 ChatId: firestore.FieldValue.arrayUnion({ uid: ChatUser.users?.uid , name: ChatUser.users?.name ,
    pushKey: pushKey._documentPath?._parts[1] })
})

firestore()
.collection('Users')
.doc(ChatUser.users?.uid)
.update({
 ChatId: firestore.FieldValue.arrayUnion ({ uid: CurrentUser.user?.uid , 
   name: CurrentUser.user?.displayName , pushKey: pushKey._documentPath?._parts[1] })
 
})


}

if(UidBool  )
{
  alert("send uid true run");
// alert("booltrue");
firestore()
.collection('Chat')
.doc(PushedKey)
.collection('Messages')
.add({
  message: Textvalue,
  senderUid: CurrentUser.user?.uid ,
  senderName: CurrentUser.user?.displayName,
})
}  



 
}


  const _renderFunction = () => {
    // console.log("current user" , CurrentUser);
      return(
          <View> 
       {ChatUser && <Header 
       props = {props}
        ChatUser={ChatUser}
        />}
          </View>
        )}

       const _renderInput = () => {
         return(
           <View style={ styles.InputViewParent } >
             <Entypo 
             name= "emoji-happy"
             size= {25}
             color = 'grey' 
             style={{ paddingLeft: 10 }}
             />
              <TextInput 
        onChangeText =  {(text) => onChangeText(text) } 
        multiline={true}
        style= {styles.InputStyle}
        placeholder= "Type a message"
        // value={value}
        />
        <Ionicons 
        name="send"
        size = {25}
        color= 'blue'
        style={styles.sendStyle } 
        onPress={() => SendButtonPress() }
        />
           </View>
         )}

  return(
    <View style={{flex: 1 ,  borderWidth: 5}} >

      { _renderFunction()}
      { _renderInput()}
    </View>
    
  )}

export default ChatBoxScreen;