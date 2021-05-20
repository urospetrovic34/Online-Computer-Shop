import axios from 'axios'
import {KORPA_ADD_PROIZVOD,KORPA_REMOVE_PROIZVOD,CLEAR_KORPA,EDIT_KORPA,KORPA_ERROR} from './types'

export const korpaAddProizvod = (id,kolicina) => async (dispatch,getState) => {

    try {
        const response = await axios.get(`/api/proizvodi/${id}`)

        if(kolicina<1)
        {
            kolicina=1
        }

        dispatch({
            type:KORPA_ADD_PROIZVOD,
            payload:{
               proizvod:response.data._id,
               nazivOpis:response.data.nazivOpis,
               slika:response.data.slike[0],
               cena:response.data.cena,
               kolicina
            }
        })

        localStorage.setItem('korpa', JSON.stringify(getState().korpa.stavke))
        
    } catch (error) {
        dispatch({type:KORPA_ERROR})
        console.log(error.message)
    }
}

export const korpaRemoveProizvod = (id) => async (dispatch) => {

    try {
        dispatch({
            type:KORPA_REMOVE_PROIZVOD,
            payload:id
        })
    } catch (error) {
        dispatch({type:KORPA_ERROR})
    }

}