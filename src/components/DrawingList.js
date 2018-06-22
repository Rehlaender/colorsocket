import React, { Component } from 'react';
import {
  subscribeToDrawings,
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

  render() {
    const drawings = this.state.drawings.map(drawing => (
      <li
        className="DrawingList-item"
        key={drawing.id}
        onClick={event => this.props.selectDrawing(drawing)}
      >
        {drawing.name}
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
