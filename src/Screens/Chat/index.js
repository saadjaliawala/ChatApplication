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
  const [ChattedUser , SetChattedUser] = useState();
  const [GroupChatModal , SetGroupChatModal ] = useState(false);
  const [GroupPhotoUrl , SetGroupPhotoUrl ] = useState(); 
  const [GroupName , SetGroupName ] = useState();
  const [AllFirebaseUsers , SetAllFirebaseUsers] = useState({});
  const [ InputValue , SetInputValue ] = useState();
  const [DummyAllFirebaseUsers , SetDummyAllFirebaseUsers ] = useState();
  const [UserSelected , SetUserSelected  ] = useState();


  useEffect(() => {
   
       
    // store.subscribe(() => {
    //   // alert("saad");
    //   SetFirebaseUser(store.getState().UserDetails);
      
    // } )

      // SetDidUpdate(false);
      // console.log("saad1" , store.getState().UserDetails );
      let LoginedUser = store.getState().UserDetails;
       SetFirebaseUser(store.getState().UserDetails);
      firestore()
      .collection('Users')
      .doc(LoginedUser?.user?.uid)
      
      .onSnapshot(Data => {
        let array = [];
       { Data?._data?.ChatId  && 
        Data?._data?.ChatId.map((Datas) => {
          array.push({ name: Datas.name , pushKey: Datas.pushKey , uid: Datas.uid  
            , photoUrl: Datas.photoUrl , lastMessage: Datas.lastMessage  , timeStamp: Datas.timeStamp })
          // console.log(Datas);
        } )
      
      }
        SetChattedUser(array);
        // console.log( "chatted arrays" , array);
        // SetGroupChatModal(false);
        
      } )

      SetAllFirebaseUsers(store.getState().AllUsers);
       console.log(store.getState().AllUsers);
      store.subscribe(() => {
        SetAllFirebaseUsers(store.getState().AllUsers);

      } )
      
    
    

  }, [])

  const SearchFunction = (text) => {
   
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
      

      const _renderGroupChat = () => {
        return(
          <View  >
            <TouchableOpacity onPress={() => GroupChat() } style={{ height: 50 , width: 50 , borderRadius: 50 ,
               backgroundColor: 'black'  , alignSelf: 'flex-end' }} ></TouchableOpacity>
          </View>
        )
      }

      const CreateGroup = () => {
        console.log(AllFirebaseUsers.user);
        let array = [];
        if(GroupName && GroupPhotoUrl  )
        {
          let uidfilter = AllFirebaseUsers.user.filter((v, i) => {
            // return v.onSelected == true;
            if(v.onSelected) {
              array.push(v.uid);
            }
          } )
          console.log(array);
        // console.log(GroupName);
        // console.log(GroupPhotoUrl);
        alert("create group");
        }
        else {
          alert("Either Groou");
        }
      }

      const _renderModal = () => {
        return(
          <Modal
          animationType = "slide"
          isVisible = {true}
          onRequestClose= { () => { SetGroupChatModal(false) } }
          transparent = {true}

          >
            <View
          style={{ flex:1 , backgroundColor: 'rgba(0,0,0,0.4)' }}
            
            >
            <View style={{  backgroundColor: 'white' , flex: 1 , marginTop: '30%' , borderTopLeftRadius: 20 , borderTopRightRadius: 20 }} >
            <Ionicons  
            size = {35}
            color = "blue"
            name ="md-close-outline"
            onPress={() => { SetGroupChatModal(false) } }
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
        let AllUser = AllFirebaseUsers.user;
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
        // console.log("pata nhy" , AllUser[index]);
        store.dispatch(AllUsers(AllUser));

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