import React, { Component } from 'react';
import TodoListItemView from '../presentational/todo_list_item_view';
import { callJSON } from '../ajax_utility.js';
import {
  loadItemData,
  loadCurrentUser,
  loadAllTodoLists,
  loadTodoListData,
  updateTodoNoRedirect,
  deleteItem
} from '../actions/index.js';
import store from '../redux_create_store.js';

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      },
      loading: true,
      otherAuthoredLists: [],
      currentUserId: '',
      todo: {}
    };
  }
  componentWillMount() {
    const itemId = this.props.match.params.itemId;
    const listName = this.props.match.params.listName;
    loadCurrentUser(store.dispatch);
    loadAllTodoLists(store.dispatch);
    loadItemData(store.dispatch, listName, itemId);
  }

  componentDidMount() {
    //this.updateComponentState(); //CW location
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateComponentState = () => {
    return this.setState({
      todo: store.getState().item.model,
      location: store.getState().item.model.location,
      loading: store.getState().item.meta.loading,
      currentUserId: store.getState().user.model.userId,
      otherAuthoredLists: store
        .getState()
        .listOfLists.model.filter(
          list => list.creator === this.state.currentUserId
        )
    });
  };

  refreshTodoListData = (event, targetName) => {
    loadTodoListData(store.dispatch, targetName);
  };

  getListName = () => {
    return this.props.match.params.listName;
  };

  toggleCompleted = todo => {
    updateTodoNoRedirect(
      store.dispatch,
      this.getListName(),
      this.state.todo.id,
      {
        ...todo,
        completed: !todo.completed
      }
    );
  };

  saveLocation = location => {
    console.log(`updating ${this.state.todo.text}`);
    updateTodoNoRedirect(
      store.dispatch,
      this.getListName(),
      this.state.todo.id,
      {
        location
      }
    );
  };

  delete = () => {
    this.props.history.push(`/list/${this.getListName()}`);
    return deleteItem(store.dispatch, this.getListName(), this.state.todo.id);
  };

  render() {
    // console.log(`rendering with location:`)
    // console.log(this.state.todo.location)

    if (this.state.loading === true) return <b>Please wait, loading...</b>;
    return (
      <TodoListItemView
        todo={this.state.todo}
        listName={this.props.match.params.listName}
        toggleCompleted={this.toggleCompleted}
        delete={this.delete}
        getListName={this.getListName}
        location={this.state.todo.location}
        saveLocation={this.saveLocation}
        otherAuthoredLists={this.state.otherAuthoredLists}
        refreshTodoListData={this.refreshTodoListData}
      />
    );
  }
}

export default TodoListItem;
