

import reactdom from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxthunk from 'redux-thunk'
import reducers from './reducers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnchancers(applyMiddleware(reduxthunk))
)

reactdom.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
      <App />
    </Provider></BrowserRouter>, document.querySelector("#root"))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

