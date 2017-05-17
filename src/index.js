import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './layout/app/App.jsx';
import './index.css';


const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj2qk762oejez0103tw2j0a92'}).use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      // get the authentication token from local storage if it exists
      if (localStorage.getItem('graphcoolToken')) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
      }
      next()
    },
  }])
});


ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
), document.getElementById('root'));
