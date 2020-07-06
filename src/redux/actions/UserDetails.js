
  export const UserDetails = (UserDetails) => {

    return dispatch => {
      dispatch({
        type: 'User_Details',
        payload: UserDetails
      })
    } 
   }