import React, { Component } from 'react';
import NavBar from './nav_bar.js';
import TodoListItemEditView from '../presentational/todo_list_item_edit_view';
import { callJSON } from '../ajax_utility.js';
import {
  loadItemData,
  updateTodo,
  deleteItem,
  loadCurrentUser,
  updateUserProfile
} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoListItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '',
      tagInput: '',
      dateInput: '',
      customTagInput: ''
    };
  }

  componentDidMount() {
    const listName = this.props.match.params.listName;
    const itemId = this.props.match.params.itemId;
    this.props.loadCurrentUser();
    this.props.loadItemData(listName, itemId);
    return this.setState({
      textInputValue: this.props.textInputValue,
      tagInput: this.props.tagInput,
      dateInput: this.props.dateInput
    });
  }

  componentWillReceiveProps(nextProps) {
    //if you do not use nextprops to here, state will be old props since mapStateToProps does complete fire yet
    console.log('componentWillReceiveProps');
    if (this.props.updating && nextProps.updating === false) {
      return this.props.history.push(`/list/${this.getListName()}`);
    }
    return this.setState({
      textInputValue: nextProps.textInputValue,
      //tagInput: nextProps.tagInput,
      dateInput: nextProps.dateInput
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

  //if a public list is tagged with a custom tag,
  //other users can see this tag (it is stored on the item) and change it but user cannot select that one again unless they create it

  onCustomTagChange = event => {
    this.setState({
      customTagInput: event.target.value
    });
  };

  onCustomTagSubmit = event => {
    event.preventDefault();
    if (this.props.userCustomTags.find(tag => tag.text === this.state.customTagInput)) return alert('Tag already exists')
    const newCustomTag = { text: this.state.customTagInput };
    this.props.updateUserProfile({
      userCustomTags: [...this.props.userCustomTags, newCustomTag]
    });
    this.setState({
      tagInput: this.state.customTagInput
    });
    //    document.getElementById('customTag').modal('hide');
  };

  onSave = () => {
    // when input is submitted, add to database
    const newText = this.state.textInputValue;
    const newDate = this.state.dateInput;
    const newTag = this.state.tagInput;
    this.props.updateTodo(this.getListName(), this.props.todoId, {
      text: newText,
      dueDate: newDate,
      tag: newTag
    });
  };

  delete = event => {
    this.props.history.push(`/list/${this.getListName()}`);
    return this.props.deleteItem(this.getListName(), this.props.todoId);
  };

  render() {
    console.log('render');
    return (
      <div>
        <NavBar />
        <TodoListItemEditView
          loading={this.props.loading}
          updating={this.props.updating}
          textInputValue={this.state.textInputValue}
          dateInput={this.state.dateInput}
          tagInput={this.state.tagInput}
          onSave={this.onSave}
          delete={this.delete}
          onTextChange={this.onTextChange}
          onDateChange={this.onDateChange}
          onTagChange={this.onTagChange}
          userCustomTags={this.props.userCustomTags}
          customTagInput={this.state.customTagInput}
          onCustomTagChange={this.onCustomTagChange}
          onCustomTagSubmit={this.onCustomTagSubmit}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of the component
  console.log('mapStateToProps');
  return {
    loading: state.item.meta.loading,
    updating: state.item.meta.updating,
    textInputValue: state.item.model.text,
    dateInput: state.item.model.dueDate,
    tagInput: state.item.model.tag,
    todoId: state.item.model.id,
    userCustomTags: state.user.model.userCustomTags
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadItemData: loadItemData,
      updateTodo: updateTodo,
      deleteItem: deleteItem,
      loadCurrentUser: loadCurrentUser,
      updateUserProfile: updateUserProfile
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItemEdit);
