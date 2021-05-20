import {KORPA_ADD_PROIZVOD,KORPA_REMOVE_PROIZVOD,CLEAR_KORPA,KORPA_ERROR} from '../actions/types'

const initialState = {
    stavke:[]
}

export default function(state=initialState,action)
{
    switch(action.type)
    {
        case KORPA_ADD_PROIZVOD:
            const proizvod = action.payload

            const postojiProizvod = state.stavke.find((x) => x.proizvod === proizvod.proizvod)
            
            if(postojiProizvod)
            {
                return {
                    ...state,
                    stavke: state.stavke.map((x)=>
                        x.proizvod === postojiProizvod.proizvod ? proizvod : x
                    )
                }
            }
            else
            {
                return {
                    ...state,
                    stavke:[...state.stavke,proizvod]
                }
            }
        case KORPA_REMOVE_PROIZVOD:
            return{
                ...state,
                stavke:state.stavke.filter(stavka=>stavka.proizvod!==action.payload)
            }
        default:
            return state
    }
}