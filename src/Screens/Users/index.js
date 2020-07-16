import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TouchableOpacity,
    Image
  } from 'react-native';

  
  import React , { useEffect , useState } from 'react';
  import firestore from '@react-native-firebase/firestore';
  import {AllUsers} from '../../redux/actions/AllUsers.js';
import store from '../../redux/store.js';
import styles from './style.js';



const UsersScreen = (props) => {

  const [isDidUpdate , SetDidUpdate] = useState(true);
  const [AllFirebaseUsers , SetAllFirebaseUsers] = useState({});

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
      console.log("saad" , AllFirebaseUsers);

      }, [])

      const _renderHeader = () => {
        return (
          <View>
            <View style={{ height: 45 , border: 1 , borderRadius: 20 , borderWidth: 2 ,
              marginTop: '2%' , borderColor: 'lightgrey' , marginHorizontal: '1%' }} >

            </View>
            <Text>Header</Text>
          </View>
        )
      }

const _renderUsers = () => {

  return(
    <View>
       {/* <Text>Users Screen</Text> */}
      {/* { console.log(AllFirebaseUsers) } */}
      {
        AllFirebaseUsers?.user?.map((users) => {
          return(
              <TouchableOpacity
              onPress={() => props.navigation.navigate('ChatBox' , {users} )}
              >
                <Text>{users.email}</Text>
                <Text>{users.name}</Text>
                <Image 
                  source= {{ uri: users.photoUrl }}
                  style={styles.userImage}
                />

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