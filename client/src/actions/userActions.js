import axios from 'axios'
import {USER_LOADING,USER_LOADED,EDIT_USER,USER_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL} from './types'
import {returnErrors} from './errorActions'

export const loadUser = () => async (dispatch,getState) => {

    try 
    {
        dispatch({type:USER_LOADING})

        const response = await axios.get('/api/users',tokenConfig(getState))

        dispatch({
            type:USER_LOADED,
            payload:response.data
        })
    } 
    catch (error) 
    {
        dispatch({type:USER_ERROR})
    }

}

export const register = ({ime,prezime,email,password}) => async dispatch => {

    const body = {ime,prezime,email,password}

    try 
    {
        const response = await axios.post('/api/users', body)

        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        })

        dispatch(loadUser())
    } 
    catch (error) 
    {
        dispatch(returnErrors(error.response.data,error.response.status,'REGISTER_FAIL'))
        dispatch({type:REGISTER_FAIL})
    }

}

export const login = ({email,password}) => async dispatch => {

    const body = {email,password}

    try 
    {
        const response = await axios.post('/api/users/login',body)

        console.log(response)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        })

        dispatch(loadUser())
    } 
    catch (error) 
    {
        console.log(error)
        dispatch(returnErrors(error.response.data,error.response.status,'LOGIN_FAIL'))
        dispatch({type:LOGIN_FAIL})        
    }

}

export const logout = () => {
    return {type:LOGOUT_SUCCESS}
}

export const editUser = (id,user) => async (dispatch,getState) => {
    
    try 
    {
        const response = await axios.put(`/api/users/${id}`,user,tokenConfig(getState))

        dispatch({
            type:EDIT_USER,
            payload:response.data
        })
    } 
    catch (error) 
    {
        dispatch({type:USER_ERROR})
    }

}

export const tokenConfig = getState => {

    const token = getState().user.token

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if(token)
    {
        config.headers['x-auth-token'] = token
    }

    return config
}