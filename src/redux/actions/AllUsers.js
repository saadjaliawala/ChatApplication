
  export const AllUsers = (AllUsers) => {

    // console.log("action", AllUsers);

    return dispatch => {
      dispatch({
        type: 'All_Users',
        payload: AllUsers
      })
    } 
   }

   
  export const AllDummyUsers = (AllDummyUsers) => {



    return dispatch => {
      dispatch({
        type: 'All_Dummy_Users',
        payload: AllDummyUsers
      })
    } 
   }