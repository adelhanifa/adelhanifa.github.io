import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../src/App/App.jsx'
import './Style/style.scss'

import { Provider } from 'react-redux'

// Redux stores
import store from './redux/store'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)
