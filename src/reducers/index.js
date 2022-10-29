import { combineReducers } from 'redux'

import { commanReducer } from './commanReducer'


export default combineReducers({

    comman: commanReducer,

})