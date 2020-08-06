
  export const ChatsUser = (ChatsUser) => {

   
    // console.log( "chating" , ChatsUser);
    //  let arr
    return dispatch => {
      dispatch({
        type: 'Chats_User',
        payload: ChatsUser
      })
    } 
   }