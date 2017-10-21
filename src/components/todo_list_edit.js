import React, { Component } from 'react';
import '../App.css';
import TodoListEditView from '../presentational/todo_list_edit_view.js';
import { callJSON } from '../ajax_utility.js';
import { updateTodoList, deleteList } from '../actions/index.js';

export default class TodoListEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyInput: this.getTodoList().privacy,
      textInputValue: this.getTodoList().name
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() =>
    this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getTodoList = () => {
    return this.props.store.getState().todoList;
  };

  getListName = () => {
    return this.props.store.getState().todoList.name;
  };

  onSave = () => {
    const newText = this.state.textInputValue;
    const newPrivacy = this.state.privacyInput;
    //GY check for duplicate against list of lists
    if (!newText) {
      return alert('Please input a name');
    }
    // when input is submitted, add to database
    return updateTodoList(this.props.store.dispatch, this.getListName(), {
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
    return deleteList(this.props.store.dispatch, this.getListName())
    // callJSON('DELETE', `list/${this.getListName()}`)
    //   .then(() => {
    //     this.props.history.push('');
    //   })
    //   .catch(error => {
    //     return error;
    //   });
  };

  render() {
    console.log(this.props.store.getState().todoList.name);
    return (
      <TodoListEditView
        onSave={this.onSave}
        onTextChange={this.onTextChange}
        textInputValue={this.state.textInputValue}
        privacyInput={this.state.privacyInput}
        getListName={this.getListName}
        changeName={this.changeName}
        delete={this.delete}
        onPrivacyChange={this.onPrivacyChange}
      />
    );
  }
}
