import MicContainer from '~/components/MicContainer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app.scss';

const App: React.FC<object> = () => (
    <MicContainer/>
);

const rootNode = document.getElementById('app');
ReactDOM.render(<App/>, rootNode);
