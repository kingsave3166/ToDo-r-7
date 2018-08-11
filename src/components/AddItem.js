import React, { Component } from "react";
import PropTypes from "prop-types";

class AddItem extends Component {
  state = {
    title: "",
    description: ""
  };

  createNewItem = () => {
    const date = new Date();
    const newItem = {
      id: date.getTime(),
      title: this.state.title,
      description: this.state.description,
      completed: false
    };
    if (!this.state.title.length || !this.state.description.length) {
      return;
    } else {
      this.props.addNewItem(newItem);
      this.setState({ title: "", description: "" });
    }
  };

  render() {
    const { title, description } = this.state;
    return (
      <div className="to-do-item">
        <input
          className="mb-3"
          value={title}
          onChange={e =>
            this.setState({
              title: e.target.value
            })
          }
          placeholder="Enter a title"
        />
        <textarea
          className="mb-3"
          value={description}
          onChange={e =>
            this.setState({
              description: e.target.value
            })
          }
          placeholder="Enter a description"
        />
        <button
          className="btn btn-primary"
          disabled={
            !this.state.title.length || !this.state.description.length
              ? true
              : false
          }
          onClick={this.createNewItem}
        >
          Add item
        </button>
      </div>
    );
  }
}

AddItem.propTypes = {
  addNewItem: PropTypes.func
};

export default AddItem;
