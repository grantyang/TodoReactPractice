import React, { Component } from 'react';
import '../App.css';
import Input from '../presentational/input.js';
import NavBar from './nav_bar.js';
import Footer from '../presentational/footer.js';
import TodoListView from '../presentational/todo_list_view.js';
import SearchBar from '../presentational/search_bar.js';
import { Link } from 'react-router-dom';
import { callJSON } from '../ajax_utility.js';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creator: '',
      todoList: [],
      otherAuthoredLists: [],
      filter: 'ALL',
      searchTerm: '',
      loading: true
    };
  }

  componentDidMount() {
    this.getListFromServer();
  }
  componentDidUpdate() {
    this.getListFromServer();
  }
  // setTimeout(function(){
  //     res.json(updatedTodo)

  // },1000)

  getListFromServer() {
    const listName = this.props.match.params.listName;
    if (listName === this.state.name) return; //if list is already loaded, avoid infinite loop
    callJSON('GET', `list/${listName}`)
      .then(res => {
        return res.json();
      })
      .then(returnedList => {
        this.setState({
          name: returnedList.name,
          creator: returnedList.creator,
          todoList: returnedList.todoList,
          loading: false
        });
      });
    callJSON('GET', `lists?authored=true`)
      .then(res => {
        return res.json();
      })
      .then(returnedLists => {
        this.setState({
          otherAuthoredLists: returnedLists
        });
      });
  }

  addToList = todoText => {
    //fat arrow function instead of binding separately
    if (!todoText) {
      alert('Please input a value');
    } else if (
      this.state.todoList.find(
        item => item.text.toLowerCase() === todoText.toLowerCase()
      )
    ) {
      //if there is a duplicate
      alert('Todo item already exists');
    } else if (todoText) {
      const todoObj = {
        text: todoText,
        completed: false,
        tag: '',
        dueDate: '',
        location: { lat: 52.5200066, lng: 13.404954 }
      };
      const listName = this.props.match.params.listName;
      callJSON('POST', `list/${listName}`, todoObj)
        .then(res => {
          return res.json();
        })
        .then(newTodo => {
          this.setState({
            todoList: [newTodo, ...this.state.todoList] // add new Object to todoList
          });
        });
    }
  };

  clearAll = () => {
    //clear all todo items from this list
    const listName = this.props.match.params.listName;
    callJSON('DELETE', `list/${listName}?all=true`)
      .then(() => {
        this.setState({
          todoList: []
        });
      })
      .catch(error => {
        return error;
      });
  };

  clearComplete = () => {
    //clear completed todo items from this list
    const listName = this.props.match.params.listName;
    callJSON('DELETE', `list/${listName}?completed=true`)
      .then(() => {
        const newList = this.state.todoList.filter(
          item => item.completed === false
        );
        this.setState({ todoList: newList });
      })
      .catch(error => {
        return error;
      });
  };

  countCompleted = () => {
    //count number of tood items not yet completed in this list
    let total = 0;
    this.state.todoList.forEach(element => {
      if (element.completed === false) {
        total++;
      }
    });
    return total;
  };

  showAll = () => {
    //show all items regardless of completed status
    this.setState({ filter: 'ALL' });
  };

  showCompleted = () => {
    //show only completed items
    this.setState({ filter: 'COMPLETED' });
  };

  showActive = () => {
    //show only active items
    this.setState({ filter: 'ACTIVE' });
  };

  applyCompletedFilter = todos => {
    //return list of items based on filter
    return todos.filter(todo => {
      if (this.state.filter === 'COMPLETED') return todo.completed;
      if (this.state.filter === 'ACTIVE') return !todo.completed;
      return todo; //else ALL
    });
  };

  setSearchTerm = searchTerm => {
    //sets the search term when input is changed
    this.setState({ searchTerm });
  };

  searchResults = () => {
    //searches for searchterm
    return this.state.todoList.filter(todo => {
      if (this.state.searchTerm === '') return todo;
      if (todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return todo;
      return null;
    });
  };

  //get visible todos, then filter further based on search term. return that in TodoList instead.
  //if searchTerm is part of any todo.text, show the todo.text, otherwise no show
  //reset searchTerm with button?

  render() {
    const name = this.state.name;
    const filteredTodos = this.applyCompletedFilter(this.searchResults());

    return (
      <div className="List">
        <NavBar />
        <SearchBar
          setSearchTerm={this.setSearchTerm}
          term={this.state.searchTerm}
        />
        <Input fxToRun={this.addToList} /*pass addToList as prop*/ />
        <TodoListView
          className=""
          location={this.props.location}
          otherAuthoredLists={this.state.otherAuthoredLists}
          listName={name}
          todoList={filteredTodos}
          loading={this.state.loading}
        />
        <Footer
          className="list-group"
          clear={this.clearAll}
          clearComplete={this.clearComplete}
          showAll={this.showAll}
          showCompleted={this.showCompleted}
          showActive={this.showActive}
          countCompleted={this.countCompleted}
        />
        <Link
          className="btn col-sm-4 btn-item btn-warning"
          to={`/list/edit/${name}`}>
          Edit List
        </Link>
        <Link className="btn col-sm-4 btn-item btn-primary " to="/">
          Return Home
        </Link>
      </div>
    );
  }
}

export default TodoList;
