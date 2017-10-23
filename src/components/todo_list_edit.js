import React, { Component } from 'react';
import '../App.css';
import TodoListEditView from '../presentational/todo_list_edit_view.js';
import { callJSON } from '../ajax_utility.js';
import { updateTodoList, deleteList } from '../actions/index.js';
import store from '../redux_create_store.js';

export default class TodoListEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: '',
      textInputValue: '',
      privacyInput: '',
      updating: false
    };
  }

  componentDidMount() {
    this.updateComponentState(); //keep in sync with redux
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateComponentState = () => {
    if (this.state.updating && store.getState().meta.updating === false) {
      return this.props.history.push(`/list/${store.getState().todoList.name}`); //redirect to new name list if just updated
    }
    return this.setState({
      updating: store.getState().meta.updating,
      listName: store.getState().todoList.name,
      textInputValue: store.getState().todoList.name,
      privacyInput: store.getState().todoList.privacy
    });
  };

  onSave = event => {
    event.preventDefault();
    const newText = this.state.textInputValue;
    const newPrivacy = this.state.privacyInput;
    //GY check for duplicate against list of lists
    if (!newText) {
      return alert('Please input a name');
    }
    // when input is submitted, add to database
    return updateTodoList(store.dispatch, this.state.listName, {
      name: newText,
      privacy: newPrivacy
    });
  };

  onPrivacyChange = event => {
    //when Privacy is changed, update state
    this.setState({
      privacyInput: event.target.value
    });
  };

  onTextChange = event => {
    // when input is changed, update state
    this.setState({
      textInputValue: event.target.value
    });
  };

  delete = () => {
    //delete this list and return to homepage
    this.props.history.push('');
    return deleteList(store.dispatch, this.state.listName);
  };

  render() {
    console.log(store.getState().todoList.name);
    return (
      <TodoListEditView
        onSave={this.onSave}
        onTextChange={this.onTextChange}
        textInputValue={this.state.textInputValue}
        privacyInput={this.state.privacyInput}
        listName={this.state.listName}
        changeName={this.changeName}
        delete={this.delete}
        onPrivacyChange={this.onPrivacyChange}
      />
    );
  }
}
