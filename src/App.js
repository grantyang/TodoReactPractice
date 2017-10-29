import React, { Component } from 'react';
import './App.css';
import NavBar from './containers/nav_bar.js';
import Input from './presentational/input.js';
import ListOfLists from './presentational/list_of_lists.js';
import { callJSON } from './ajax_utility.js';
import { connect } from 'react-redux';
import {
  loadAllTodoLists,
  loadCurrentUser,
  createList
} from './actions/index.js';
import store from './redux_create_store.js';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentWillMount() {
    this.props.loadAllTodoLists();
  }

  //GY only validate against user's own lists
  create = newName => {
    if (!newName) return alert('Please input a value.');
    if (
      this.props.listOfLists.find(
        item => item.name.toLowerCase() === newName.toLowerCase()
      )
    )
      return alert('Todo List already exists.');
    const newList = {
      name: newName,
      creator: this.props.currentUser.userId,
      privacy: 'private',
      todos: [],
      filter: 'ALL',
      searchTerm: ''
    };
    return this.props.createList(newList);
  };

  render() {
    return (
      <div className="List">
        <NavBar />
        {!this.props.activeSession && (
          <h3 className="mt-4">Please log in to view lists.</h3>
        )}
        {this.props.activeSession && (
          <div className="container">
            <Input fxToRun={this.create} />
            <ListOfLists
              listOfLists={this.props.listOfLists}
              loading={this.props.loading}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of the component
  return {
    listOfLists: state.listOfLists.model,
    activeSession: state.user.meta.activeSession,
    currentUser: state.user.model,
    loading: state.listOfLists.meta.loading
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      createList: createList,
      loadAllTodoLists: loadAllTodoLists
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;
