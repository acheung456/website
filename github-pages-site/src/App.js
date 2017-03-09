import React, { Component } from 'react';
import logo from './logo.svg';
import terminal from './terminal.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <AnnotatedImage coords={this.props.coords}/>

      </div>
    );
  }
}

class AnnotatedImage extends Component {
    render() {
        var annotations = [];
        this.props.coords.forEach( function(coord) {
            annotations.push(<Annotation x={coord.x} y={coord.y} w={coord.w} h={coord.h} />)
        });
        return (
        <div>
            <img src={terminal} alt="terminal" width="700px" height="400px" className="annotated-image" />
            {annotations}
        </div>
        );
    }
}

class Annotation extends Component {
    render() {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="overlap">
                <rect x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h} stroke="white" fill="transparent" strokeWidth="2"/>
            </svg>
        )
    }
}

export default App;
