
  export const AllUsers = (AllUsers) => {

    // console.log("action", AllUsers);

    return dispatch => {
      dispatch({
        type: 'All_Users',
        payload: AllUsers
      })
    } 
   }