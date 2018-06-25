import React, { Component } from 'react';
import {
  subscribeToDrawings,
  deleteDrawing
} from '../api';


class DrawingList extends Component {
  constructor(props) {
    super(props);

    subscribeToDrawings((drawing) => {
      this.setState(prevState => ({
        drawings: prevState.drawings.concat([drawing]),
      }));
    });
  }

  state = {
    drawings: [],
  };

  deleteDrawing = (id) => {
    deleteDrawing(id);
  }

  render() {
    const drawings = this.state.drawings.map(drawing => (
      <li
        className="DrawingList-item"
        key={drawing.id}
      >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{height: '100%', width: '100%'}} onClick={event => this.props.selectDrawing(drawing)}>{drawing.name}</div>
          <span onClick={() => {this.deleteDrawing(drawing.id)}} style={{color: 'red'}}><i className="fas fa-times"></i></span>
        </div>
      </li>
    ));

    return (
      <div className="DrawingList">
        <h3>drawings</h3>

        <ul>
          {drawings}
        </ul>
      </div>
    );
  }
}

export default DrawingList;
