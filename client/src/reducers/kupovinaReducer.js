import {ADD_KUPOVINA,KUPOVINA_ERROR} from '../actions/types'

const initialState = {
    success:null, //
}

export default function(state = initialState,action){
    switch(action.type){
        case ADD_KUPOVINA:
            return{
                ...state,
                success:action.payload
            }
        default:
            return state
    }
}