import ReactDOM from 'react-dom/client';
import React from 'react';
import App from "./App";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
            <Provider store={createStore(reducers)}>
                <App/>
            </Provider>, 
        </React.StrictMode>
);