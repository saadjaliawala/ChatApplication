const reducer = (state = {}, action) => {

    
    // console.log(action); 
    switch (action.type) {
  
    
  

        case 'Chats_User': {
          return {...state, user: action.payload}
        }
  
        default: {
          return state;
        }
      }
    };
    
    export default reducer;
  