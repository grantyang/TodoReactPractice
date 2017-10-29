import React, { Component } from 'react';
import '../App.css';
import TodoListEditView from '../presentational/todo_list_edit_view.js';
import { callJSON } from '../ajax_utility.js';
import {
  updateTodoList,
  deleteList,
  loadTodoListData
} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoListEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '',
      privacyInput: ''
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.props.loadTodoListData(this.props.match.params.listName);
  }

  componentDidMount() {
    console.log('componentDidMount');
    return this.setState({
      textInputValue: this.props.listName,
      privacyInput: this.props.privacyInput
    });
  }

  componentWillReceiveProps(nextProps) {
    //Ask CW why this isn't called after mapStateToProps in this component but is in todo_list_item_edit
    console.log('componentWillReceiveProps');
    //if you do not use nextprops to here, state will be old props since mapStateToProps does complete fire yet
    if (this.props.updating && nextProps.updating === false) {
      return this.props.history.push(`/list/${this.props.listName}`); //redirect to new name list if just updated
    }
    return this.setState({
      textInputValue: nextProps.listName,
      privacyInput: nextProps.privacyInput
    });
  }

  onSave = event => {
    event.preventDefault();
    const newText = this.state.textInputValue;
    const newPrivacy = this.state.privacyInput;
    //GY check for duplicate against list of lists
    if (!newText) {
      return alert('Please input a name');
    }
    // when input is submitted, add to database
    return this.props.updateTodoList(this.props.listName, {
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
    return this.props.deleteList(this.props.listName);
  };

  render() {
    console.log('render');
    if (this.props.updating === true) {
      return <b>Please wait, updating...</b>;
    }
    return (
      <TodoListEditView
        onSave={this.onSave}
        onTextChange={this.onTextChange}
        textInputValue={this.state.textInputValue}
        privacyInput={this.state.privacyInput}
        listName={this.props.listName}
        changeName={this.changeName}
        delete={this.delete}
        onPrivacyChange={this.onPrivacyChange}
      />
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  console.log('mapStateToProps');
  return {
    updating: state.todoList.meta.updating,
    listName: state.todoList.model.name,
    privacyInput: state.todoList.model.privacy
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadTodoListData: loadTodoListData,
      updateTodoList: updateTodoList,
      deleteList: deleteList,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoListEdit);
