
  export const UserDetails = (UserDetails) => {
     
    //  let arr
    return dispatch => {
      dispatch({
        type: 'User_Details',
        payload: UserDetails
      })
    } 
   }