import { combineReducers } from 'redux'
import TodoListReducer from './todo_list_reducer.js'
import UserReducer from './user_reducer.js'
import ListsReducer from './lists_reducer.js'

//Actions describe the fact that something happened, but don't specify how the application's state changes in response. 
//This is the job of reducers.
//All combineReducers() does is generate a function that calls your reducers with the slices of state selected according to their keys,
// and combining their results into a single object again. Does not return obj if its reducers do not change state.

const allReducers = combineReducers({
  todoList: TodoListReducer,
  listOfLists: ListsReducer,
  user: UserReducer
})

export default allReducers