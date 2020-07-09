import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image
  } from 'react-native';

  
  import React , { useEffect , useState } from 'react';
  import styles from './style.js';
  import Feather from 'react-native-vector-icons/Feather';



const Header = (props) => {

    const [ChatUser , SetChatUser] = useState();
    const [thisProps , SetProps] = useState();

    useEffect(() => {
        SetChatUser(props);
        console.log("from props" , props);

        SetProps(props.props);
       
    },[])

    const GoBacks = () => {
      props.props.navigation.goBack();

    }

    return(
      <View>
        {/* <Text>Header Screen</Text> */}
        
        <View style={styles.headerStyle} >
        {thisProps && <Feather 
          name="arrow-left"
          size =  {25}
          onPress= {() => GoBacks()  }
        />}
         {ChatUser && <Image 
        source={{ uri: ChatUser.ChatUser.users?.photoUrl }}
        style={styles.ChatUserImage}
        />}
              
        {ChatUser&&<Text>{ChatUser.ChatUser.users?.name}</Text>}

        
        </View>
       
        

      </View>
    )
  }

  
  export default Header;