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
export const UPDATE_LIST_REQUEST = 'UPDATE_LIST_REQUEST';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS';
export const UPDATE_LIST_FAILURE = 'UPDATE_LIST_FAILURE';
export const LOAD_ITEM_SUCCESS = 'LOAD_ITEM_SUCCESS';
export const LOAD_ITEM_FAILURE = 'LOAD_ITEM_FAILURE';
export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS';
export const LOAD_LIST_FAILURE = 'LOAD_LIST_FAILURE';
export const LOAD_ALL_LISTS_SUCCESS = 'LOAD_ALL_LISTS_SUCCESS';
export const LOAD_ALL_LISTS_FAILURE = 'LOAD_ALL_LISTS_FAILURE';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ALL_TODO_SUCCESS = 'DELETE_ALL_TODO_SUCCESS';
export const DELETE_COMPLETED_TODO_SUCCESS = 'DELETE_COMPLETED_TODO_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
export const CREATE_LIST_SUCCESS = 'CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'CREATE_LIST_FAILURE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_EMAIL_FAILURE = 'LOGIN_USER_EMAIL_FAILURE';
export const LOGIN_USER_PASSWORD_FAILURE = 'LOGIN_USER_PASSWORD_FAILURE';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const USER_SIGNUP_FAILURE= 'USER_SIGNUP_FAILURE';
export const USER_SIGNUP_SUCCESS= 'USER_SIGNUP_SUCCESS';
export const DUPLICATE_USER= 'DUPLICATE_USER'

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
export function createList(dispatch, newList) {
  return callJSON('POST', `create`, newList)
    .then(res => res.json())
    .then(
      data => dispatch({ type: CREATE_LIST_SUCCESS, data }),
      err => dispatch({ type: CREATE_LIST_FAILURE, err })
    );
}

export function loginUser(dispatch, loginData) {
  return callJSON('POST', `login`, loginData)
    .then(res => res.text())
    .then(
      data => {
        if (data === 'email')
          dispatch({ type: LOGIN_USER_EMAIL_FAILURE, data });
        if (data === 'password')
          dispatch({ type: LOGIN_USER_PASSWORD_FAILURE, data });
        dispatch({ type: LOGIN_USER_SUCCESS, data });
      },
      err => dispatch({ type: LOGIN_USER_FAILURE, err })
    );
}

export function createNewUser(dispatch, newUser) {
  return callJSON('POST', `signup`, newUser)
    .then(res => {
      if (res.status === 401) dispatch({ type: DUPLICATE_USER }); 
      else res.json();
    })
    .then(
      data => dispatch({ type: USER_SIGNUP_SUCCESS, data }),
      err => dispatch({ type: USER_SIGNUP_FAILURE, err })
    );
}

export function updateTodoList(dispatch, listName, todoList, callback) {
  dispatch({ type: UPDATE_LIST_REQUEST });
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
      data => dispatch({ type: ADD_TODO_SUCCESS, data, listName }),
      err => dispatch({ type: ADD_TODO_FAILURE, err })
    );
}

export function updateTodoNoRedirect(dispatch, listName, todoId, newTodo) {
  return callJSON('PUT', `list/${listName}/todo/${todoId}`, newTodo)
    .then(res => res.json())
    .then(
      data => dispatch({ type: UPDATE_TODO_SUCCESS, data }),
      err => dispatch({ type: UPDATE_TODO_FAILURE, err })
    );
}

export function updateTodo(dispatch, listName, todoId, newTodo) {
  dispatch({ type: UPDATE_TODO_REQUEST });
  return callJSON('PUT', `list/${listName}/todo/${todoId}`, newTodo)
    .then(res => res.json())
    .then(
      data => dispatch({ type: UPDATE_TODO_SUCCESS, data }),
      err => dispatch({ type: UPDATE_TODO_FAILURE, err })
    );
}

export function updateUserProfile(dispatch, newUser) {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  return callJSON('PUT', `user`, newUser)
    .then(res => res.json())
    .then(
      data => dispatch({ type: UPDATE_PROFILE_SUCCESS, data }),
      err => dispatch({ type: UPDATE_PROFILE_FAILURE, err })
    );
}
export function updateUserPassword(dispatch, passwordObj) {
  dispatch({ type: UPDATE_PASSWORD_REQUEST });
  return callJSON('PUT', `user?changepassword=true`, passwordObj)
    .then(res => res.json())
    .then(
      data => dispatch({ type: UPDATE_PASSWORD_SUCCESS, data }),
      err => dispatch({ type: UPDATE_PASSWORD_FAILURE, err })
    );
}

export function deleteItem(dispatch, listName, todoId) {
  return callJSON('DELETE', `list/${listName}/todo/${todoId}`).then(
    () => dispatch({ type: DELETE_ITEM_SUCCESS }),
    err => dispatch({ type: DELETE_FAILURE, err })
  );
}
export function deleteList(dispatch, listName) {
  return callJSON('DELETE', `list/${listName}`).then(
    () => dispatch({ type: DELETE_LIST_SUCCESS }),
    err => dispatch({ type: DELETE_FAILURE, err })
  );
}

export function deleteAllTodos(dispatch, listName) {
  return callJSON('DELETE', `list/${listName}?all=true`).then(
    () => dispatch({ type: DELETE_ALL_TODO_SUCCESS }),
    err => dispatch({ type: DELETE_FAILURE, err })
  );
}

export function deleteCompletedTodos(dispatch, listName) {
  return callJSON('DELETE', `list/${listName}?completed=true`).then(
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

export function loadTodoListData(dispatch, listName) {
  // needs to dispatch, so it is first argument
  return callJSON('GET', `list/${listName}`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: LOAD_LIST_SUCCESS, data }),
      err => dispatch({ type: LOAD_LIST_FAILURE, err })
    );
}

export function loadItemData(dispatch, listName, itemId) {
  // needs to dispatch, so it is first argument
  return callJSON('GET', `list/${listName}/todo/${itemId}`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: LOAD_ITEM_SUCCESS, data }),
      err => dispatch({ type: LOAD_ITEM_FAILURE, err })
    );
}

export function loadAllTodoLists(dispatch) {
  // needs to dispatch, so it is first argument
  return callJSON('GET', `lists`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: LOAD_ALL_LISTS_SUCCESS, data }),
      err => dispatch({ type: LOAD_ALL_LISTS_FAILURE, err })
    );
}

export function loadCurrentUser(dispatch) {
  // needs to dispatch, so it is first argument
  return callJSON('GET', 'user')
    .then(res => res.json())
    .then(
      data => dispatch({ type: GET_PROFILE_SUCCESS, data }),
      err => dispatch({ type: GET_PROFILE_FAILURE, err })
    );
}
