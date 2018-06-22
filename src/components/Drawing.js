import React, { Component } from 'react';
import Canvas from 'simple-react-canvas';
import CanvasDraw from "react-canvas-draw";
import MyCanvasDraw from './MyCanvasDraw';
import { publishLine, subscribeToDrawingLines } from '../api';

class Drawing extends Component {
  state = {
    lines: [],
  }

  componentDidMount() {
    subscribeToDrawingLines(this.props.drawing.id, (linesEvent) => {
      this.setState((prevState) => {
        return {
          lines: [...prevState.lines, ...linesEvent.lines],
        };
      });
    });


  }

  handleDraw = (line) => {
    console.log(line.brushColor, 'add line')
    publishLine({
      drawingId: this.props.drawing.id,
      line,
    });
  }

  handleChildren = (line) => {
    console.log(line, 'add line to server')
  }

  render() {
    let windowWidth = window.innerWidth-20;
    let windowHeigth = window.innerHeight-20;

    return (this.props.drawing) ? (
      <div
        className="Drawing"
      >
        <div className="Drawing-title">{this.props.drawing.name} ({this.state.lines.length} lines)</div>
        <MyCanvasDraw
          lines={this.state.lines}
          onChange={this.handleDraw}
          canvasWidth={windowWidth}
          canvasHeight={windowHeigth}
        />
      </div>
    ) : null;
  }
}

export default Drawing;
