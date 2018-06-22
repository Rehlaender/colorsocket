import React, { Component } from 'react';
import MyCanvasDraw from './MyCanvasDraw';
import { publishLine, subscribeToDrawingLines } from '../api';
import { HuePicker, AlphaPicker } from 'react-color'

class Drawing extends Component {
  state = {
    lines: [],
    color: '#000',
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

    const handleColorChange = ({ hex }) => this.setState({color: hex})

    return (this.props.drawing) ? (
      <div
        className="Drawing"
      >
        <div className="Drawing-title">{this.props.drawing.name} ({this.state.lines.length} lines)</div>
        <div className="controlers">
          <HuePicker
            onChangeComplete={handleColorChange}
            color={this.state.color}
            />
        </div>
        <div className="drawingButtons">
          <div className="actionButton" style={{backgroundColor: '#BAF4FF'}}><i class="fas fa-chevron-left"></i></div>
          <div className="actionButton" style={{backgroundColor: 'tomato'}}><i class="fas fa-trash-alt"></i></div>
        </div>
        <MyCanvasDraw
          lines={this.state.lines}
          onChange={this.handleDraw}
          canvasWidth={windowWidth}
          canvasHeight={windowHeigth}
          brushColor={this.state.color}
        />
      </div>
    ) : null;
  }
}

export default Drawing;
