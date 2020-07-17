const reducer = (state = {}, action) => {
    // console.log(action); 
    switch (action.type) {
  
      
  
        case 'All_Users': {
          return {...state, user: action.payload}
        }
        case 'All_Dummy_Users': {
          return {...state, dummyuser: action.payload}
        }
  
        default: {
          return state;
        }
      }
    };
    
    export default reducer;
  