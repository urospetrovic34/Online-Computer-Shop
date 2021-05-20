import {USER_LOADING,EDIT_USER,USER_LOADED,USER_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL} from '../actions/types'

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null
}

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
            }
        case EDIT_USER:
            return{
                ...state,
                user:action.payload
            }
        case USER_ERROR:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isLoading:false,
                isAuthenticated:false,
                user:null
            }
        default:
            return state      
    }
}