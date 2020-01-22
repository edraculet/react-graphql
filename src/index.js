import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import {createStore} from 'redux';
import { Provider } from "react-redux";
import users from './reducers/reducers';

import App from './components/App'
import * as serviceWorker from './serviceWorker';

// 1
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

// 2
const httpLink = createHttpLink({
    uri: 'http://localhost:9002/graphql'
});

// 3
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const store = createStore(users, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App client={client}/>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();