import {combineReducers} from 'redux'
import userReducer from './userReducer'
import proizvodReducer from './proizvodReducer'
import korpaReducer from './korpaReducer'
import errorReducer from './errorReducer'
import kupovinaReducer from './kupovinaReducer'

export default combineReducers({
    proizvod:proizvodReducer,
    user:userReducer,
    korpa:korpaReducer,
    error:errorReducer,
    kupovina:kupovinaReducer
})