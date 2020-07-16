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
import moment from 'moment';
// import firebase from '@react-native-firebase/firebase';
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
      console.log("chat user" , props.route.params);
      const CurrentChatUserInApp = props.route.params;
      SetChatUser( props.route.params);
      const CurrentUserInApp = store.getState().UserDetails;
      SetCurrentUser(store.getState().UserDetails);
      // console.log(store.getState().UserDetails);



       firestore()
 .collection('Users')
 .doc(CurrentUserInApp.user?.uid)
 .onSnapshot(Data => {
  //  console.log(Data);
   if(Data._data?.ChatId)
   {
     SetChatIdBool(true);
    Data._data.ChatId.map((ddata) => {
      // console.log(ddata.uid , "Chat id k andaar adeen ki uid");
      // console.log(CurrentChatUserInApp?.users?.uid , "login kra hoa banda ki uid adeen");

      // const Filter = ddata.filter(v => {
      //   console.log("filter" , v);
      // })
      if(ddata.uid == CurrentChatUserInApp?.users?.uid )
      {
        // alert("Uid true");
        SetPushedKey(ddata.pushKey);
        SetUidBool(true);
        
        

        firestore()
      .collection('Chat')
        .doc(ddata.pushKey)
        .collection('Messages')
        .orderBy("timeStamp" , "asc")
        .onSnapshot(Data => {
          
          let array = [];
          Data.forEach(Datas => {
            
            // console.log(Datas);
            array.push({ message: Datas._data.message , 
            senderUid: Datas._data.senderUid ,
            timeStamp: Datas._data.timeStamp,
            })
            
            
          })
          SetUserMessages(array);
         
        })
       

       
        

      }
      // else {
      //   SetUidBool(false);
      //   alert("uid falase impo");
      // }
    })
   }
   else {
    // SetUidBool(false);
     SetChatIdBool(false);
    //  alert("chat id and uid false");
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
  timeStamp : firestore.FieldValue.serverTimestamp(),
})

firestore()
.collection('Users')
.doc(CurrentUser?.user?.uid)

.update({
  ChatId: firestore.FieldValue.arrayUnion({ uid: ChatUser.users?.uid , name: ChatUser.users?.name ,
     pushKey: pushKey._documentPath?._parts[1] ,photoUrl: ChatUser.users?.photoUrl ,
     lastMessage: Textvalue ,  timeStamp : new Date().getTime()  })
})

firestore()
.collection('Users')
.doc(ChatUser.users?.uid)
.update({
  ChatId: firestore.FieldValue.arrayUnion ({ uid: CurrentUser.user?.uid , 
    name: CurrentUser.user?.displayName , pushKey: pushKey._documentPath?._parts[1] ,photoUrl: ChatUser.users?.photoUrl ,
    lastMessage: Textvalue ,  timeStamp : new Date().getTime()
  })
  
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
 timeStamp : firestore.FieldValue.serverTimestamp(),
})

firestore()
.collection('Users')
.doc(CurrentUser?.user?.uid)

.update({
 ChatId: firestore.FieldValue.arrayUnion({ uid: ChatUser.users?.uid , name: ChatUser.users?.name ,
    pushKey: pushKey._documentPath?._parts[1] ,photoUrl: ChatUser.users?.photoUrl ,
    lastMessage: Textvalue ,  timeStamp : new Date().getTime() })
})

firestore()
.collection('Users')
.doc(ChatUser.users?.uid)
.update({
 ChatId: firestore.FieldValue.arrayUnion ({ uid: CurrentUser.user?.uid , 
   name: CurrentUser.user?.displayName , pushKey: pushKey._documentPath?._parts[1] ,photoUrl: ChatUser.users?.photoUrl ,
   lastMessage: Textvalue ,  timeStamp : new Date().getTime()  })
 
})


}

if(UidBool  )
{
  // alert("send uid true run");
// alert("booltrue");
firestore()
.collection('Chat')
.doc(PushedKey)
.collection('Messages')
.add({
  message: Textvalue,
  senderUid: CurrentUser.user?.uid ,
  senderName: CurrentUser.user?.displayName,
  timeStamp : firestore.FieldValue.serverTimestamp(),
})
let CHATID  ;
let index;
firestore()
.collection('Users')
.doc(CurrentUser?.user?.uid)
.get()
.then(querySnapshot => {
  CHATID = querySnapshot._data?.ChatId;
  // console.log(CHATID , "chatt id" );
  // console.log( "query" ,querySnapshot);
  querySnapshot._data?.ChatId?.map((Data , i) => {
    console.log(Data.pushKey == PushedKey );
    // console.log("data", Data );
    if(Data.pushKey == PushedKey)

    {

      index = i;
      CHATID[i].lastMessage = Textvalue;
      console.log("CHAT ID DONE " , CHATID);
      firestore()
      .collection('Users')
      .doc(CurrentUser?.user?.uid)
      .update({ChatId: CHATID})
    
    }
  })
})

  let CHATSIDS ;
  let indexs;

  firestore()
  .collection('Users')
  .doc(ChatUser.users?.uid)
  .get()
  .then(querySnapshot => {
    CHATSIDS = querySnapshot._data?.ChatId;

    querySnapshot._data?.ChatId?.map((Data , i) => {
      
      if(Data.pushKey == PushedKey) {
        indexs = i;
        CHATSIDS[i].lastMessage = Textvalue;
        // console.log("CHAT ID DONE " , CHATID);
        firestore()
        .collection('Users')
        .doc(ChatUser.users?.uid)
        .update({ChatId: CHATID})

      }

    })

  } )



}

onChangeText("");

 
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
           <View style={{  }} >
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
        value={Textvalue}
        />
        <Ionicons 
        name="send"
        size = {25}
        color= 'blue'
        style={styles.sendStyle } 
        onPress={() => SendButtonPress() }
        />
           </View>
           </View>
         )}


      const _renderMessages = () => {
        // console.log("user messages" , UserMessages );
        return(
          <ScrollView style={{ marginBottom: 62 }} > 
            {UserMessages?.map((messages) => {
              let seconds= messages?.timeStamp?.seconds;
              let usetime = moment(seconds * 1000).fromNow();
              if(CurrentUser.user.uid == messages.senderUid )

             {
              return(
                <View  >
                <View style={{ alignSelf: "flex-end" , padding: 15  , backgroundColor: 'blue' , minWidth: 100,
                 marginTop: 20, marginRight: 10, borderTopRightRadius: 25 , borderTopLeftRadius: 24  , borderBottomLeftRadius: 24  }} >
                <Text style={{ color: 'white' }} >{messages.message}</Text>
                </View>
                <View style={{ alignSelf: 'flex-end' , marginRight: 12 }} > 
                <Text style={{ color: 'grey'  }} >{usetime}</Text>
                </View>
                </View>
                )
             }
             else {
              return(
                <View style={{ alignSelf: "flex-start" , padding: 15  , backgroundColor: 'blue' ,
                margin: 10 , borderTopRightRadius: 25 , borderTopLeftRadius: 24  , borderBottomLeftRadius: 24  }} >
                <Text>{messages.message}</Text>
                </View>
                )

             }

            })}
          </ScrollView>
        )
      }   



  return(
    <View style={{flex: 1 ,  borderWidth: 5}} >

      { _renderFunction()}
      { _renderMessages()}
      { _renderInput()}
    </View>
    
  )}

export default ChatBoxScreen;