import {StyleSheet} from 'react-native';
// import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    ChatUserImage: {
        height: 50,
        width: 50
    },
    InputViewParent: {
        position: 'absolute' ,
         bottom: 0 ,
        //  padding: 5,
         margin: '1%',
          width: '98%' ,
           flex: 1 ,
        //    height: 50,
           borderRadius: 20,
           borderWidth: 1,
           borderColor: 'lightgrey',
           flexDirection: 'row',
           alignItems: 'center',
           minHeight: 50,

    },

    InputStyle: {
        // height: 40,
        // borderWidth: 1,
        // borderBottomWidth: 1,
        // marginBottom: 5,
        color: 'grey',
        paddingLeft: 20,
        width: '80%',
        // minHeight: 80,
        // textColor: 'lightgrey'
        
        // width: '80%',
        // marginHorizontal: '5%'
        // alignItems: 'flex-end'     
           // alignSelf: "flex-end",
        // justifyContent: 'flex-end',
        // marginTop: '80%'
        // position: "absolute",
        // bottom: 0
    },
    sendStyle: {
        
    }
})