import React, { Component } from 'react';
import TodoListItemEditView from '../presentational/todo_list_item_edit_view';
import {callJSON} from '../ajax_utility.js';

//no more passing prop from last page.
export default class TodoListItemEdit extends Component {
  componentDidMount() {
    const itemId = this.props.match.params.itemId;
    callJSON('GET', `list/${this.getListName()}/todo/${itemId}`)
      .then(res => {
        return res.json();
      })
      .then(returnedItem => {
        this.setState({
          todoId: returnedItem.id, // load in initial list from server
          textInputValue: returnedItem.text,
          dateInput: returnedItem.dueDate,
          tagInput: returnedItem.tag,
          loading: false
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '',
      tagInput: '',
      dateInput: '',
      loading: true,
      saving: false,
      todoId: ''
    };
  }

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
    this.setState({
      saving: true
    });
    callJSON('PUT', `list/${this.getListName()}/todo/${this.state.todoId}`,{
      text: newText,
      dueDate: newDate,
      tag: newTag
    })
      .then(res => {
        return res.json();
      })
      .then(() => {
        this.setState({
          saving: false
        });
        this.props.history.push(
          `/list/${this.getListName()}/todo/${this.state.todoId}`
        );
      });
  };

  delete = event => {
    callJSON('DELETE', `list/${this.getListName()}/todo/${this.state.todoId}`)
      .then(() => {
        this.props.history.push(`/list/${this.getListName()}`);
      })
      .catch(error => {
        return error;
      });
  };

  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
    } else if (this.state.saving === true) {
      return <b>Please wait, saving...</b>;
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
