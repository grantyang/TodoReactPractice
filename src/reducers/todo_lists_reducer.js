//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const TodoListsReducer = (
  state = {
    meta: {
      loading: true,
      updating: false
    },
    model: [
      {
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
        searchTerm: ''
      }
    ]
  },
  action
) => {
  console.log(`${action.type} detected by reducer`);

  switch (action.type) {
    case 'LOAD_ALL_LISTS_SUCCESS':
      return { meta: { ...state.meta, loading: false }, model: action.data };

    case 'LOAD_LIST_SUCCESS':
      return { meta: { ...state.meta, loading: false }, model: [action.data] };

    case 'CREATE_LIST_SUCCESS':
      return { ...state, model: [action.data, ...state.model] };

    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        model: state.model.map(todoList => {
          if (todoList.name === action.listName) {
            return Object.assign({}, todoList, {
              todos: [action.data, ...todoList.todos]
            });
          }
          return todoList;
        })
      };

    case 'UPDATE_LIST_REQUEST':
      return { ...state, meta: { ...state.meta, updating: true } };

    case 'UPDATE_LIST_SUCCESS':
      return { meta: { ...state.meta, updating: false }, model: [action.data] };

    case 'DELETE_LIST_SUCCESS':
      return { ...state, model: [] };

    case 'DELETE_ALL_TODO_SUCCESS':
      return { ...state, model: [{ ...state.model, todos: [] }] };

    case 'DELETE_COMPLETED_TODO_SUCCESS':
      return {
        ...state,
        model: [
          {
            ...state.model[0],
            todos: state.model[0].todos.filter(item => item.completed === false)
          }
        ]
      };

    case 'CREATE_LIST_FAILURE':
    case 'DELETE_FAILURE':
    case 'LOAD_ALL_LISTS_FAILURE':
    case 'LOAD_LIST_FAILURE':
    case 'ADD_TODO_FAILURE':
      alert('Error from Server');
      return { ...state, meta: { ...state.meta, loading: false } };
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

export default TodoListsReducer;
