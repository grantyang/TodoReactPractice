import React, { Component } from 'react';
import TodoListItemView from '../presentational/todo_list_item_view';
import NavBar from './nav_bar.js';
import { callJSON } from '../ajax_utility.js';
import {
  loadItemData,
  loadAllTodoLists,
  updateTodoNoRedirect,
  deleteItem
} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoListItem extends Component {
  componentDidMount() {
    const itemId = this.props.match.params.itemId;
    const listName = this.props.match.params.listName;
    this.props.loadAllTodoLists();
    this.props.loadItemData(listName, itemId);
  }

  getListName = () => {
    return this.props.match.params.listName;
  };

  toggleCompleted = todo => {
    this.props.updateTodoNoRedirect(this.getListName(), this.props.todo.id, {
      ...todo,
      completed: !todo.completed
    });
  };

  saveLocation = location => {
    this.props.updateTodoNoRedirect(this.getListName(), this.props.todo.id, {
      location
    });
  };

  delete = () => {
    this.props.history.push(`/list/${this.getListName()}`);
    return this.props.deleteItem(this.getListName(), this.props.todo.id);
  };

  render() {
    if (this.props.loading === true) return <b>Please wait, loading...</b>;
    return (
      <div>
        <NavBar />
        <TodoListItemView
          todo={this.props.todo}
          listName={this.props.match.params.listName}
          toggleCompleted={this.toggleCompleted}
          delete={this.delete}
          getListName={this.getListName}
          location={this.props.todo.location}
          saveLocation={this.saveLocation}
          otherAuthoredLists={this.props.otherAuthoredLists}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
    todo: state.item.model,
    loading: state.item.meta.loading,
    otherAuthoredLists: state.listOfLists.model.filter(
      list => list.creator === state.user.model.userId
    )
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadItemData: loadItemData,
      loadAllTodoLists: loadAllTodoLists,
      updateTodoNoRedirect: updateTodoNoRedirect,
      deleteItem: deleteItem
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);
