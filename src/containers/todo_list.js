import React, { Component } from 'react';
import '../App.css';
import Input from '../presentational/input.js';
import NavBar from './nav_bar.js';
import Footer from '../presentational/footer.js';
import TodoListView from '../presentational/todo_list_view.js';
import SearchBar from '../presentational/search_bar.js';
import {
  addTodo,
  loadTodoListData,
  loadCurrentUser,
  loadAllTodoLists,
  deleteAllTodos,
  deleteCompletedTodos,
  updateAuthorizedUserList
} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'ALL',
      searchTerm: '',
      loading: true,
      authorizedUserInput: ''
    };
  }

  componentDidMount() {
    //async actions to populate redux state from server
    this.props.loadTodoListData(this.props.match.params.listName);
    this.props.loadCurrentUser(); // remember, if using THUNK, to call store.dispatch, not just loadCurrentUser().
    this.props.loadAllTodoLists();
  }

  componentWillReceiveProps() {
    this.setState({
      filter: 'ALL',
      searchTerm: '',
      loading: true
    });
  }

  // componentDidMount() { //THUNK no redux-router connect mapDispatchToProps
  //   store.dispatch(loadTodoListData(this.props.match.params.listName));
  //   store.dispatch(loadCurrentUser()); // remember, if using THUNK to call store.dispatch, not just loadCurrentUser().
  //   store.dispatch(loadAllTodoLists());
  // }

  // componentDidMount() {
  //   this.updateComponentState(); //keep in sync with redux
  //   this.unsubscribe = store.subscribe(this.updateComponentState);
  // }
  // componentWillUnmount() {
  //   this.unsubscribe();
  // }
  // updateComponentState = () => {
  //   //why don't we always getState? CW
  //   //situation where this method is setting the state after redux state is updated
  //   //but before mapPropsToState maps redux store to this.props.
  //   //whe to use getState and when to use this.props.____?
  //   // console.log('updating here')
  //   // console.log(store.getState().todoList.model.name)
  //   // console.log(this.props.listName)
  //   return this.setState({
  //     loading: this.props.loading,
  //   });
  // };

  refreshTodoListData = (event, targetName) => {
    //fetches and loads data for new todoList from server into redux state when user clicks a new one
    this.props.loadTodoListData(targetName);
  };

  addToList = todoText => {
    //adds new todo item to this list
    if (!todoText) {
      return alert('Please input a value');
    }
    //if there is a duplicate
    if (
      this.props.todos[0].todo_id &&
      this.props.todos.find(
        item => item.text.toLowerCase() === todoText.toLowerCase()
      )
    ) {
      return alert('Todo item already exists');
    } else {
      const todoObj = {
        //create new object
        ownerId: this.props.currentListId,
        text: todoText,
        completed: false,
        tag: '',
        dueDate: null,
        latitude: 52.5200066,
        longitude: 13.404954,
        richTextComment: '',
        pictureLinks: []
      };
      return this.props.addTodo(this.props.listName, todoObj);
    }
  };

  clearAll = () => {
    //clear all todo items from this list
    return this.props.deleteAllTodos(this.props.listName);
  };

  clearComplete = () => {
    //clear completed todo items from this list
    return this.props.deleteCompletedTodos(this.props.listName);
  };

  countCompleted = () => {
    //count number of todo items not yet completed in this list
    let total = 0;
    this.props.todos.forEach(element => {
      if (element.completed === false) {
        total++;
      }
    });
    return total;
  };

  showAll = () => {
    //show all items regardless of completed status
    this.setState({ filter: 'ALL' });
  };

  showCompleted = () => {
    //show only completed items
    this.setState({ filter: 'COMPLETED' });
  };

  showActive = () => {
    //show only active items
    this.setState({ filter: 'ACTIVE' });
  };

  applyCompletedFilter = todos => {
    //return list of items based on filter
    return todos.filter(todo => {
      if (this.state.filter === 'COMPLETED') return todo.completed;
      if (this.state.filter === 'ACTIVE') return !todo.completed;
      return todo; //else ALL
    });
  };

  setSearchTerm = searchTerm => {
    //sets the search term when input is changed
    this.setState({ searchTerm });
  };

  searchResults = () => {
    //searches for searchterm
    return this.props.todos.filter(todo => {
      if (this.state.searchTerm === '') return todo;
      if (
        todo.text &&
        todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      )
        return todo;
      return null;
    });
  };

  onAuthorizedUserInputChange = event => {
    this.setState({
      authorizedUserInput: event.target.value
    });
  };

  onAuthorizedUserInputSubmit = event => {
    //see if user exists. if so, and not a duplicate, add to authed users for this list
    event.preventDefault();
    this.props.updateAuthorizedUserList(this.props.listName, {
      email: this.state.authorizedUserInput
    });
    this.setState({
      authorizedUserInput: ''
    });
  };

  render() {
    let filteredTodos = this.applyCompletedFilter(this.searchResults());
    if (this.props.loading === true) return <b>Please wait, loading...</b>;
    return (
      <div className="List">
        <NavBar />
        <SearchBar
          setSearchTerm={this.setSearchTerm}
          term={this.state.searchTerm}
        />
        <Input fxToRun={this.addToList} /*pass addToList as prop*/ />
        <TodoListView
          className=""
          location={this.props.location}
          otherAuthoredLists={this.props.otherAuthoredLists}
          listName={this.props.listName}
          todos={filteredTodos}
          refreshTodoListData={this.refreshTodoListData}
        />
        <Footer
          className="list-group"
          clear={this.clearAll}
          clearComplete={this.clearComplete}
          showAll={this.showAll}
          showCompleted={this.showCompleted}
          showActive={this.showActive}
          countCompleted={this.countCompleted}
          listName={this.props.listName}
          authorizedUserInput={this.state.authorizedUserInput}
          onAuthorizedUserInputChange={this.onAuthorizedUserInputChange}
          onAuthorizedUserInputSubmit={this.onAuthorizedUserInputSubmit}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
    listName: state.todoList.model[0].name,
    todos: state.todoList.model,
    loading: state.todoList.meta.loading,
    otherAuthoredLists: state.listOfLists.model.filter(
      list => list.creator === state.user.model.userId
    ),
    currentListId: state.todoList.model[0].list_id
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadTodoListData: loadTodoListData,
      loadAllTodoLists: loadAllTodoLists,
      loadCurrentUser: loadCurrentUser,
      addTodo: addTodo,
      deleteAllTodos: deleteAllTodos,
      deleteCompletedTodos: deleteCompletedTodos,
      updateAuthorizedUserList: updateAuthorizedUserList
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
//export default TodoList;
