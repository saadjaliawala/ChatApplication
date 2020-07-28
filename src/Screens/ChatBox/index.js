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
import LottieView from 'lottie-react-native';

// import av from '../../'
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
  const [GroupChat , SetGroupChat ] = useState(false);
  const [GroupPushKey , SetGroupPushKey] = useState();
  const [IsTyping , SetIsTyping] = useState();


  useEffect(() => {
      // console.log("chat user" , props.route.params);
      const CurrentChatUserInApp = props.route.params;
      SetChatUser( props.route.params );
      const CurrentUserInApp = store.getState().UserDetails;
      SetCurrentUser(store.getState().UserDetails);
      // console.log(store.getState().UserDetails);


    // console.log( "123" , CurrentChatUserInApp?.users?.AllUids);

    if(CurrentChatUserInApp?.users?.AllUids)
    {
      SetGroupChat(true);
      SetGroupPushKey(CurrentChatUserInApp?.users?.pushKey);
      // console.log(CurrentChatUserInApp?.users?.pushKey);
      alert("if");
      firestore()
      .collection('Chat')
      .doc(CurrentChatUserInApp?.users?.pushKey)
      .collection('Messages')
      .orderBy("timeStamp" , "asc")
      .onSnapshot(Data => {
        // console.log(Data, "sa");
        let array = [];
        
        Data.forEach(( Datas ) => {
          array.push({ 
            message: Datas._data.message , 
            senderUid: Datas._data.senderUid ,
            timeStamp: Datas._data.timeStamp,
            senderName: Datas._data.senderName,
            })
         
        } )
        SetUserMessages(array);
      } )
    }




    else {
// alert("else");

      let isTypingPushKey ;
      let isTypingBool ;

       firestore()
 .collection('Users')
 .doc(CurrentUserInApp.user?.uid)
 .onSnapshot(Data => {
  //  console.log(Data);
   if(Data._data?.ChatId)
   {
     SetChatIdBool(true);
    Data._data.ChatId.map((ddata) => {
     
      if(ddata.uid == CurrentChatUserInApp?.users?.uid )
      {
        // alert("Uid true");
        SetPushedKey(ddata.pushKey);
        SetUidBool(true);
        // isTypingBool = true;
        // isTypingPushKey = ddata.pushKey;
        firestore()
        .collection('Chat')
        .doc(ddata.pushKey)
        .onSnapshot(IsTypingCheck => {
          // console.log("idk " , IsTypingCheck._data.[CurrentChatUserInApp?.users?.uid] );
          // console.log("idk " , IsTypingCheck?._data?.[CurrentUserInApp?.user?.uid] );
          SetIsTyping( IsTypingCheck?._data?.[CurrentChatUserInApp?.users?.uid]);
        })

        firestore()
      .collection('Chat')
        .doc(ddata.pushKey)
        .collection('Messages')
        .orderBy("timeStamp" , "asc")
        .onSnapshot(Data => {
          
          let array = [];
          Data.forEach(Datas => {
 
            array.push({ message: Datas._data.message , 
            senderUid: Datas._data.senderUid ,
            timeStamp: Datas._data.timeStamp,
            })
            
            
          })
          SetUserMessages(array);
         
        })

      }
     
    })
   }
   else {
    // SetUidBool(false);
     SetChatIdBool(false);
    //  alert("chat id and uid false");
   }
 })   

 


    }


},[])


const SendButtonPress = async () => {
//  const messages = {
//   message: Textvalue,
//   senderUid: CurrentUser.user?.uid ,
//   senderName: CurrentUser.user?.displayName,
//  }

 if(! ChatIdBool  && !GroupChat )
 {
// alert("Chat id false run");
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

// alert("send else run");
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
   name: CurrentUser.user?.displayName , pushKey: pushKey._documentPath?._parts[1] ,photoUrl: CurrentUser.users?.photoUrl ,
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
    // console.log(Data.pushKey == PushedKey );
    // console.log("data", Data );
    if(Data.pushKey == PushedKey)

    {

      index = i;
      CHATID[i].lastMessage = Textvalue;
      // console.log("CHAT ID DONE " , CHATID);
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
        .update({ChatId: CHATSIDS})

      }

    })

  } )
}


if(GroupChat)
{
  firestore()
.collection('Chat')
.doc(GroupPushKey)
.collection('Messages')
.add({
  message: Textvalue,
  senderUid: CurrentUser.user?.uid ,
  senderName: CurrentUser.user?.displayName,
  timeStamp : firestore.FieldValue.serverTimestamp(),
})


// alert("group chat");
let array = ChatUser.users.AllUids;
console.log(array );
for(let i=0 ; i<array.length; i++)
{
  console.log(i);
  let CHATID;
  firestore()
  .collection('Users')
  .doc(array[i])
  .get()
  .then(querySnapshot => {
    // console.log(querySnapshot);
     CHATID =   querySnapshot._data?.ChatId;
     querySnapshot._data?.ChatId?.map((Data , index) => {
      
      if(Data.pushKey == GroupPushKey) {
        // console.log(i);
        // console.log("abc");
        // indexs = i;
        CHATID[index].lastMessage = Textvalue;
        // console.log("CHAT ID DONE " , CHATID);
        firestore()
        .collection('Users')
        .doc(array[i])
        .update({ChatId: CHATID})

      }

    })
  })

}

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

        const TextChange = (text) => {
          onChangeText(text);
          let CHATID ;
            let index;
            if(UidBool)
            {
              let uid = CurrentUser.user?.uid;
              // alert("SAaaaaaa");
              firestore()
              .collection('Chat')
              .doc(PushedKey)
              .set({ [CurrentUser.user?.uid] : true })
              // .add({ IsTyping: true })

              setTimeout(() => {
                let uid = CurrentUser.user?.uid;
              // alert("SAaaaaaa");
              firestore()
              .collection('Chat')
              .doc(PushedKey)
              .set({ [CurrentUser.user?.uid] : false })
                
              }, 3000);

            }
            }


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
        onChangeText =  {(text) => TextChange(text) } 
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
           
         )}


      const _renderMessages = () => {
        // console.log("user messages" , UserMessages );
        return(
          <ScrollView style={{   }} > 
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
                  { messages.senderName && <Text style={{ color: 'white' }} >{messages.senderName}</Text>}
                <Text>{messages.message}</Text>
                </View>
                )

             }

            })}
          </ScrollView>
        )
      }   

      const _renderIsTyping = () => {
        return(
          // <View style={{    height: 35 }} >
        <LottieView
        loop
         autoPlay
        source={require('../../assets/typing.json')}
        style={{  width: 50 , height: 50 , paddingLeft: 5   }}
      />

          // </View>
   
        )
      }


  return(
    <View style={{flex: 1 }} >

      { _renderFunction()}
      { _renderMessages()}
      { IsTyping && _renderIsTyping()  }
      { _renderInput()}
    </View>
    
  )}

export default ChatBoxScreen;