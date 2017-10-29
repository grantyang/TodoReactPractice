import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers/index.js';
import thunk from 'redux-thunk';

// The Store is the object that brings them together. The store has the following responsibilities:
// Holds application state;
// Allows access to state via getState();
// Allows state to be updated via dispatch(action);
// Registers listeners via subscribe(listener);
// Handles unregistering of listeners via the function returned by subscribe(listener).

// You may optionally specify the initial state as the second argument to createStore().
// This is useful for hydrating the state of the client to match the state of a Redux application running on the server.

export default createStore(
  allReducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
 
);

///
//other files import store from here, can call as store since referring to createStore(). this is not exported as a function that needs to be called