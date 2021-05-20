import axios from 'axios'
import {GET_PROIZVODI,CLEAR_PROIZVODI,GET_PROIZVODI_QUERY,GET_PROIZVOD,ADD_PROIZVOD,DELETE_PROIZVOD,EDIT_PROIZVOD,PROIZVODI_LOADING,PROIZVOD_ERROR,CLEAR_PROIZVOD} from './types'

export const getProizvodi = () => async dispatch => {

    try 
    {
        const queryString = document.location.search.substring(1)

        const search = new URLSearchParams(queryString)

        const ignore = []

        search.forEach((value,key)=>{
            if(value==='')
            {
                ignore.push(key)
            }
        })

        ignore.forEach(key=>{
            search.delete(key)
        })

        const params = {}

        search.forEach((value,key)=>{
            params[key]=[search.getAll(key)]
        })

        dispatch(setProizvodiLoading())

        const response = await axios.get('/api/proizvodi',{params})

        dispatch({
            type:GET_PROIZVODI,
            payload:response.data  
        })
    } 
    catch (error) 
    {
        dispatch({type:PROIZVOD_ERROR})
    }

}

export const getProizvodiQuery = () => async dispatch => {

    try 
    {
        const queryString = document.location.search.substring(1)

        const search = new URLSearchParams(queryString)

        const ignore = []

        search.forEach((value,key)=>{
            if(value==='')
            {
                ignore.push(key)
            }
        })

        ignore.forEach(key=>{
            search.delete(key)
        })

        const params = {}

        search.forEach((value,key)=>{
            params[key]=[search.getAll(key)]
        })

        dispatch(setProizvodiLoading())

        const response = await axios.get('/api/proizvodi/query',{params})

        dispatch({
            type:GET_PROIZVODI_QUERY,
            payload:response.data  
        })
    } 
    catch (error) 
    {
        dispatch({type:PROIZVOD_ERROR})
    }

}

export const getProizvod = (id) => async dispatch => {

    try 
    {
        clearProizvod()

        const response = await axios.get(`/api/proizvodi/${id}`)

        dispatch({
            type:GET_PROIZVOD,
            payload:response.data
        })
    } 
    catch (error) 
    {
        dispatch({type:PROIZVOD_ERROR})
    }

}

export const addProizvod = (formData) => async (dispatch,getState) => {

    try 
    {
        const response = await axios.post('/api/proizvodi',formData/*,tokenConfig(getState)*/)

        dispatch({
            type:ADD_PROIZVOD,
            payload:response.data
        })
    } 
    catch (error) 
    {
        dispatch({type:PROIZVOD_ERROR})
    }

}

export const editProizvod = (id,proizvod) => async (dispatch,getState) => {

    try 
    {
        const response = await axios.put(`/api/proizvodi/${id}`,proizvod,tokenConfig(getState))
        
        dispatch({
            type:EDIT_PROIZVOD,
            payload:response.data
        })
    } 
    catch (error) 
    {
        dispatch({type:PROIZVOD_ERROR})
    }

}

export const deleteProizvod = (id) => async (dispatch,getState) => {

    try 
    {
        await axios.delete(`/api/proizvodi/${id}`/*,tokenConfig(getState)*/)
        
        dispatch({
            type:DELETE_PROIZVOD,
            payload:id
        })
    } 
    catch (error) 
    {
        dispatch({type:PROIZVOD_ERROR})
    }

}

export const setProizvodiLoading = () => {
    return {
        type:PROIZVODI_LOADING
    }
}

export const clearProizvod = () => {
    return {
        type:CLEAR_PROIZVOD
    }
}

export const clearProizvodi = () => {
    return {
        type:CLEAR_PROIZVODI
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