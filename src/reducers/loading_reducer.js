//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const LoadingReducer = (state = true , action) => {
  switch (action.type) {
    case 'LOAD_LIST_SUCCESS':
      return false ;
    case 'LOAD_LIST_FAILURE':
      return false ;
    default:
      return state;
  }
};

export default LoadingReducer;
