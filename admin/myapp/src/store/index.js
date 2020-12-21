
import { createStore, combineReducers } from 'redux';
import { Reducer, Reducer1 } from '../reducers/reducer';

const reducer = combineReducers({
    store: Reducer,
    store1: Reducer1
})
let store = createStore(reducer);

export default store;