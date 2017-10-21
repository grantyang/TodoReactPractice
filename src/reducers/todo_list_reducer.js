//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const TodoListReducer = (
  state = {
    name: 'initial list DO NOT SHOW',
    creator: '5c0183a0-b5e9-11e7-a130-53144cf6874d',
    privacy: 'private',
    todos: [
      {
        text: 'initial todo item DO NOT SHOW',
        completed: false,
        tag: '',
        dueDate: '',
        location: {
          lat: 52.5200066,
          lng: 13.404954
        },
        id: '60c31d60-b678-11e7-9684-ad5a4358b7ae'
      }
    ],
    filter: 'ALL',
    searchTerm: '',
    loading: true
  },
  action
) => {
  console.log(`${action.type} detected by reducer`);

  switch (action.type) {
    case 'LOAD_LIST_SUCCESS':
      return action.data;

    case 'ADD_TODO_SUCCESS':
      return { ...state, todos: [action.data, ...state.todos] };

    case 'UPDATE_LIST_SUCCESS':
      return action.data;

    case 'DELETE_LIST_SUCCESS':
      return {};

    case 'DELETE_ALL_TODO_SUCCESS':
      return { ...state, todos: [] };

    case 'DELETE_COMPLETED_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter(item => item.completed === false)
      };

    case 'DELETE_FAILURE':
    case 'LOAD_LIST_FAILURE':
    case 'ADD_TODO_FAILURE':
      alert('Error from Server');
      return state;
    // case 'TOGGLE_TODO':
    //   return state.map(todo =>
    //     (todo.id === action.id)
    //       ? {...todo, completed: !todo.completed}
    //       : todo
    //   )
    default:
      return state;
  }
};

export default TodoListReducer;
