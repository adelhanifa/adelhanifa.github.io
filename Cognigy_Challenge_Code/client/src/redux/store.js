import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import statusMessagesReducer from './ducks/statusMessages'
import passwordsReducer from './ducks/passwords'

// Dev tools
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducers = combineReducers({
  statusMessagesReducer,
  passwordsReducer
})

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
