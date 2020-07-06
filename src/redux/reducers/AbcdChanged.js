const reducer = (state = {}, action) => {
  // console.log(action); 
  switch (action.type) {

      case 'Abcd_Changed': {
        return {...state, user: action.payload};
      }
      // case 'REMOVE_USER': {
      //   return {...state, user: null};
      // }

      case 'User_Details': {
        return {...state, user: action.payload}
      }

      default: {
        return state;
      }
    }
  };
  
  export default reducer;
