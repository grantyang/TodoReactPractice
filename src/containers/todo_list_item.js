import React, { Component } from 'react';
import TodoListItemView from '../presentational/todo_list_item_view';
import NavBar from './nav_bar.js';
import {
  loadItemData,
  loadAllTodoLists,
  updateTodoNoRedirect,
  deleteItem
} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RichTextEditor from 'react-rte';

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      richTextValue: RichTextEditor.createValueFromString(
        this.props.initialRichTextValue,
        'html'
      )
    };
  }

  componentDidMount() {
    const itemId = this.props.match.params.itemId;
    const listName = this.props.match.params.listName;
    this.props.loadItemData(listName, itemId);
  }

  componentWillReceiveProps(nextProps) {
    return this.setState({
      richTextValue: RichTextEditor.createValueFromString(
        nextProps.initialRichTextValue,
        'html'
      )
    });
  }

  getListName = () => {
    return this.props.match.params.listName;
  };

  toggleCompleted = todo => {
    const updatedTodo = Object.assign({}, todo, {
      completed: !todo.completed
    });
    this.props.updateTodoNoRedirect(
      this.getListName(),
      this.props.todo.todoId,
      updatedTodo
    );
  };

  saveLocation = location => {
    const updatedTodo = Object.assign({}, this.props.todo, {
      latitude: location.lat(),
      longitude: location.lng()
    });
    this.props.updateTodoNoRedirect(
      this.getListName(),
      this.props.todo.todoId,
      updatedTodo
    );
  };

  delete = () => {
    this.props.history.push(`/list/${this.getListName()}`);
    return this.props.deleteItem(this.getListName(), this.props.todo.todoId);
  };

  render() {
    return (
      <div>
        <NavBar />
        <TodoListItemView
          loading={this.props.loading}
          todo={this.props.todo}
          listName={this.props.match.params.listName}
          toggleCompleted={this.toggleCompleted}
          delete={this.delete}
          location={{
            lat: this.props.todo.latitude,
            lng: this.props.todo.longitude
          }}
          saveLocation={this.saveLocation}
          richTextValue={this.state.richTextValue}
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
    initialRichTextValue: state.item.model.richTextComment //set app state (this.state.RTV) to redux state (this.props.RTV) in didMount/willRecProps
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
