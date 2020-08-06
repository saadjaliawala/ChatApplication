
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect , useRef , useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppState,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

import Navigation from './src/Navigation/Stack.js';
import store from './src/redux/store';
import auth from '@react-native-firebase/auth';
import {UserDetails} from './src/redux/actions/UserDetails.js';
import {AllUsers} from './src/redux/actions/AllUsers.js';
import {AllDummyUsers} from './src/redux/actions/AllUsers.js';
import {UsersScreenUsers} from './src/redux/actions/AllUsers.js';


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
const appState = useRef(AppState.currentState);
const [appStateVisible, setAppStateVisible] = useState(appState.current);
const [currentUserActive , SetCurrentUserActive ] = useState();

const [settingsnapshot , setsettingsnapshot ] = useState(true);


  const onAuthStateChanged = (FirebaseUser) => {

    // console.log(FirebaseUser);

    // let AllUserArray = [];
    // console.log( "active" , currentUserActive);

    // alert("on auth state change");
    
      // console.log("firebase user " , FirebaseUser);
      if(FirebaseUser){
        // alert("Saad");
        store.dispatch(UserDetails(FirebaseUser));
        // console.log("Avv");
      }
      SetFirebaseUser(FirebaseUser);

      if (FirebaseUser  ) {
        // alert("Saad");
        //   console.log(FirebaseUser);
        //   const { FirebaseUser } = FirebaseUser;

          firestore()
          .collection('Users')
          .doc(FirebaseUser.uid)
          .set({
              name: FirebaseUser.displayName ,
              email: FirebaseUser.email,
              photoUrl: FirebaseUser.photoURL ,
              uid: FirebaseUser.uid,
              active: true
              
          } , {merge: true} )
        
      }
      
      // if(settingsnapshot) {

      //   firestore()
      // .collection('Users')
      // .onSnapshot(patanhy => {
      //   console.log("pata nhy ")
      // })

      // setsettingsnapshot(false);

      // }
      
      
      
      firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        // console.log("adcbhfb");
        var AllUserArray2 = [];
        // console.log(querySnapshot);
        querySnapshot?.forEach(Data => {
          // console.log(Data._data.uid);
                  if(FirebaseUser?.uid != Data._data.uid)
             {
              AllUserArray2.push(Data._data);
             }
        })
        store.dispatch(AllUsers(AllUserArray2));
         store.dispatch(AllDummyUsers(AllUserArray2));
         store.dispatch(UsersScreenUsers(AllUserArray2));
      } )


      // .get()
      // .then(querySnapshot => {
        
               
      //    querySnapshot.forEach(documentSnapShot => {
      //        console.log(documentSnapShot.data());
      //        if(FirebaseUser.uid != documentSnapShot.data().uid)
      //        {
      //        AllUserArray.push(documentSnapShot.data());
      //        }
             
      //    })

        //  const a = [...AllUserArray];
        //  const b = [...AllUserArray];
        // console.log("all user array" , AllUserArray);

        // store.dispatch(AllUsers(AllUserArray2));
        //  store.dispatch(AllDummyUsers(AllUserArray2));
        //  store.dispatch(UsersScreenUsers(AllUserArray2));

        //  store.dispatch(AllDummyUsers(AllUserArray));
      // console.log("all user array" , AllUserArray);
        

      // })
      
  }


  
useEffect(() => {
  if(isDidUpdate) 
  {
    console.log("abcd");
    SetDidUpdate(false);
     auth().onAuthStateChanged(onAuthStateChanged);

     SplashScreen.hide();
  }
  // AppState.addEventListener("change", _handleAppStateChange);

  // return () => {
  //   AppState.removeEventListener("change", _handleAppStateChange);
  // };


},[])


const _handleAppStateChange = (nextAppState) => {
   var User_Details ;
  
      // console.log(store.getState().UserDetails.user);
      User_Details = store.getState().UserDetails.user;

  // console.log("user deatils" , User_Details );
  if (
    appState.current.match(/inactive|background/) &&
    nextAppState === "active"
  ) {
    // console.log("App has come to the foreground!");
  }
    // console.log( "firebaseuser" , FirebaseUser);
  if(nextAppState == "active" && User_Details  )
  {
    SetCurrentUserActive(true);
    // alert("active true");
    firestore()
    .collection('Users')
    .doc(User_Details.uid)
    .update({
        
        active: true
        
    }  )
  }
  if(nextAppState == "background" && User_Details )
  {
    firestore()
    .collection('Users')
    .doc(User_Details.uid)
    .update({
        
        active: false
        
    }  )

  }
  // console.log(nextAppState);
  appState.current = nextAppState;
  setAppStateVisible(appState.current);
  // console.log("AppState", appState.current);
  
};


return (
  <Provider store={store}>
       <Navigation user={FirebaseUser} />
  </Provider>
 
)
}

export default App;
