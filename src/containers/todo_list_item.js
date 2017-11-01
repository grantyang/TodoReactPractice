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
import RichTextEditor from 'react-rte';

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      richTextValue: RichTextEditor.createEmptyValue()
    };
  }

  componentDidMount() {
    const itemId = this.props.match.params.itemId;
    const listName = this.props.match.params.listName;
    this.props.loadAllTodoLists();
    this.props.loadItemData(listName, itemId);
    return this.setState({
      richTextValue: RichTextEditor.createValueFromString(this.props.richTextValue, 'html')
    });
  }

  componentWillReceiveProps(nextProps) {
    return this.setState({
      richTextValue: RichTextEditor.createValueFromString(nextProps.richTextValue, 'html')
    });
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
    return (
      <div>
        <NavBar />
        <TodoListItemView
          loading={this.props.loading}
          todo={this.props.todo}
          listName={this.props.match.params.listName}
          toggleCompleted={this.toggleCompleted}
          delete={this.delete}
          location={this.props.todo.location}
          saveLocation={this.saveLocation}
          otherAuthoredLists={this.props.otherAuthoredLists}
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
    richTextValue: state.item.model.richTextComment, //set app state (this.state.RTV) to redux state (this.props.RTV) in didMount/willRecProps
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
