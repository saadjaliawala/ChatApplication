
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
import {UserDetails} from './src/redux/actions/index.js';


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

    SetFirebaseUser(FirebaseUser);
      // console.log(FirebaseUser);
      store.dispatch(UserDetails(FirebaseUser));
      const { user } = FirebaseUser.user;
      console.log(user);

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
