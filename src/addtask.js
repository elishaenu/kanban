import React from 'react';

class AddTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        boardsId: 1,
        taskName: ''
      };
      this.addNewTask = this.addNewTask.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    addNewTask(event) {
        event.preventDefault();
        // console.log(this.state.taskName);
        return this.state.taskName;
    }
    onChange(event) {
        this.setState({ taskName: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.addNewTask}>
                <input type="text"
                    required
                    placeholder="Task Name"
                    value={this.state.taskName}
                    onChange={this.onChange} />
                <button type="submit">Add</button>
            </form>
        );
    }
}

export default AddTask;
