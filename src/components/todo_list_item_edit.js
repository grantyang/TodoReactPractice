import React, { Component } from 'react';
import TodoListItemEditView from '../presentational/todo_list_item_edit_view';
import { callJSON } from '../ajax_utility.js';
import { loadItemData, updateTodo, deleteItem } from '../actions/index.js';
import { connect } from 'react-redux';
import store from '../redux_create_store.js';

class TodoListItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '',
      tagInput: '',
      dateInput: ''
    };
  }

  componentWillMount() {
    console.log('componentWillMount')
    
    const itemId = this.props.match.params.itemId;
    const listName = this.props.match.params.listName;
    store.dispatch(loadItemData(listName, itemId));
  }
    
  componentWillReceiveProps(nextProps) { //if you do not use nextprops to here, state will be old props since mapStateToProps does complete fire yet
    console.log('componentWillReceiveProps')
    if (this.props.updating && nextProps.updating === false) {
      return this.props.history.push(`/list/${this.getListName()}`);
    }
    return this.setState({
      textInputValue: nextProps.textInputValue,
      dateInput: nextProps.dateInput,
      tagInput: nextProps.tagInput,
      updating: nextProps.updating
      // currentUserId: this.props.currentUserId,
      // otherAuthoredLists: this.props.otherAuthoredLists
    });
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
    store.dispatch(
      updateTodo(this.getListName(), this.props.todoId, {
        text: newText,
        dueDate: newDate,
        tag: newTag
      })
    );
  };

  delete = event => {
    this.props.history.push(`/list/${this.getListName()}`);
    return store.dispatch(deleteItem(this.getListName(), this.props.todoId));
  };

  render() {
    console.log('render')
    
    if (this.props.loading === true) {
      return <b>Please wait, loading...</b>;
    } else if (this.props.updating === true) {
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

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  console.log('mapStateToProps')
  return {
    todoId: state.item.model.id,
    textInputValue: state.item.model.text,
    dateInput: state.item.model.dueDate,
    tagInput: state.item.model.tag,
    loading: state.item.meta.loading,
    updating: state.item.meta.updating,
    currentUserId: state.user.model.userId,
    otherAuthoredLists: state.listOfLists.model.filter(
      list => list.creator === state.user.model.userId
    )
  };
}

export default connect(mapStateToProps)(TodoListItemEdit);
