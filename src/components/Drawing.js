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

  render() {
    return (this.props.drawing) ? (
      <div
        className="Drawing"
      >
        <div className="Drawing-title">{this.props.drawing.name} ({this.state.lines.length} lines)</div>
        {JSON.stringify(this.state.lines)}
        <MyCanvasDraw
          onDraw={this.handleDraw}
          linesArray={this.state.lines}
        />
        <Canvas
          onDraw={this.handleDraw}
          drawingEnabled={true}
          lines={this.state.lines}
        />
      </div>
    ) : null;
  }
}

export default Drawing;
