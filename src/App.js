import React, { Component } from 'react';
import './App.css';
import Kanban from './kanban.js';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Kanban/>
      </React.Fragment>
    );
  }
}

export default App;
