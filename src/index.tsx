import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './client/App';
import './index.css';

ReactDOM.hydrate(<App />, document.getElementById('root') as HTMLElement);
