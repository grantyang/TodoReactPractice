import React, { Component } from 'react';
import TodoListItemView from '../presentational/todo_list_item_view';
import { callJSON } from '../ajax_utility.js';
import {
  loadItemData,
  loadCurrentUser,
  loadAllTodoLists,
  updateTodoNoRedirect,
  deleteItem
} from '../actions/index.js';
import { connect } from 'react-redux';
import store from '../redux_create_store.js';

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      },
    };
  }
  componentWillMount() {
    const itemId = this.props.match.params.itemId;
    const listName = this.props.match.params.listName;
    store.dispatch(loadCurrentUser());
    store.dispatch(loadAllTodoLists());
    store.dispatch(loadItemData(listName, itemId));
  }

  getListName = () => {
    return this.props.match.params.listName;
  };

  toggleCompleted = todo => {
    store.dispatch(
      updateTodoNoRedirect(this.getListName(), this.props.todo.id, {
        ...todo,
        completed: !todo.completed
      })
    );
  };

  saveLocation = location => {
    store.dispatch(
      updateTodoNoRedirect(
        this.getListName(),
        this.props.todo.id,
        {
          location
        }
      )
    );
  };

  delete = () => {
    this.props.history.push(`/list/${this.getListName()}`);
    return store.dispatch(deleteItem( this.getListName(), this.props.todo.id));
  };

  render() {
    if (this.props.loading === true) return <b>Please wait, loading...</b>;
    return (
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
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
    todo: state.item.model,
    location: state.item.model.location,
    loading: state.item.meta.loading,
    otherAuthoredLists: state.listOfLists.model.filter(
      list => list.creator === state.user.model.userId
    )
  };
}


export default connect(mapStateToProps)(TodoListItem);
//export default TodoListItem;
