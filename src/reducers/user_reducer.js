//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const UserReducer = (
  // Information about the model
  state = {
    meta: { loading: true, updating: false, activeSession: true },
    model: {
      name: '',
      email: '',
      password: '',
      userId: '',
      userCustomTags: []
    }
  },
  action
) => {
  switch (action.type) {
    case 'USER_SIGNUP_SUCCESS':
      return state;

    case 'DUPLICATE_USER':
      alert('User already exists');
      return state;

    case 'USER_SIGNUP_FAILURE':
      return state;

    case 'GET_PROFILE_SUCCESS':
      return {
        meta: { ...state.meta, loading: false, activeSession: true },
        model: {
          name: action.data.name,
          email: action.data.email,
          password: action.data.password,
          userId: action.data.userId,
          userCustomTags: action.data.userCustomTags
        }
      };

    case 'LOGIN_USER_SUCCESS':
      return { ...state, meta: { ...state.meta, activeSession: true } };

    case 'LOGIN_USER_EMAIL_FAILURE':
      alert('Incorrect Email');
      return state;

    case 'LOGIN_USER_PASSWORD_FAILURE':
      alert('Incorrect Email');
      return state;

    case 'LOGIN_USER_FAILURE':
      alert('Login Server Error');
      return state;

    case 'UPDATE_PASSWORD_REQUEST':
    case 'UPDATE_PROFILE_REQUEST':
      return { ...state, meta: { ...state.meta, updating: true } };

    case 'UPDATE_PASSWORD_SUCCESS':
    case 'UPDATE_PROFILE_SUCCESS':
      return { meta: { ...state.meta, updating: false }, model: action.data };

    case 'UPDATE_PASSWORD_FAILURE':
      alert('Incorrect Current Password');
      return state;

    case 'UPDATE_PROFILE_FAILURE':
      alert('Update Profile Error.');
      return { ...state, meta: { ...state.meta, updating: false } };

    case 'GET_PROFILE_FAILURE':
      return {
        ...state,
        meta: { ...state.meta,  loading: false }
      };

    default:
      return state;
  }
};

export default UserReducer;
