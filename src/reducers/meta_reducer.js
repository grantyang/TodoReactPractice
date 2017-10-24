//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const MetaReducer = (
  // Information about the model
  state = {
    loading: true,
    updating: false,
    currentUser: null
  },
  action
) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return { ...state, currentUser: action.data };

    case 'USER_LOGIN_FAILURE':
      alert('Please Log In.');
      return state;

    case 'LOAD_ALL_LISTS_SUCCESS':
      return { ...state, loading: false };

    case 'LOAD_ALL_LISTS_FAILURE':
      return { ...state, loading: false };

    case 'LOAD_LIST_SUCCESS':
      return { ...state, loading: false };

    case 'LOAD_LIST_FAILURE':
      return { ...state, loading: false };

    case 'UPDATE_LIST_REQUEST':
      return { ...state, updating: true };

    case 'UPDATE_LIST_SUCCESS':
      return { ...state, updating: false };

    default:
      return state;
  }
};

export default MetaReducer;
