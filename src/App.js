import React, { Component } from 'react';
import './App.css';
import DrawingForm from './components/DrawingForm';
import DrawingList from './components/DrawingList';
import Drawing from './components/Drawing';
import Connection from './Connection';

class App extends Component {
  state = {
  };

  selectDrawing = (drawing) => {
    this.setState({
      selectedDrawing: drawing,
    });
  }

  render() {
    let ctrl = (
      <div className="contentContainer">
        <DrawingForm />
        <DrawingList
          selectDrawing={this.selectDrawing}
        />
      </div>
    );

    if (this.state.selectedDrawing) {
      ctrl = (
        <Drawing
          drawing={this.state.selectedDrawing}
          key={this.state.selectedDrawing.id}
        />
      );
    }

    return (
      <div className="App">
        <Connection />
        { ctrl }
      </div>
    );
  }
}

export default App;
