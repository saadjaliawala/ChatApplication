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
    TextInput
  } from 'react-native';

  
  import React , { useEffect , useState } from 'react';
  import firestore from '@react-native-firebase/firestore';
  import {AllUsers} from '../../redux/actions/AllUsers.js';
  import { UsersScreenUsers } from '../../redux/actions/AllUsers.js';
  import { SearchAction } from '../../redux/actions/SearchAction.js';
import store from '../../redux/store.js';
import styles from './style.js';
import EvilIcons from 'react-native-vector-icons/EvilIcons';



const UsersScreen = (props) => {

  const [isDidUpdate , SetDidUpdate] = useState(true);
  const [AllFirebaseUsers , SetAllFirebaseUsers] = useState({});
  const [ InputValue , SetInputValue ] = useState();
  const [DummyAllFirebaseUsers , SetDummyAllFirebaseUsers ] = useState();

    // useEffect(() => {
    //     firestore()
    //     .collection('Users')
    //     .get()
    //     .then(querySnapshot => {
    //        let AllUsers = [];
    //        querySnapshot.forEach(documentSnapShot => {
    //         //    console.log(documentSnapShot.data());
    //            AllUsers.push(documentSnapShot.data());
    //            console.log(AllUsers);
    //        })
    //     })

    // },[])

      // useEffect(() => {
      //   if(isDidUpdate)
      //   {
      //     store.subscribe(() => {
      //       alert("saad");

      //       SetAllFirebaseUsers(store.getState().AllUsers)
      //       let FUser = store.getState().AllUsers;
      //       console.log("saad" , FUser);
            
      //       SetDidUpdate(false);

      //     } )
      //   }
      //   // console.log("all firebase uSERS" , AllFirebaseUsers);

      // },[])


      useEffect(() => {
        
      // alert("upar");

        SetDidUpdate(false);

       SetAllFirebaseUsers(store.getState().AllUsers);
      //  console.log(store.getState().AllUsers);
      store.subscribe(() => {
        SetAllFirebaseUsers(store.getState().AllUsers);

      } )
      

      }, [])

      const SearchFunction = (text) => {
        // SetInputValue(text);
                
        let filter = AllFirebaseUsers?.dummyuser?.filter((v, i) => {
         

         return v.name.toLowerCase().startsWith(text.toLowerCase())

        })
        console.log(filter);
        store.dispatch(UsersScreenUsers(filter));

        // store.dispatch(SearchAction(text));
      }

      const _renderHeader = () => {
        return (
          <View>
            <View style={{ height: 45 , border: 1 , borderRadius: 20 , borderWidth: 1 , elevation: 1 ,
              marginTop: '2%' , borderColor: 'lightgrey' , marginHorizontal: '1%' , flexDirection: 'row' , 
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

const _renderUsers = () => {

  return(
    <View>
       {/* <Text>Users Screen</Text> */}
      {/* { console.log(AllFirebaseUsers) } */}
      {
        AllFirebaseUsers?.userscreenuser?.map((users) => {
          return(
              <TouchableOpacity
              onPress={() => props.navigation.navigate('ChatBox' , {users} )}
              >
                <View style={{ flexDirection: 'row' , padding: 10  }} > 
                  
                <View>
                <Image 
                  source= {{ uri: users.photoUrl }}
                  style={styles.userImage}
                />
                </View>
                <View style={{ alignSelf: 'center' , paddingLeft: 20 }} >
                <Text style={{ fontSize: 17 }} >{users.name}</Text>
                </View>
                </View>

              </TouchableOpacity>
          );
        })
      }
     
     
    </View>
  )
  
} 

    return(
     <View>
       {_renderHeader()}
       { _renderUsers()}
       
     </View> 
    
    )
  }

  // const styles = StyleSheet.create({
  //   userImage: {
  //     height: 50,
  //     width: 50
  //   }
  // })
  export default UsersScreen;