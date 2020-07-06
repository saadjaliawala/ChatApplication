const reducer = (state = {}, action) => {
    // console.log(action); 
    switch (action.type) {
  
      
  
        case 'User_Details': {
          return {...state, user: action.payload}
        }
  
        default: {
          return state;
        }
      }
    };
    
    export default reducer;
  