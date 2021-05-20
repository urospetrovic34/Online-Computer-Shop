import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {}

const persistConfig = {
    key:'root',
    storage:storage,
    blacklist:'proizvod'
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const middleware = [thunk]

const store = createStore(persistedReducer,initialState,compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store