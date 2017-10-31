import React from 'react';

const TodoListItemEditView = props => {
  console.log(props.tagInput);
  return (
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
      <div className="row justify-content-center input-group">
        <input
          className="form-control col-3 mt-2"
          id="date"
          type="date"
          value={props.dateInput}
          onChange={props.onDateChange}
        />
        <span className="input-group-addon mt-2" id="basic-addon2">
          Due Date
        </span>
      </div>
      <div className="row justify-content-center mt-2">
        <span className="btn">Selected Tag:</span>
        <select
          className="form-control col-2"
          onChange={props.onTagChange}
          value={props.tagInput}>
          <option value="">None</option>
          <option value="School">School</option>
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          {props.userCustomTags.map(tag => {
            return (
              <option key={tag.text} value={tag.text}>
                {tag.text}
              </option>
            );
          })}
        </select>

        <button
          type="button"
          className="btn btn-warning mx-2"
          data-toggle="modal"
          data-target="#customTag">
          Create Custom Tag
        </button>
        <div id="customTag" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form onSubmit={props.onCustomTagSubmit} >
                  <div className="form-group">
                    <label className="form-control-label">
                      New Custom Tag:
                    </label>
                    <input
                      className="form-control"
                      value={props.customTagInput}
                      onChange={props.onCustomTagChange}
                      id="message-text"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={props.onCustomTagSubmit}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
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
};
export default TodoListItemEditView;
