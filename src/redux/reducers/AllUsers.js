const reducer = (state = {}, action) => {
    // console.log(action); 
    switch (action.type) {
  
      
  
        case 'All_Users': {
          return {...state, user: action.payload}
        }
  
        default: {
          return state;
        }
      }
    };
    
    export default reducer;
  