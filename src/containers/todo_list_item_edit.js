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
import RichTextEditor from 'react-rte';

class TodoListItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: this.props.initialTextInputValue,
      dateInput: this.props.initialDateInput,
      tagInput: this.props.initialTagInput,
      fileInput: '',
      customTagInput: '',
      richTextValue: RichTextEditor.createValueFromString(
        this.props.initialRichTextValue,
        'html'
      )
    };
  }

  componentDidMount() {
    console.log(this.props.initialRichTextValue);

    //async actions to populate redux state from server
    //also defaults component state for UI
    const listName = this.props.match.params.listName;
    const itemId = this.props.match.params.itemId;
    this.props.loadCurrentUser();
    this.props.loadItemData(listName, itemId);
  }

  componentWillReceiveProps(nextProps) {
    //if you do not use nextprops to here, state will be old props since mapStateToProps does complete fire yet
    console.log('componentWillReceiveProps');
    if (this.props.updating && nextProps.updating === false) {
      return this.props.history.push(`/list/${this.getListName()}`);
    }
    if (nextProps.userUpdating === true || this.props.userUpdating === true) {
      //if user created new custom tag, use that as tagInput value
      return this.setState({
        textInputValue: nextProps.initialTextInputValue,
        dateInput: nextProps.initialDateInput,
        richTextValue: RichTextEditor.createValueFromString(
          nextProps.initialRichTextValue,
          'html'
        )
      });
    }
    return this.setState({
      textInputValue: nextProps.initialTextInputValue,
      tagInput: nextProps.initialTagInput,
      dateInput: nextProps.initialDateInput,
      richTextValue: RichTextEditor.createValueFromString(
        nextProps.initialRichTextValue,
        'html'
      )
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

  onFileChange = event => {
    event.preventDefault();
    // when file is changed, update state
    this.setState({
      fileInput: event.target.files
    });
  };

  onFileSubmit = event => {
    event.preventDefault();
    if (this.state.fileInput === '') return alert('Please select a photo.');
    let data = new FormData();
    data.append('photo', this.state.fileInput[0]);
    data.append('name', this.state.fileInput[0].name);
    for (var key of data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    fetch(`http://localhost:5000/uploadPhoto`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    this.setState({
      fileInput: ''
    });
  };

  onDateChange = date => {
    //when date is changed, update state
    this.setState({
      dateInput: date.target.value
    });
  };

  onRichTextEditorChange = richTextValue => {
    this.setState({ richTextValue });
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
    //check to see if custom tag has been created already. If it has not, add it to the user's list of custom tags and
    //set it as the value for the tagInput
    event.preventDefault();
    if (
      this.props.userCustomTags.find(
        tag => tag.text === this.state.customTagInput
      )
    )
      return alert('Tag already exists');
    const newCustomTag = { text: this.state.customTagInput };
    this.props.updateUserProfile({
      userCustomTags: [...this.props.userCustomTags, newCustomTag]
    });
    return this.setState({
      tagInput: this.state.customTagInput
    });
  };

  onSave = event => {
    // when input is submitted, add to database
    event.preventDefault();
    const newText = this.state.textInputValue;
    const newDate = this.state.dateInput;
    const newTag = this.state.tagInput;
    const newRichTextValue = this.state.richTextValue.toString('html');
    this.props.updateTodo(this.getListName(), this.props.todoId, {
      text: newText,
      dueDate: newDate,
      tag: newTag,
      richTextComment: newRichTextValue
    });
  };

  delete = event => {
    //deletes this todo item and redirects to parent todoList
    this.props.history.push(`/list/${this.getListName()}`);
    return this.props.deleteItem(this.getListName(), this.props.todoId);
  };

  render() {
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
          onFileChange={this.onFileChange}
          onFileSubmit={this.onFileSubmit}
          userCustomTags={this.props.userCustomTags}
          customTagInput={this.state.customTagInput}
          onCustomTagChange={this.onCustomTagChange}
          onCustomTagSubmit={this.onCustomTagSubmit}
          richTextValue={this.state.richTextValue}
          onRichTextEditorChange={this.onRichTextEditorChange}
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
    initialTextInputValue: state.item.model.text,
    initialDateInput: state.item.model.dueDate,
    initialTagInput: state.item.model.tag,
    todoId: state.item.model.id,
    userCustomTags: state.user.model.userCustomTags,
    userUpdating: state.user.meta.updating,
    initialRichTextValue: state.item.model.richTextComment
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
