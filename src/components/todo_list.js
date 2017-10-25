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
import store from '../redux_create_store.js';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: '',
      filter: 'ALL',
      searchTerm: '',
      todos: [],
      otherAuthoredLists: [],
      currentUserId: null,
      loading: true
    };
  }

  componentWillMount() {
    loadCurrentUser(store.dispatch);
    loadAllTodoLists(store.dispatch);
    loadTodoListData(store.dispatch, this.props.match.params.listName); // don't forget to pass dispatch
  }

  componentDidMount() {
    this.updateComponentState(); //keep in sync with redux
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateComponentState = () => {
    return this.setState({
      currentUserId: store.getState().user.model.userId,
      listName: store.getState().todoList.model.name,
      todos: store.getState().todoList.model.todos,
      loading: store.getState().todoList.meta.loading,
      otherAuthoredLists: store
        .getState()
        .listOfLists.model.filter(
          list => list.creator === this.state.currentUserId
        )
    });
  };

  refreshTodoListData = (event, targetName) => {
    loadTodoListData(store.dispatch, targetName);
  };

  addToList = todoText => {
    if (!todoText) {
      return alert('Please input a value');
    }
    //if there is a duplicate
    if (
      this.state.todos.find(
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
      return addTodo(
        //dispatch async action
        store.dispatch,
        this.state.listName,
        todoObj
      );
    }
  };

  clearAll = () => {
    //clear all todo items from this list
    return deleteAllTodos(
      //dispatch async action
      store.dispatch,
      this.state.listName
    );
  };

  clearComplete = () => {
    //clear completed todo items from this list
    return deleteCompletedTodos(
      //dispatch async action
      store.dispatch,
      this.state.listName
    );
  };

  countCompleted = () => {
    //count number of tood items not yet completed in this list
    let total = 0;
    this.state.todos.forEach(element => {
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
    return this.state.todos.filter(todo => {
      if (this.state.searchTerm === '') return todo;
      if (todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return todo;
      return null;
    });
  };

  render() {
    const loading = this.state.loading;
    const filteredTodos = this.applyCompletedFilter(this.searchResults());

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
          otherAuthoredLists={this.state.otherAuthoredLists}
          listName={this.state.listName}
          todos={filteredTodos}
          loading={loading}
          refreshTodoListData={this.refreshTodoListData} //ask CW
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
          to={`/list/${this.state.listName}/edit`}>
          Edit List
        </Link>
        <Link className="btn col-sm-4 btn-item btn-primary " to="/">
          Return Home
        </Link>
      </div>
    );
  }
}

export default TodoList;
