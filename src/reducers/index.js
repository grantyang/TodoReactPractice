import { combineReducers } from 'redux'
import TodoListsReducer from './todo_lists_reducer.js'
import UserReducer from './user_reducer.js'

//Actions describe the fact that something happened, but don't specify how the application's state changes in response. 
//This is the job of reducers.
//All combineReducers() does is generate a function that calls your reducers with the slices of state selected according to their keys,
// and combining their results into a single object again. Does not return obj if its reducers do not change state.

const allReducers = combineReducers({
  todoLists: TodoListsReducer,
  //meta: MetaReducer,
  user: UserReducer
  //addtl reducers go here
})
export default allReducers