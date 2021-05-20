import {GET_PROIZVODI,CLEAR_PROIZVODI,GET_PROIZVODI_QUERY,GET_PROIZVOD,ADD_PROIZVOD,DELETE_PROIZVOD,EDIT_PROIZVOD,PROIZVODI_LOADING,PROIZVOD_ERROR,CLEAR_PROIZVOD} from '../actions/types'

const initialState = {
    proizvodi:{
        data:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":"","recenzije":[""]}],
        popust:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":"","recenzije":[""]}],
        najnovije:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":"","recenzije":[""]}],
        topOcena:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":"","recenzije":[""]}],
    },
    proizvodiQuery:{proizvodi:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":"","recenzije":[]}],filter:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":"","recenzije":[]}],proizvodiStrane:-1,load:false},
    proizvod:{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""},
    isLoading:false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action)
{
    switch(action.type)
    {
        case GET_PROIZVODI:
            return{
                ...state,
                proizvodi:action.payload,
                isLoading:false,
                proizvod:{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""},
                proizvodiQuery:{proizvodi:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""}],filter:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""}],proizvodiStrane:-1}
            }
        case GET_PROIZVODI_QUERY:
            return{
                ...state,
                isLoading:false,
                proizvod:{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""},
                proizvodiQuery:action.payload
            } 
        case ADD_PROIZVOD:
            return{
                ...state,
                proizvodi:[action.payload,...state.proizvodi]
            }
        case GET_PROIZVOD:
            return{
                ...state,
                proizvod:action.payload,
                proizvodiQuery:{proizvodi:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""}],filter:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""}],proizvodiStrane:-1},
                isLoading:false
            }
        case EDIT_PROIZVOD:
            return{
                ...state,
                proizvod:action.payload
            }
        case DELETE_PROIZVOD:
            return{
                ...state,
                proizvodi:state.proizvodi.filter(proizvod=>proizvod._id!==action.payload)
            }
        case PROIZVODI_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case CLEAR_PROIZVOD:
            return{
                ...state,
                proizvod:{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""}
            }
        case CLEAR_PROIZVODI:
            return{
                ...state,
                proizvodiQuery:{proizvodi:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":"","recenzije":[]}],filter:[{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":"","recenzije":[]}],proizvodiStrane:-1},
                proizvod:{"slike":[""],"eanKod":"","model":"","nazivOpis":"","proizvodjac":"","cena":0,"vrstaRobe":"","zemljaPoreklo":""}
            }
        case PROIZVOD_ERROR:
            return{
                ...state,
                isLoading:false
            }
        default:
            return state
    }
}