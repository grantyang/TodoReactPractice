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
export const LOAD_LIST_TODOS_SUCCESS = 'LOAD_LIST_TODOS_SUCCESS';
export const LOAD_LIST_TODOS_FAILURE = 'LOAD_LIST_TODOS_FAILURE';
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
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_REQUEST = 'UPLOAD_PHOTO_REQUEST';
export const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_EMAIL_FAILURE = 'LOGIN_USER_EMAIL_FAILURE';
export const LOGIN_USER_PASSWORD_FAILURE = 'LOGIN_USER_PASSWORD_FAILURE';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const DUPLICATE_USER = 'DUPLICATE_USER';
export const UPDATE_AUTHORIZED_USER_LIST_SUCCESS =
  'UPDATE_AUTHORIZED_USER_LIST_SUCCESS';
export const UPDATE_AUTHORIZED_USER_LIST_FAILURE =
  'UPDATE_AUTHORIZED_USER_LIST_FAILURE';

/*
 * action creators
//  */
// export function createList(dispatch, newList) { //WITHOUT THUNK, pass in store.dispatch
//   return callJSON('POST', `create`, newList)
//     .then(res => res.json())
//     .then(
//       data => dispatch({ type: CREATE_LIST_SUCCESS, data }),
//       err => dispatch({ type: CREATE_LIST_FAILURE, err })
//     );
// }
// export function updateTodoList(listName, todoList) {
//   return dispatch => {
//     dispatch({ type: UPDATE_LIST_REQUEST });
//     return callJSON('PUT', `list/${listName}`, todoList)
//       .then(res => res.json())
//       .then(
//         data => dispatch({ type: UPDATE_LIST_SUCCESS, data }),
//         err => dispatch({ type: UPDATE_LIST_FAILURE, err })
//       );
//   };
// }
export function uploadPhoto(formData, photoType, listName, todoId) {
  return dispatch => {
    dispatch({ type: UPLOAD_PHOTO_REQUEST });
    return fetch(`http://localhost:5000/uploadPhoto?type=${photoType}&listname=${listName}&todoid=${todoId}`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
      .then(res => res.json())
      .then(
        data => dispatch({ type: UPLOAD_PHOTO_SUCCESS, data }),
        err => dispatch({ type: UPLOAD_PHOTO_FAILURE, err })
      );
  };
}

export function createList(newList) {
  return dispatch => {
    return callJSON('POST', `create`, newList)
      .then(res => res.json()) // Implicit return, if expanding out to .then(res => { /some code/ }) make sure to add return statement!
      .then(
        data => dispatch({ type: CREATE_LIST_SUCCESS, data }),
        err => dispatch({ type: CREATE_LIST_FAILURE, err })
      );
  };
}

export function loginUser(loginData) {
  return dispatch => {
    return callJSON('POST', `login`, loginData)
      .then(res => res.text())
      .then(
        data => {
          if (data === 'email')
            return dispatch({ type: LOGIN_USER_EMAIL_FAILURE, data });
          if (data === 'password')
            return dispatch({ type: LOGIN_USER_PASSWORD_FAILURE, data });
          dispatch({ type: LOGIN_USER_SUCCESS, data });
        },
        err => dispatch({ type: LOGIN_USER_FAILURE, err })
      );
  };
}

export function createNewUser(newUser) {
  return dispatch => {
    return callJSON('POST', `signup`, newUser)
      .then(res => {
        if (res.status === 401) {
          dispatch({ type: DUPLICATE_USER });
          res.end();
        }
        return res.json();
      })
      .then(
        data => dispatch({ type: USER_SIGNUP_SUCCESS, data }),
        err => dispatch({ type: USER_SIGNUP_FAILURE, err })
      );
  };
}

export function updateAuthorizedUserList(listName, newAuthorizedUserEmail) {
  return dispatch => {
    return callJSON(
      'POST',
      `listpermissions/${listName}`,
      newAuthorizedUserEmail
    )
      .then(res => {
        var contentType = res.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return res.json().then(data => {
            dispatch({ type: UPDATE_AUTHORIZED_USER_LIST_SUCCESS, data });
          });
        } else {
          return res.text().then(text => {
            if (text === 'no user') {
              dispatch({ type: UPDATE_AUTHORIZED_USER_LIST_FAILURE });
              return alert('User not found');
            }
            if (text === 'duplicate') {
              dispatch({ type: UPDATE_AUTHORIZED_USER_LIST_FAILURE });
              return alert('User already authorized');
            }
          });
        }
      })
      .catch(err => {
        return err => dispatch({ type: UPDATE_AUTHORIZED_USER_LIST_FAILURE, err });
      });
  };
}

export function updateTodoList(listName, updatedTodoList) {
  return dispatch => {
    dispatch({ type: UPDATE_LIST_REQUEST });
    return callJSON('PUT', `list/${listName}`, updatedTodoList)
      .then(res => res.json())
      .then(
        data => dispatch({ type: UPDATE_LIST_SUCCESS, data }),
        err => dispatch({ type: UPDATE_LIST_FAILURE, err })
      );
  };
}

export function addTodo(listName, todoObj) {
  return dispatch => {
    return callJSON('POST', `list/${listName}`, todoObj)
      .then(res => res.json())
      .then(
        data => dispatch({ type: ADD_TODO_SUCCESS, data }),
        err => dispatch({ type: ADD_TODO_FAILURE, err })
      );
  };
}

export function updateTodoNoRedirect(listName, todoId, newTodo) {
  return dispatch => {
    return callJSON('PUT', `list/${listName}/todo/${todoId}`, newTodo)
      .then(res => res.json())
      .then(
        data => dispatch({ type: UPDATE_TODO_SUCCESS, data }),
        err => dispatch({ type: UPDATE_TODO_FAILURE, err })
      );
  };
}

export function updateTodo(listName, todoId, newTodo) {
  return dispatch => {
    dispatch({ type: UPDATE_TODO_REQUEST });
    return callJSON('PUT', `list/${listName}/todo/${todoId}`, newTodo)
      .then(res => res.json())
      .then(
        data => dispatch({ type: UPDATE_TODO_SUCCESS, data }),
        err => dispatch({ type: UPDATE_TODO_FAILURE, err })
      );
  };
}

export function updateUserProfile(newUser) {
  return dispatch => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    return callJSON('PUT', `user`, newUser)
      .then(res => res.json())
      .then(
        data => dispatch({ type: UPDATE_PROFILE_SUCCESS, data }),
        err => dispatch({ type: UPDATE_PROFILE_FAILURE, err })
      );
  };
}

export function updateUserPassword(passwordObj) {
  return dispatch => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    return callJSON('PUT', `user?changepassword=true`, passwordObj)
      .then(res => res.json())
      .then(
        data => dispatch({ type: UPDATE_PASSWORD_SUCCESS, data }),
        err => dispatch({ type: UPDATE_PASSWORD_FAILURE, err })
      );
  };
}

export function deleteItem(listName, todoId) {
  return dispatch => {
    return callJSON('DELETE', `list/${listName}/todo/${todoId}`).then(
      () => dispatch({ type: DELETE_ITEM_SUCCESS }),
      err => dispatch({ type: DELETE_FAILURE, err })
    );
  };
}

export function deleteList(listName) {
  return dispatch => {
    return callJSON('DELETE', `list/${listName}`).then(
      () => dispatch({ type: DELETE_LIST_SUCCESS }),
      err => dispatch({ type: DELETE_FAILURE, err })
    );
  };
}

export function deleteAllTodos(listName) {
  return dispatch => {
    return callJSON('DELETE', `list/${listName}?all=true`).then(
      () => dispatch({ type: DELETE_ALL_TODO_SUCCESS }),
      err => dispatch({ type: DELETE_FAILURE, err })
    );
  };
}

export function deleteCompletedTodos(listName) {
  return dispatch => {
    return callJSON('DELETE', `list/${listName}?completed=true`).then(
      () => dispatch({ type: DELETE_COMPLETED_TODO_SUCCESS }),
      err => dispatch({ type: DELETE_FAILURE, err })
    );
  };
}

export function loadTodoListData(listName) {
  return dispatch => {
    return callJSON('GET', `list/${listName}`)
      .then(res => res.json())
      .then(
        data => dispatch({ type: LOAD_LIST_SUCCESS, data }),
        err => dispatch({ type: LOAD_LIST_FAILURE, err })
      );
  };
}

export function loadListTodos(listName) {
  return dispatch => {
    return callJSON('GET', `list/${listName}/todos`)
      .then(res => res.json())
      .then(
        data => dispatch({ type: LOAD_LIST_TODOS_SUCCESS, data }),
        err => dispatch({ type: LOAD_LIST_TODOS_FAILURE, err })
      );
  };
}

export function loadItemData(listName, itemId) {
  return dispatch => {
    return callJSON('GET', `list/${listName}/todo/${itemId}`)
      .then(res => res.json())
      .then(
        data => dispatch({ type: LOAD_ITEM_SUCCESS, data }),
        err => dispatch({ type: LOAD_ITEM_FAILURE, err })
      );
  };
}

export function loadAllTodoLists() {
  return dispatch => {
    return callJSON('GET', `lists`)
      .then(res => res.json())
      .then(
        data => dispatch({ type: LOAD_ALL_LISTS_SUCCESS, data }),
        err => dispatch({ type: LOAD_ALL_LISTS_FAILURE, err })
      );
  };
}

export function loadCurrentUser() {
  return dispatch => {
    return callJSON('GET', 'user')
      .then(res => res.json())
      .then(
        data => dispatch({ type: GET_PROFILE_SUCCESS, data }),
        err => dispatch({ type: GET_PROFILE_FAILURE, err })
      );
  };
}
