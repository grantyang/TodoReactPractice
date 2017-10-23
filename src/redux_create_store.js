import { createStore } from 'redux';
import allReducers from './reducers/index.js';

// The Store is the object that brings them together. The store has the following responsibilities:
// Holds application state;
// Allows access to state via getState();
// Allows state to be updated via dispatch(action);
// Registers listeners via subscribe(listener);
// Handles unregistering of listeners via the function returned by subscribe(listener).


// You may optionally specify the initial state as the second argument to createStore(). 
// This is useful for hydrating the state of the client to match the state of a Redux application running on the server.


export default createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

///
//import store from this file, can call as store since referring to this store. not calling the function store directly