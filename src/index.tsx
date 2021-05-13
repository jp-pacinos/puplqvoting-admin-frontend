import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import store from './app/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet defaultTitle="Voting System - PUPLCSC" titleTemplate="%s | Voting System - PUPLCSC" />

      <Provider store={store}>
        <Router basename="/admin">
          <App />
        </Router>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
