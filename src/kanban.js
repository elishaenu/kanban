import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.css";

function updateTask(tasks, id, status) {
  // return tasks.filter((task) => task.boardsId < 3).map((task) => {
    return tasks.map((task) => {
    if (task.id === id && task.boardsId < 3 && status==="next") {
      task.boardsId += 1;
      // console.log(task.id);
    }
    else if (task.id === id && task.boardsId > 1 && status==="prev") {
      task.boardsId -= 1;
    }
    return task;
  })
}

function hapusTask(tasks,id){
  return tasks.filter((task) => task.id !==id);
}

class Kanban extends Component {
  constructor(props){
    super(props);
    this.state =
      {
        boards: {},
        tasks: []
      }
    this.changeStatus = this.changeStatus.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        boards: {
          1: 'to do list',
          2: 'in progress',
          3: 'done'
      },
        tasks: [
          { id: 1, taskName: 'Task pertama', boardsId: 1},
          { id: 2, taskName: 'Task kedua', boardsId: 1},
          { id: 3, taskName: 'Task ketiga', boardsId: 1},
          { id: 4, taskName: 'Task keempat', boardsId: 1}
        ]
      }
     )
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (state.tasks.length > 0) {
  //     return {};
  //   }
  // }

  changeStatus(id, status){
    const tasks = this.state.tasks;
    let newTasks = tasks;
    newTasks = updateTask(tasks, id, status)
    this.setState({
      tasks: newTasks
    });
  }

  deleteTask(id){
    const tasks = this.state.tasks;
    let deleteTasks = tasks;
    deleteTasks = hapusTask(tasks, id)
    this.setState({
      tasks: deleteTasks
    });
  }

  addNewTask(event){
    event.preventDefault();
    let x = this.state.tasks.map(t => t.id);
    let maxx = Math.max(...x,0);
    let newTask = [{id: maxx+1, taskName: this.textInput.value, boardsId: 1}];
    this.setState({
      tasks: this.state.tasks.concat(newTask)
    });
    this.textInput.value = "";
  }

  render() {
    const { tasks, boards } = this.state;
    const mykanban = Object.keys(boards).map(board =>
      <div className="card mb-4 shadow-sm" key={board}>
        <div className="card-header">{boards[board]}</div>
        <div className="card-body">
          {
            tasks.map((task) =>
              String(task.boardsId) === board ?
              (
                <div>
                  {task.boardsId > 1 && (<button onClick={()=>this.changeStatus(task.id, "prev")}>
                    Prev
                  </button>)}

                  {task.taskName}
                  {/* , status = {boards[task.boardsId]} */}
                  
                  {task.boardsId < 3 && (<button onClick={()=>this.changeStatus(task.id, "next")}>
                    Next
                  </button>)}
                  
                  {task.boardsId === 3 && (<input type="button" value="delete" onClick={() => this.deleteTask(task.id)}/>)}
                </div>
              ) : ""
            )
          }
        </div>
      </div>
    );

    return (
      <div className = "container">
        {mykanban}

        <form onSubmit={this.addNewTask}>
          <input type="text"
              required
              placeholder="Task Name"
              ref={(input) => this.textInput = input}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default Kanban;
