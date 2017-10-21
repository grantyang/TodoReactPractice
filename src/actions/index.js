//Actions are payloads of information that send data from your application to your store.
//They are the only source of information for the store. You send them to the store using store.dispatch().

import { callJSON } from '../ajax_utility.js';
/*
 * action types
 */
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS'
export const UPDATE_LIST_FAILURE = 'UPDATE_LIST_FAILURE'
export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS'
export const LOAD_LIST_FAILURE = 'LOAD_LIST_FAILURE'
export const DELETE_LIST_SUCCESS = 'DELETE_ALL_TODO_SUCCESS'
export const DELETE_ALL_TODO_SUCCESS = 'DELETE_ALL_TODO_SUCCESS'
export const DELETE_COMPLETED_TODO_SUCCESS = 'DELETE_COMPLETED_TODO_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'

/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
 */

export function updateTodoList(dispatch, listName, todoList, callback) { 
  return callJSON('PUT', `list/${listName}`, todoList)
    .then(res => res.json())
    .then(
      data => dispatch({ type: UPDATE_LIST_SUCCESS, data }),
      err => dispatch({ type: UPDATE_LIST_FAILURE, err })
    );
}

export function addTodo(dispatch, listName, todoObj) { 
  return callJSON('POST', `list/${listName}`, todoObj)
    .then(res => res.json())
    .then(
      data => dispatch({ type: ADD_TODO_SUCCESS, data }),
      err => dispatch({ type: ADD_TODO_FAILURE, err })
    );
}

export function deleteList(dispatch, listName) { 
  return callJSON('DELETE', `list/${listName}`
)
    .then(
      () => dispatch({ type: DELETE_LIST_SUCCESS }),
      err => dispatch({ type: DELETE_FAILURE, err })
    );
}

export function deleteAllTodos(dispatch, listName) { 
  return callJSON('DELETE', `list/${listName}?all=true`
)
    .then(
      () => dispatch({ type: DELETE_ALL_TODO_SUCCESS }),
      err => dispatch({ type: DELETE_FAILURE, err })
    );
}

export function deleteCompletedTodos(dispatch, listName) { 
  return callJSON('DELETE', `list/${listName}?completed=true`
)
    .then(
      () => dispatch({ type: DELETE_COMPLETED_TODO_SUCCESS }),
      err => dispatch({ type: DELETE_FAILURE, err })
    );
}


export function toggleTodo(index) {
  //index to become id
  return {
    type: TOGGLE_TODO,
    index
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
}

export function loadData(dispatch, listName) { // needs to dispatch, so it is first argument
  return callJSON('GET', `list/${listName}`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: LOAD_LIST_SUCCESS, data }),
      err => dispatch({ type: LOAD_LIST_FAILURE, err })
    );
}




 