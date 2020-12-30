
import { createStore, combineReducers } from 'redux';
import { Reducer, Reducer1, Reducer2, Reducer3 } from '../reducers/reducer';

const reducer = combineReducers({
    store: Reducer,
    store1: Reducer1,
    store2: Reducer2,
    store3: Reducer3
})
let store = createStore(reducer);

export default store;