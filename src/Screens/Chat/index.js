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
    Modal,
    TextInput
  } from 'react-native';

  
  import React , {useEffect , useState} from 'react';
  import {LoginManager} from 'react-native-fbsdk';
  import auth from '@react-native-firebase/auth';
  import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
  import store from '../../redux/store.js';
import { Abcd } from '../../redux/actions/index.js';
import {UserDetails} from '../../redux/actions/UserDetails.js';
import {AllUsers} from '../../redux/actions/AllUsers.js';
import firestore from '@react-native-firebase/firestore';
// import firebase from '@react-native-firebase/firebase';
import moment from 'moment';
import styles from './style.js';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {SearchAction} from '../../redux/actions/SearchAction.js';



const ChatScreen = (props) => {


  const [FirebaseUser , SetFirebaseUser] = useState();
  const [isDidUpdate , SetDidUpdate] = useState(true);
  const [ChattedUser , SetChattedUser] = useState([]);
  const [GroupChatModal , SetGroupChatModal ] = useState(false);
  const [GroupPhotoUrl , SetGroupPhotoUrl ] = useState(); 
  const [GroupName , SetGroupName ] = useState();
  const [AllFirebaseUsers , SetAllFirebaseUsers] = useState({});
  const [ InputValue , SetInputValue ] = useState();
  const [DummyAllFirebaseUsers , SetDummyAllFirebaseUsers ] = useState();
  const [UserSelected , SetUserSelected  ] = useState();
  const [DummyChattedUser , SetDummyChattedUser ] = useState();
  const [NewDummy , SetNewDummy] = useState();

  useEffect(() => {
   
      
    
    
      let LoginedUser = store.getState().UserDetails;
       SetFirebaseUser(store.getState().UserDetails);
      firestore()
      .collection('Users')
      .doc(LoginedUser?.user?.uid)
      
      .onSnapshot(Data => {
        let array = [];
       { Data?._data?.ChatId  && 
        Data?._data?.ChatId.map((Datas) => {
          if(Datas.GroupName) {
            array.push({ name: Datas.GroupName , pushKey: Datas.pushKey , lastMessage: Datas.lastMessage
            , uid: Datas.CreatorUid , AllUids: Datas.AllUids , photoUrl: Datas.GroupPhotoUrl  })
          }
          else {
          array.push({ name: Datas.name , pushKey: Datas.pushKey , uid: Datas.uid  
            , photoUrl: Datas.photoUrl , lastMessage: Datas.lastMessage  , timeStamp: Datas.timeStamp })
          }
          
        } )
      
      }
        SetChattedUser(array);
        // console.log( "chatted arrays" , array);
        // SetGroupChatModal(false);
        
      } )
      
      // console.log(store.getState().AllUsers , "sasd12" );
      SetAllFirebaseUsers(store.getState().AllUsers);
      //  console.log(store.getState().AllUsers);
      store.subscribe(() => {
        SetAllFirebaseUsers(store.getState().AllUsers);
        
      } )
      
    
    

  }, [])
  const SearchFunction = (text) => {
    // 503033568
    store.dispatch(SearchAction(text));
  }

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

      const GroupChat = () => {
        // alert("group chat");
        SetGroupChatModal(true);
      }

      const ImagePickerFunction = async () => {
        // alert("image picker");
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then( async image => {
          // console.log(image.path);
          const reference = storage().ref('images/' + new Date().getTime());
          await reference.putFile(image.path);
          const url = await reference.getDownloadURL();
          console.log(url);
          SetGroupPhotoUrl(url);
          
        });
      } 

      const NavigateToChatBox = (Users) => {
        // console.log(Users , "abcjhb");
        if(Users.AllUids) {
          // alert("check");
          let users = {
            name: Users.name,
            uid: Users.uid,
            photoUrl: Users.photoUrl,
            Group: true,
            AllUids: Users.AllUids,
            pushKey: Users.pushKey,

          }
          props.navigation.navigate('ChatBox' , {users} )

        }
        else {
        let users = {
          name: Users.name,
          uid: Users.uid,
          photoUrl: Users.photoUrl,
        }
        props.navigation.navigate('ChatBox' , {users} )

      }
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
          <ScrollView>
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
          </ScrollView>
        )
      }
      

      const _renderGroupChat = () => {
        return(
          <View  >
            <TouchableOpacity onPress={() => GroupChat() } style={{ height: 50 , width: 50 , borderRadius: 50 ,
               backgroundColor: 'black'  , alignSelf: 'flex-end' , position: 'absolute' , bottom: 10  }} ></TouchableOpacity>
          </View>
        )
      }

      const CreateGroup = async () => {
        // console.log(AllFirebaseUsers.user);
        console.log("firebase" , FirebaseUser.user.uid);
        let array = [FirebaseUser.user.uid];
        if(GroupName && GroupPhotoUrl  )
        {
          let uidfilter = AllFirebaseUsers.user.filter((v, i) => {
            // return v.onSelected == true;
            if(v.onSelected) {
              array.push(v.uid);
            }
          } )
          const pushKey = await firestore()
          .collection('Chat')
          .add({})

          let pushedKey = pushKey._documentPath?._parts[1];
          array.map((v,i) => {
            console.log(v);
            firestore()
            .collection('Users')
            .doc(v)
            .update({ 
              ChatId: firestore.FieldValue.arrayUnion({
                CreatorUid: FirebaseUser?.user?.uid ,
                AllUids: array ,
                GroupName: GroupName,
                GroupPhotoUrl: GroupPhotoUrl ,
                pushKey: pushedKey
              })
            })
          } )
          SetGroupChatModal(false);
          let users = {
            name: GroupName,
            uid: FirebaseUser.user.uid,
            photoUrl: GroupPhotoUrl,
            Group: true,
            AllUids: array,
            pushKey: pushedKey,
          }

          //  console.log(array);
       
        // alert("create group");
        // console.log(AllFirebaseUsers.dummyuser);
        store.dispatch(AllUsers(AllFirebaseUsers.dummyuser)); 
        SetGroupName('');
        SetGroupPhotoUrl('');
        let AllUser = store.getState().AllUsers.user;
          AllUser.map(( v, i ) => {
            v.onSelected = false;
          } )
          // console.log(AllUser);
          store.dispatch(AllUsers(AllUser));
          
          props.navigation.navigate('ChatBox' , {users} )

        }
        else {
        
          
          // console.log(array);
          // alert("Either Groou");
          
        }
      }

      const CloseModal = () => {

        SetGroupChatModal(false);
        // console.log(AllFirebaseUsers.dummyuser);
        store.dispatch(AllUsers(AllFirebaseUsers.dummyuser));
        // console.log(store.getState().AllUsers);
          // store.dispatch(AllUsers(NewDummy));
          // console.log(NewDummy);
      }


      const _renderModal = () => {
        return(
          <Modal
          animationType = "slide"
          isVisible = {true}
          onRequestClose= { () => {  } }
          transparent = {true}r

          >
            <View
          style={{ flex:1 , backgroundColor: 'rgba(0,0,0,0.4)' }}
            
            >
            <View style={{  backgroundColor: 'white' , flex: 1 , marginTop: '30%' , borderTopLeftRadius: 20 , borderTopRightRadius: 20 }} >
            <Ionicons  
            size = {35}
            color = "blue"
            name ="md-close-outline"
            onPress={() => CloseModal() }
            style= {{ alignSelf: 'flex-end' }}
            />


            {/* <Text>saad</Text> */}
            <View style={{ flexDirection: 'row' , alignItems: 'center' , justifyContent: 'space-between' , marginTop: 25 }} >
              <View>
          <Ionicons 
          size={45}
          color = "blue"
          name ="image-outline"
          onPress = {() => ImagePickerFunction() }
          />
          </View>
          <View style={{ height: 50 , width: '70%' , borderWidth: 1.5 , borderColor: 'lightgrey' , borderRadius: 20 }} >
            
          <TextInput 
          placeholder="Group Name"
          onChangeText ={ (text) => { SetGroupName(text) } }
          value={GroupName}
          />
          </View>
          <View>
            <Ionicons 
            name="send"
            size={30}
            color = "blue"
            onPress={ () => CreateGroup() }
            />

          </View>
         

          </View>
          <View>
            
            {_renderFindFriends()}
          </View>
          <View>
            {_renderUsers()}
          </View>
          </View>
            </View>
          </Modal>
        )}

       const ModalToChatBox = (users , index ) => {
        //  SetGroupChatModal(false);
        //  props.navigation.navigate('ChatBox' , {users})
        console.log(users);
        let counter ;
        let AllUser = store.getState().AllUsers.user;
        let DummyUser = store.getState().AllUsers.dummyuser;
        // console.log( "checking" , AllUser);
        let filterArray = AllUser.filter((v, i) => {
          return v.onSelected == true;
        }) 
          console.log("filter" , filterArray.length);
        // if()
        //  console.log(AllUsers?.user[index].name);
        if(filterArray.length+1 < 4 )
        {
          AllUser[index].onSelected = !AllUser[index].onSelected ;
        }
        else if(users.onSelected){
          AllUser[index].onSelected = !AllUser[index].onSelected ;

        }
        else  {
                  alert("you can select more than 3 peoples"); 
        }
        
        store.dispatch(AllUsers([...AllUser]));

       } 

        
const _renderUsers = () => {
  // console.log( "all users" , AllFirebaseUsers?.user);
  return(

    <View>
      
      {
        
        AllFirebaseUsers?.user?.map((users , index ) => {
          // console.log("modalusers" , users );
          return(
              <TouchableOpacity
              onPress={() => ModalToChatBox(users , index )   }
              >
                <View style={{ flexDirection: 'row' , padding: 10 , alignItems: 'center' , justifyContent: 'space-between'  }} > 
                  
                <View style={{ flexDirection: 'row' , alignItems: 'center'  }} >
                  <View  >
                <Image 
                  source= {{ uri: users.photoUrl }}
                  style={styles.userImage}
                />
                </View>
                <View style={{   }} >
                <Text style={{ fontSize: 17 , marginLeft: 15  }} >{users.name}</Text>
                </View>
                </View>
                { users.onSelected && 
                <View  style={{   }} >
                <FontAwesome5 
                name="check-circle"
                color = "blue"
                size = {28}
                />
              </View>  }
                
                </View>

              </TouchableOpacity>
          );
        })
      }
     
     
    </View>
  )
  
} 

      

      const _renderFindFriends = () => {
        return (
          <View>
            <View style={{ height: 45 , border: 1 , borderRadius: 20 , borderWidth: 1 , elevation: 1 ,
              marginTop: '5%' , borderColor: 'lightgrey' , marginHorizontal: '1%' , flexDirection: 'row' , 
              alignItems: 'center', marginBottom: 20   }} >

                <EvilIcons 
                name = "search"
                size ={35}
                color ="grey"
                // onPress={() => SearchFunction() }
                />

              <TextInput 
              onChangeText = { (text) => SearchFunction(text) }
              placeholder= "Find Friends"
              style={styles.InputStyle}
              value={InputValue}

              />

            </View>
            {/* <Text>Header</Text> */}
          </View>
        )
      }


    return(
      <View style={{ flex:1 }} >
        { _renderHeader() }

      { _renderButton() }

      {_renderChattedUser()}
      {_renderGroupChat()}
      {GroupChatModal && _renderModal() }
      </View>
    )
  }

  
  export default ChatScreen;