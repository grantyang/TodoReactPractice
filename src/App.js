import React, { Component } from 'react';
import './App.css';
import NavBar from './components/nav_bar.js';
import Input from './presentational/input.js';
import ListOfLists from './presentational/list_of_lists.js';
import { callJSON } from './ajax_utility.js';
import {
  loadAllTodoLists,
  loadCurrentUser,
  createList
} from './actions/index.js';
import store from './redux_create_store.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listOfLists: [],
      activeSession: false,
      currentUser: null
    };
  }

  componentWillMount() {
    store.dispatch(loadCurrentUser());
    store.dispatch(loadAllTodoLists()); // don't forget to pass dispatch
  }

  componentDidMount() {
    this.updateComponentState(); //keep in sync with redux
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  updateComponentState = () => {
    return this.setState({
      activeSession: store.getState().user.meta.activeSession,
      loading: store.getState().listOfLists.meta.loading,
      listOfLists: store.getState().listOfLists.model,
      currentUser: store.getState().user.model
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  //GY only validate against user's own lists
  create = newName => {
    if (!newName) return alert('Please input a value.');
    if (
      this.state.listOfLists.find(
        item => item.name.toLowerCase() === newName.toLowerCase()
      )
    )
      return alert('Todo List already exists.');
    const newList = {
      name: newName,
      creator: this.state.currentUser.userId,
      privacy: 'private',
      todos: [],
      filter: 'ALL',
      searchTerm: ''
    };
    return store.dispatch(createList(newList));
  };

  render() {
    return (
      <div className="List">
        <NavBar />
        {!this.state.activeSession && (
          <h3 className="mt-4">Please log in to view lists.</h3>
        )}
        {this.state.activeSession && (
          <div className="container">
            <Input fxToRun={this.create} />
            <ListOfLists
              listOfLists={this.state.listOfLists}
              loading={this.state.loading}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
