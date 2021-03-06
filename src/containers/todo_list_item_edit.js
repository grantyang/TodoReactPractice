import React, { Component } from 'react';
import NavBar from './nav_bar.js';
import TodoListItemEditView from '../presentational/todo_list_item_edit_view';
import {
  loadItemData,
  updateTodo,
  deleteItem,
  loadCurrentUser,
  updateUserProfile,
  uploadPhoto
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
    //async actions to populate redux state from server
    //also defaults component state for UI
    const listName = this.props.match.params.listName;
    const itemId = this.props.match.params.itemId;
    this.props.loadCurrentUser();
    this.props.loadItemData(listName, itemId);
  }

  componentWillReceiveProps(nextProps) {
    //if you do not use nextprops to here, state will be old props since mapStateToProps does complete fire yet
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
    let formData = new FormData();
    formData.append('photo', this.state.fileInput[0]);
    formData.append('name', this.state.fileInput[0].name);

    this.props.uploadPhoto(
      formData,
      'todoitem',
      this.getListName(),
      this.props.todoId
    );

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
      this.props.userCustomTags.find(tag => tag === this.state.customTagInput)
    )
      return alert('Tag already exists');
    this.props.updateUserProfile({
      user_custom_tags: [
        ...this.props.userCustomTags,
        this.state.customTagInput
      ]
    });
    return this.setState({
      tagInput: this.state.customTagInput
    });
  };

  onSave = event => {
    // when input is submitted, add to database
    event.preventDefault();
    const newText = this.state.textInputValue;
    let newDate = this.state.dateInput;
    if (this.state.dateInput && this.state.dateInput.length < 11)
      newDate = `${this.state.dateInput}T22:00:00.000Z`;
    const newTag = this.state.tagInput;
    const newRichTextValue = this.state.richTextValue.toString('html');
    const updatedTodo = Object.assign({}, this.props.todo, {
      text: newText,
      dueDate: newDate,
      tag: newTag,
      richTextComment: newRichTextValue
    });
    this.props.updateTodo(this.getListName(), this.props.todoId, updatedTodo);
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
  return {
    todo: state.item.model,
    loading: state.item.meta.loading,
    updating: state.item.meta.updating,
    initialTextInputValue: state.item.model.text,
    initialDateInput: state.item.model.dueDate,
    initialTagInput: state.item.model.tag,
    todoId: state.item.model.todoId,
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
      updateUserProfile: updateUserProfile,
      uploadPhoto: uploadPhoto
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItemEdit);
