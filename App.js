
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect , useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigation from './src/Navigation/Stack.js';
import store from './src/redux/store';
import auth from '@react-native-firebase/auth';
import {UserDetails} from './src/redux/actions/UserDetails.js';
import {AllUsers} from './src/redux/actions/AllUsers.js';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const App = () => {

const [FirebaseUser, SetFirebaseUser] = useState();

  const [isDidUpdate , SetDidUpdate] = useState(true);

  const onAuthStateChanged = (FirebaseUser) => {

    let AllUserArray = [];

    
      console.log("firebase user " , FirebaseUser);
      if(FirebaseUser){
        // alert("Saad");
        store.dispatch(UserDetails(FirebaseUser));
      }
      SetFirebaseUser(FirebaseUser);

      if (FirebaseUser) {
        //   console.log(FirebaseUser);
        //   const { FirebaseUser } = FirebaseUser;
          firestore()
          .collection('Users')
          .doc(FirebaseUser.uid)
          .set({
              name: FirebaseUser.displayName ,
              email: FirebaseUser.email,
              photoUrl: FirebaseUser.photoURL ,
              uid: FirebaseUser.uid
          } , {merge: true} )
      }

      
      firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        
         
         querySnapshot.forEach(documentSnapShot => {
            //  console.log(documentSnapShot.data());
             if(FirebaseUser.uid != documentSnapShot.data().uid)
             {
             AllUserArray.push(documentSnapShot.data());
             }
             
         })

         store.dispatch(AllUsers(AllUserArray));
      // console.log("all user array" , AllUserArray);
        
      })
      
  }


  
useEffect(() => {
  if(isDidUpdate) 
  {
    SetDidUpdate(false);
     auth().onAuthStateChanged(onAuthStateChanged);
  }
    
},[])

return (
  <Provider store={store}>
       <Navigation user={FirebaseUser} />
  </Provider>
 
)
}

export default App;
