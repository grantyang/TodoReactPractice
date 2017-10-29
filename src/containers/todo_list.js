import React, { Component } from 'react';
import '../App.css';
import Input from '../presentational/input.js';
import NavBar from './nav_bar.js';
import Footer from '../presentational/footer.js';
import TodoListView from '../presentational/todo_list_view.js';
import SearchBar from '../presentational/search_bar.js';
import { Link } from 'react-router-dom';
import { callJSON } from '../ajax_utility.js';
import {
  addTodo,
  loadTodoListData,
  loadCurrentUser,
  loadAllTodoLists,
  deleteAllTodos,
  deleteCompletedTodos
} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'ALL',
      searchTerm: '',
      loading: true
    };
  }

  componentDidMount() {
    this.props.loadTodoListData(this.props.match.params.listName); 
    this.props.loadCurrentUser(); // remember, if using THUNK, to call store.dispatch, not just loadCurrentUser().
    this.props.loadAllTodoLists();
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
    this.props.loadTodoListData(targetName);
  };

  addToList = todoText => {
    if (!todoText) {
      return alert('Please input a value');
    }
    //if there is a duplicate
    if (
      this.props.todos.find(
        item => item.text.toLowerCase() === todoText.toLowerCase()
      )
    ) {
      return alert('Todo item already exists');
    } else {
      const todoObj = {
        //create new object
        text: todoText,
        completed: false,
        tag: '',
        dueDate: '',
        location: { lat: 52.5200066, lng: 13.404954 }
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
      if (todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return todo;
      return null;
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
        />
        <Link
          className="btn col-sm-4 btn-item btn-warning"
          to={`/list/${this.props.listName}/edit`}>
          Edit List
        </Link>
        <Link className="btn col-sm-4 btn-item btn-primary " to="/">
          Return Home
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
    listName: state.todoList.model.name,
    todos: state.todoList.model.todos,
    loading: state.todoList.meta.loading,
    otherAuthoredLists: state.listOfLists.model.filter(
      list => list.creator === state.user.model.userId
    )
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadTodoListData: loadTodoListData,
      loadAllTodoLists: loadAllTodoLists,
      loadCurrentUser:loadCurrentUser,
      addTodo: addTodo,
      deleteAllTodos:deleteAllTodos,
      deleteCompletedTodos:deleteCompletedTodos,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
//export default TodoList;
