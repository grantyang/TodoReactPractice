import React from 'react';

const TodoListItemEditView = props => {
    return(
      <div>
        <div className="row justify-content-sm-center">
          <form className="col-sm-8" onSubmit={props.onSave}>
            <input
              className="todoItem list-group-item col-sm-12"
              type="text"
              style={{
                textDecoration: props.completed ? 'line-through' : 'none'
              }}
              value={props.textInputValue}
              onChange={props.onTextChange} // update state on change
            />
          </form>
        </div>
        <div className="row justify-content-sm-center input-group">
          <input className="form-control col-sm-3 mt-2" id="date" type="date" value={props.dateInput} onChange={props.onDateChange}/>
          <span className="input-group-addon mt-2" id="basic-addon2">Due Date</span>
        </div>
        <div className="row justify-content-sm-center mt-2">
        <span className="btn">Selected Tag:</span>
          <select className="form-control col-sm-2" onChange={props.onTagChange} value={props.tagInput}>
              <option value="">None</option>
              <option value="school">School</option>
              <option value="work">Work</option>
              <option value="home">Home</option>
            </select>
        </div>
        <div className="row justify-content-sm-center">
          <button
            className="col-sm-2 btn btn-item btn-success"
            onClick={props.onSave}>
            Save
          </button>
          <button
            className="col-sm-2 btn btn-item btn-danger"
            onClick={props.delete} /*ask CW about onClick={()=> callMethod() }*/>
            Delete
          </button>
        </div>
      </div>
    );
}
export default TodoListItemEditView;
