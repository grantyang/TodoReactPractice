import React, { Component } from 'react';
import './App.css';
import NavBar from './components/nav_bar.js';
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
      activeSession: this.props.activeSession,
      loading: this.props.loading,
      listOfLists: this.props.listOfLists,
      currentUser: this.props.currentUser
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

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
    listOfLists: state.listOfLists.model,
    activeSession: state.user.meta.activeSession,
    currentUser: state.user.model,
    loading: state.listOfLists.meta.loading
  };
}

export default connect(mapStateToProps)(App);
//export default App;
