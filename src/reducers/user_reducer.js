//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const UserReducer = (
  // Information about the model
  state = {
    meta: { loading: true, updating: false },
    model: {
      name: '',
      email: '',
      password: '',
      userId: ''
    }
  },
  action
) => {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      return {
        meta: { ...state.meta, loading: false },
        model: {
          name: action.data.name,
          email: action.data.email,
          password: action.data.password,
          userId: action.data.userId
        }
      };

      case 'UPDATE_PROFILE_REQUEST':
      return { ...state, meta: { ...state.meta, updating: true } };

    case 'UPDATE_PROFILE_SUCCESS':
      return { meta: { ...state.meta, updating: false }, model: action.data };

      case 'UPDATE_PROFILE_FAILURE':
      alert('Update Profile Error.');      
      return { ...state, meta: { ...state.meta, updating: false } };

      case 'GET_PROFILE_FAILURE':
      alert('Please Log In.');
      return { ...state, meta: { ...state.meta, loading: false } };


    default:
      return state;
  }
};

export default UserReducer;
