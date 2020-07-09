import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

import HomeScreen from '../Screens/Home';
import DetailScreen from '../Screens/Details';
import AboutScreen from '../Screens/About';
import ChatScreen from '../Screens/Chat';
import UsersScreen from '../Screens/Users';
import ChatBoxScreen from '../Screens/ChatBox';



const Navigation = (props) => {

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const ChatScreenStack = () => {
 return(

  <Stack.Navigator   >

  <Stack.Screen name="Chat" component={ChatScreen} />
  <Stack.Screen name="Users" component={UsersScreen} />
  
  
    </Stack.Navigator>
 )
}

const UserScreenStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Users" component={UsersScreen} />
      <Stack.Screen 
      options = {() => ({
        headerShown: false
      })}
      name="ChatBox" component={ChatBoxScreen} />
    </Stack.Navigator>
  )
}


const HomeScreenStack = () => {
  return (

  
    <Stack.Navigator>
    {/* <Tab.Navigator> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* <Stack.Screen name="About" component={AboutScreen} /> */}
       
        {/* </Tab.Navigator> */}
      </Stack.Navigator>
    
  )
}

const NotShowTab = ['Details','About' , 'ChatBox' ];




  const showTab = (route, array) => {


    // console.log(route.state,'saad');
    
    const RouteName = route?.state?.routes[route.state.index]?.name;
    return !array.includes(RouteName);
  };

const TabNabigator = () => {
  return(
    
    <Tab.Navigator>
      <Tab.Screen 
      name="Chat" component={ChatScreen}
      options={({route}) => ({
        tabBarVisible: showTab(route, NotShowTab),
      })}
       />
        <Tab.Screen 
      name="Users" component={UserScreenStack}
      options={({route}) => ({
        tabBarVisible: showTab(route, NotShowTab),
      })}
       />
     
    </Tab.Navigator>
    
  )
}

  const FinalStack = () => {
    const {user} = props;
    return(
      <NavigationContainer>
        <Stack.Navigator headerMode="none" >
          <Stack.Screen 
      name="LogIn Screen"
      component= { user? TabNabigator : HomeScreen }
          /> 
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <FinalStack/>
  );
}
export default Navigation;
