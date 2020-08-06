import {combineReducers} from 'redux';
import AbcdChanged from './reducers/AbcdChanged';
import UserDetails from './reducers/UserDetails';
import AllUsers from './reducers/AllUsers';
import ChatsUser from './reducers/ChatsUser';
// import AllDummyUsers from './reducers/AllUsers';
// import AuthReducer from './Reducer/AuthReducer';
// import UserReducer from './Reducer/UserReducer';
// import ActiveChatReducer from './Reducer/ActiveChatReducer';
// import ChatBoxReducer from './Reducer/ChatBoxReducer';
// import ChatDashboardReducer from './Reducer/ChatDashboardreducer';
// import AllUsersReducer from './Reducer/AllUserReducer';
// import GroupReducer from './Reducer/GroupReducer';

export default combineReducers({
AbcdChanged,
UserDetails,
AllUsers,
ChatsUser
// AllDummyUsers



//   AuthReducer,
//   UserReducer,
//   ActiveChatReducer,
//   ChatBoxReducer,
//   ChatDashboardReducer,
//   AllUsersReducer,
//   GroupReducer,
});