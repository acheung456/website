import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var JSONCoords = [
                    {x:"50", y:"50", w:"30", h:"30"},
                    {x:"60", y:"60", w:"30", h:"30"},
                    {x:"70", y:"70", w:"30", h:"30"}
             ]

ReactDOM.render(
  <App coords={JSONCoords}/>,
  document.getElementById('root')
);