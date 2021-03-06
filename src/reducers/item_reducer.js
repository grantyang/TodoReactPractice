//The reducer is a pure function that takes the previous state and an action, and returns the next state.

//Things you should never do inside a reducer:
// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().

const ItemReducer = (
  state = {
    meta: {
      loading: true,
      updating: false
    },
    model: {
      todoId: '60c31d60-b678-11e7-9684-ad5a4351b7ae',
      ownerId: '60c31d60-b678-11e7-9684-ad5a4351b7ae',
      text: 'initial item',
      completed: false,
      tag: '',
      dueDate: '',
      richTextComment: '<p>initial RTC</p>',
      photo_links: [],
      latitude: 0,
      longitude: 0
    }
  },
  action
) => {
  switch (action.type) {
    case 'LOAD_ITEM_SUCCESS':
      return {
        ...state,
        meta: { ...state.meta, loading: false },
        model: {
          todoId: action.data.todo_id,
          ownerId: action.data.owner_id,
          text: action.data.text,
          completed: action.data.completed,
          tag: action.data.tag,
          dueDate: action.data.due_date,
          richTextComment: action.data.rich_text_comment,
          latitude: action.data.latitude,
          longitude: action.data.longitude,
          photo_links: action.data.photo_links
        }
      };

    case 'LOAD_LIST_SUCCESS':
      return {
        ...state,
        model: {
          ...state.model,
          richTextComment: ''
        },
        meta: { ...state.meta, loading: true }
      };

    case 'UPDATE_TODO_REQUEST':
      return { ...state, meta: { ...state.meta, updating: true } };

    case 'UPDATE_TODO_SUCCESS':
      return {
        ...state,
        meta: { ...state.meta, updating: false },
        model: {
          ...state.model,
          text: action.data.text,
          completed: action.data.completed,
          tag: action.data.tag,
          dueDate: action.data.due_date,
          richTextComment: action.data.rich_text_comment,
          latitude: action.data.latitude,
          longitude: action.data.longitude,
        }
      };

    case 'DELETE_ITEM_SUCCESS':
      return state;

    case 'UPDATE_TODO_FAILURE':
    case 'LOAD_ITEM_FAILURE':
      return { ...state, meta: { ...state.meta, loading: false } };
    default:
      return state;
  }
};

export default ItemReducer;
