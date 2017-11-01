//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const TodoListReducer = (
  state = {
    meta: {
      loading: true,
      updating: false
    },
    model: {
      // The actual data (model)
      name: 'initial list DO NOT SHOW',
      id: '10c31d60-b678-11e7-9684-ad5a4358b7aa',
      creator: '5c0183a0-b5e9-11e7-a130-53144cf6874d',
      privacy: 'private',
      todos: [
        {
          text: 'initial todo item DO NOT SHOW',
          completed: false,
          tag: '',
          dueDate: '',
          location: {
            lat: 0,
            lng: 0
          },
          id: '60c31d60-b678-11e7-9684-ad5a4358b7ae'
        }
      ],
      filter: 'ALL',
      searchTerm: '',
      authorizedUsers: [],      
    }
  },
  action
) => {
  console.log(`${action.type} detected by todolist reducer`);

  switch (action.type) {
    case 'LOAD_LIST_SUCCESS':
      return {
        ...state,
        meta: { ...state.meta, loading: false },
        model: action.data
      };

    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        model: { ...state.model, todos: [action.data, ...state.model.todos] }
      };

    case 'UPDATE_LIST_REQUEST':
      return { ...state, meta: { ...state.meta, updating: true } };

    case 'UPDATE_LIST_SUCCESS':
      return {
        ...state,
        meta: { ...state.meta, updating: false },
        model: action.data
      };

    case 'DELETE_LIST_SUCCESS':
      return {
        ...state,
        meta: { ...state.meta, loading: true },
        model: { todos: [] }
      };

    case 'DELETE_ALL_TODO_SUCCESS':
      return { ...state, model: { ...state.model, todos: [] } };

    case 'DELETE_COMPLETED_TODO_SUCCESS':
      return {
        ...state,
        model: {
          ...state.model,
          todos: state.model.todos.filter(item => item.completed === false)
        }
      };

    case 'DELETE_FAILURE':
    case 'LOAD_LIST_FAILURE':
    case 'ADD_TODO_FAILURE':
      return { ...state, meta: { ...state.meta, loading: false } };
    default:
      return state;
  }
};

export default TodoListReducer;
