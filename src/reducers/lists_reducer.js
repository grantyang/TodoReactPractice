//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const ListsReducer = (
  state = {
    meta: {
      loading: true
    },
    model: [
      {
        // The actual data (model)
        name: 'initial list DO NOT SHOW',
        list_id: '10c31d60-b678-11e7-9684-ad5a4358b7aa',
        creator: '5c0183a0-b5e9-11e7-a130-53144cf6874d',
        privacy: 'private'
      }
    ]
  },
  action
) => {
  switch (action.type) {
    case 'CREATE_LIST_SUCCESS':
      return { ...state, model: [action.data, ...state.model] };

    case 'LOAD_ALL_LISTS_SUCCESS':
      return { meta: { ...state.meta, loading: false }, model: action.data };

    case 'CREATE_LIST_FAILURE':
    case 'LOAD_ALL_LISTS_FAILURE':
      return { ...state, meta: { ...state.meta, loading: false } };
    default:
      return state;
  }
};

export default ListsReducer;
