import React, { Component } from 'react';
import '../App.css';
import NavBar from './nav_bar.js';
import TodoListEditView from '../presentational/todo_list_edit_view.js';
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
      textInputValue: this.props.initialListName,
      privacyInput: this.props.initialPrivacyInput
    };
  }

  componentDidMount() {
    this.props.loadTodoListData(this.props.match.params.listName);
  }

  componentWillReceiveProps(nextProps) {
    //if you do not use nextprops to here, state will be old props since mapStateToProps does complete fire yet
    if (this.props.updating && nextProps.updating === false) {
      return this.props.history.push(`/list/${nextProps.initialListName}`); //redirect to new name list if just updated
    }
    return this.setState({
      textInputValue: nextProps.initialListName,
      privacyInput: nextProps.initialPrivacyInput
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
    return this.props.updateTodoList(this.props.initialListName, {
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
    return this.props.deleteList(this.props.initialListName);
  };

  render() {
    if (this.props.updating === true) {
      return <b>Please wait, updating...</b>;
    }
    return (
      <div>
        <NavBar />
        <TodoListEditView
          onSave={this.onSave}
          onTextChange={this.onTextChange}
          textInputValue={this.state.textInputValue}
          privacyInput={this.state.privacyInput}
          listName={this.props.initialListName}
          changeName={this.changeName}
          delete={this.delete}
          onPrivacyChange={this.onPrivacyChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
    updating: state.todoList.meta.updating,
    initialListName: state.todoList.model[0].name,
    initialPrivacyInput: state.todoList.model[0].privacy
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadTodoListData: loadTodoListData,
      updateTodoList: updateTodoList,
      deleteList: deleteList
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoListEdit);
