import React, { Component } from "react";
import PropTypes from "prop-types";

import "./ToDoItem.css";

class ToDoItem extends Component {
  state = {
    editing: false
  };

  editItem = () => {
    const toggleEditState = !this.state.editing;
    this.setState({
      editing: toggleEditState
    });
  };
  render() {
    const itemBeingEdited = this.state.editing;
    const {
      itemID,
      itemTitle,
      itemDescription,
      itemCompleted,
      updateTitle,
      updateDescription,
      removeItem,
      markAsComplete
    } = this.props;
    return (
      <article
        className={itemCompleted ? "to-do-item item-completed" : "to-do-item"}
      >
        <input
          className="mb-3"
          defaultValue={itemTitle}
          onChange={e => updateTitle(e, itemID)}
          disabled={itemBeingEdited ? false : true}
        />
        <textarea
          className="mb-3"
          defaultValue={itemDescription}
          onChange={e => updateDescription(e, itemID)}
          disabled={itemBeingEdited ? false : true}
        />
        <div className="d-flex justify-content-between justify-content-between-sm buttons-container">
          <button
            className="btn btn-danger mr-sm-auto"
            onClick={() => removeItem(itemID)}
          >
            Remove
          </button>
          {!itemCompleted ? (
            <button
              className="btn btn-info mx-3"
              onClick={this.editItem}
              disabled={!itemTitle || !itemDescription.length ? true : false}
            >
              {itemBeingEdited ? "Finish" : "Edit"}
            </button>
          ) : null}

          <button
            className="btn btn-success"
            onClick={e => markAsComplete(e, itemID)}
          >
            {itemCompleted ? "Incomplete" : "Completed"}
          </button>
        </div>
      </article>
    );
  }
}

ToDoItem.propTypes = {
  itemID: PropTypes.number,
  itemTitle: PropTypes.string,
  itemDescription: PropTypes.string,
  itemCompleted: PropTypes.bool,
  updateTitle: PropTypes.func,
  updateDescription: PropTypes.func,
  removeItem: PropTypes.func,
  markAsComplete: PropTypes.func
};

export default ToDoItem;
