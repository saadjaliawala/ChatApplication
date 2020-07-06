import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootreducer from './rootreducer';

const middleware = applyMiddleware(thunk);

export default store = createStore(rootreducer, middleware);