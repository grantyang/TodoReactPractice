import React from 'react';
import RichTextEditor from 'react-rte';

const TodoListItemEditView = props => {
  let dateFix = ''
  if (props.dateInput) dateFix = props.dateInput.substring(0,10)
  return (
    <div>
      <div className="row justify-content-sm-center">
        <form className="col-sm-8" onSubmit={event => props.onSave(event)}>
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
          value={dateFix}
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
                <form>
                  <div className="form-group">
                    <label className="form-control-label">
                      New Custom Tag:
                    </label>
                    <input
                      className="form-control"
                      value={props.customTagInput}
                      onChange={props.onCustomTagChange}
                      id="tag-text"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mx-2 float-right"
                    data-dismiss="modal"
                    onClick={props.onCustomTagSubmit}>
                    Create
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary float-right"
                    data-dismiss="modal">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-sm-center mt-2">
        <span className="">Add Comment Below:</span>
      </div>

      <div className="row justify-content-sm-center">
        <RichTextEditor
          className="my-1 col-md-6 "
          value={props.richTextValue}
          onChange={props.onRichTextEditorChange}
        />
      </div>

      <div className="row justify-content-sm-center mt-2">
        <form
          id="frmUploader"
          encType="multipart/form-data"
          onSubmit={event => props.onFileSubmit(event)}>
          <input type="file" name="photo" onChange={props.onFileChange} />
          <input
            className="btn btn-success"
            value="Upload"
            type="submit"
            onClick={event => props.onFileSubmit(event)}
          />
        </form>
      </div>
      <div className="form-group row justify-content-sm-center">
        <small id="fileHelp" className="form-text text-muted">
          Upload a photo above to be attached to this todo item.
        </small>
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
