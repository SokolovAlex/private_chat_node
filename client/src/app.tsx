import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './common.css';

declare var process: any;
const env = process.env.NODE_ENV;

if (env === 'dev') {
    console.info('development mode');
}

ReactDOM.render(
  <div>
        Hello world!!!
  </div>,
  document.getElementById('content')
);