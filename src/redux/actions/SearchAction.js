import store from '../store.js';
import { AllUsers } from '../actions/AllUsers';


export const SearchAction = (text) => {

let AllFirebaseUsers = store.getState().AllUsers;
    // console.log("action", AllUsers);

    return dispatch => {
        let filter = AllFirebaseUsers?.dummyuser?.filter((v, i) => {
         

            return v.name.toLowerCase().startsWith(text.toLowerCase())
   
           })
        //    console.log(filter);
           dispatch(AllUsers(filter));
    } 
   }