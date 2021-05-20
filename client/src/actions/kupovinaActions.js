import axios from 'axios'
import {ADD_KUPOVINA,KUPOVINA_ERROR} from './types'

export const addKupovina = (formData) => async (dispatch,getState) => {

    try 
    {
        const response = await axios.post('/api/kupovine',formData,config(getState))

        return response.data
    } 
    catch (error) 
    {
        dispatch({type:KUPOVINA_ERROR})
        console.log(error)
    }

}

//MORA DA NAVEDES KOJA JE VRSTA HEADERA JER U SUPROTNOM NECE NISTA DA VRATI U SEGMENTU REQ.BODY
export const config = getState => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    return config
}