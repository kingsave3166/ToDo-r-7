import React, { Component } from "react";
import "./App.css";

import ToDoItem from "./components/ToDoItem";
import AddItem from "./components/AddItem";

class App extends Component {
  state = {
    toDoItems: []
  };
  componentDidMount() {
    console.log(`App mounted at ${new Date()}`);
    const savedItems = JSON.parse(localStorage.getItem("items"));
    if (savedItems) {
      console.log(savedItems);
      this.setState({
        toDoItems: savedItems
      });
    } else {
      return;
    }
  }
  storeItems = () => {
    localStorage.setItem("items", JSON.stringify(this.state.toDoItems));
  };
  addNewItem = item => {
    this.setState(
      prevState => ({
        toDoItems: prevState.toDoItems.concat(item)
      }),
      () => {
        this.storeItems();
      }
    );
  };
  removeItem = id => {
    const itemIndex = this.state.toDoItems.findIndex(p => {
      return p.id === id;
    });
    const toDoItems = [...this.state.toDoItems];
    toDoItems.splice(itemIndex, 1);
    this.setState(
      {
        toDoItems: toDoItems
      },
      () => {
        this.storeItems();
      }
    );
  };
  updateTitle = (e, id) => {
    const itemIndex = this.state.toDoItems.findIndex(p => {
      return p.id === id;
    });
    const item = {
      ...this.state.toDoItems[itemIndex]
    };
    const toDoItems = [...this.state.toDoItems];
    item.title = e.target.value;
    toDoItems[itemIndex] = item;
    this.setState(
      {
        toDoItems: toDoItems
      },
      () => {
        this.storeItems();
      }
    );
  };
  updateDescription = (e, id) => {
    const itemIndex = this.state.toDoItems.findIndex(p => {
      return p.id === id;
    });
    const item = {
      ...this.state.toDoItems[itemIndex]
    };
    const toDoItems = [...this.state.toDoItems];
    item.description = e.target.value;
    toDoItems[itemIndex] = item;
    this.setState(
      {
        toDoItems: toDoItems
      },
      () => {
        this.storeItems();
      }
    );
  };
  markAsComplete = (e, id) => {
    const itemIndex = this.state.toDoItems.findIndex(p => {
      return p.id === id;
    });
    const item = {
      ...this.state.toDoItems[itemIndex]
    };
    const toDoItems = [...this.state.toDoItems];
    item.completed = !item.completed;
    toDoItems[itemIndex] = item;
    this.setState(
      {
        toDoItems: toDoItems
      },
      () => {
        this.storeItems();
      }
    );
  };
  render() {
    const { toDoItems } = this.state;
    const completedItems = toDoItems.filter(item => {
      return item.completed;
    });
    const incompletedItems = toDoItems.filter(item => {
      return !item.completed;
    });
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-8 App">
            <h1 className="display-4 text-center my-3">To Do List todo-r-7 </h1>
            <p>
              A simple to do list using React and localStorage.Items can be
              edited, marked as completed or removed entirely.Items will still
              be stored even if you leave the page.
            </p>
            <p>
              View on&nbsp;
              <a
                target="_blank"
                href="https://github.com/getinnocuous/simple-react-toDoList"
              >
                Github
              </a>
            </p>
            <AddItem addNewItem={this.addNewItem} />
            <h3>
              {incompletedItems.length > 0
                ? `Incomplete (${incompletedItems.length} remaining)`
                : null}
            </h3>
            {incompletedItems.map(item => {
              const { id, title, description, completed } = item;
              return (
                <ToDoItem
                  key={id}
                  itemID={id}
                  itemTitle={title}
                  itemDescription={description}
                  itemCompleted={completed}
                  updateTitle={this.updateTitle}
                  updateDescription={this.updateDescription}
                  removeItem={this.removeItem}
                  markAsComplete={this.markAsComplete}
                />
              );
            })}
            <h3> {completedItems.length > 0 ? "Completed" : null} </h3>
            {completedItems.map(item => {
              const { id, title, description, completed } = item;
              return (
                <ToDoItem
                  key={id}
                  itemID={id}
                  itemTitle={title}
                  itemDescription={description}
                  itemCompleted={completed}
                  updateTitle={this.updateTitle}
                  updateDescription={this.updateDescription}
                  removeItem={this.removeItem}
                  markAsComplete={this.markAsComplete}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
