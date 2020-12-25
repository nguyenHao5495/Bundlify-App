
import { createStore, combineReducers } from 'redux';
import { Reducer, Reducer1, Reducer2 } from '../reducers/reducer';

const reducer = combineReducers({
    store: Reducer,
    store1: Reducer1,
    store2: Reducer2
})
let store = createStore(reducer);

export default store;