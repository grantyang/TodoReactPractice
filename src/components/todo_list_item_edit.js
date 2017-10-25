import React, { Component } from 'react';
import TodoListItemEditView from '../presentational/todo_list_item_edit_view';
import { callJSON } from '../ajax_utility.js';
import {
  loadItemData,
  loadTodoListData,
  updateTodo,
  deleteItem
} from '../actions/index.js';
import store from '../redux_create_store.js';

export default class TodoListItemEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '',
      tagInput: '',
      dateInput: '',
      loading: true,
      updating: false,
      todoId: ''
    };
  }

  componentWillMount() {
    const itemId = this.props.match.params.itemId;
    const listName = this.props.match.params.listName;
    //loadCurrentUser(store.dispatch);
    //loadAllTodoLists(store.dispatch);
    loadItemData(store.dispatch, listName, itemId);
  }

  componentDidMount() {
    //this.updateComponentState();
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateComponentState = () => {
    if (this.state.updating && store.getState().item.meta.updating === false) {
      return this.props.history.push(`/list/${this.getListName()}`);
    }
    return this.setState({
      todoId: store.getState().item.model.id, // load in initial list from server
      textInputValue: store.getState().item.model.text,
      dateInput: store.getState().item.model.dueDate,
      tagInput: store.getState().item.model.tag,
      loading: store.getState().item.meta.loading,
      updating: store.getState().item.meta.updating
      // currentUserId: store.getState().user.model.userId,
      // otherAuthoredLists: store
      //   .getState()
      //   .listOfLists.model.filter(
      //     list => list.creator === this.state.currentUserId
      //   )
    });
  };

  getListName = () => {
    return this.props.match.params.listName;
  };

  onTextChange = event => {
    // when input is changed, update state
    this.setState({
      textInputValue: event.target.value
    });
  };

  onDateChange = date => {
    //when date is changed, update state
    this.setState({
      dateInput: date.target.value
    });
  };

  onTagChange = event => {
    //when tag is changed, update state
    this.setState({
      tagInput: event.target.value
    });
  };

  onSave = () => {
    // when input is submitted, add to database
    const newText = this.state.textInputValue;
    const newDate = this.state.dateInput;
    const newTag = this.state.tagInput;
    updateTodo(store.dispatch, this.getListName(), this.state.todoId, {
      text: newText,
      dueDate: newDate,
      tag: newTag
    });
  };

  delete = event => {
    this.props.history.push(`/list/${this.getListName()}`);
    return deleteItem(store.dispatch, this.getListName(), this.state.todoId);
  };

  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
    } else if (this.state.updating === true) {
      return <b>Please wait, updating...</b>;
    }
    return (
      <TodoListItemEditView
        textInputValue={this.state.textInputValue}
        dateInput={this.state.dateInput}
        tagInput={this.state.tagInput}
        onSave={this.onSave}
        delete={this.delete}
        onTextChange={this.onTextChange}
        onDateChange={this.onDateChange}
        onTagChange={this.onTagChange}
      />
    );
  }
}
