import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {makeStyles,Paper,Grid,Container,FormControl,TextField,Typography,Button} from '@material-ui/core'
import LogoNavbar from '../layout/LogoNavbar'
import {register} from '../../actions/userActions'
import PropTypes from 'prop-types'
import {clearErrors} from '../../actions/errorActions'

const state = {
    ime:'',
    prezime:'',
    email:'',
    password:''
}

const Register = ({user:{isAuthenticated},error:{id,msg},clearErrors,register,history}) => {

    const [data,setData] = useState(state)
    const [errorSignal,setErrorSignal] = useState(false)
    const [poruka,setPoruka] = useState("")

    const useStyles = makeStyles((theme) => ({

    }))

    const classes = useStyles()

    const handleTextFieldChange = (event) => {
        setData({...data,[event.target.name]:event.target.value})
    }

    const handleButtonSendClick = (event) => {
        event.preventDefault()

        const {ime,prezime,email,password} = data

        const user = {
            ime,prezime,email,password
        }

        register(user)
    }
    
    useEffect(()=>{
        clearErrors()
    },[])

    useEffect(()=>{

        if(id==='REGISTER_FAIL')
        {
            setErrorSignal(true)
            setPoruka(msg.msg)
            setData({...data,ime:"",prezime:"",email:"",password:""})
        }
        else
        {
            setErrorSignal(false)
            setPoruka("")
        }

    },[msg])

    useEffect(()=>{
        if(isAuthenticated)
        {
            history.push('/')
        }
    })

    console.log(msg.msg)

    return (
        <div>
            <LogoNavbar/>
            <Container maxWidth="sm" className="bg-white">
                <Paper variant="outlined" className="mt-5" square>
                    <Grid container spacing={1} className="p-3">
                        <Grid item xs={12} className="mt-3">
                            <Typography variant="h5">Registracija korisnika <Typography variant="subtitle1" style={{color:"red"}}>{poruka}</Typography></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <TextField label="Ime" name="ime" id="ime" error={errorSignal} variant="outlined" value={data.ime} onChange={handleTextFieldChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <TextField label="Prezime" name="prezime" id="prezime" error={errorSignal} variant="outlined" value={data.prezime} onChange={handleTextFieldChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="mt-2">
                            <FormControl variant="outlined" fullWidth>
                                <TextField label="Email" name="email" id="email" error={errorSignal} variant="outlined" value={data.email} onChange={handleTextFieldChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="mt-2">
                            <FormControl variant="outlined" fullWidth>
                                <TextField label="Lozinka" name="password" type="password" error={errorSignal} id="password" variant="outlined" value={data.password} onChange={handleTextFieldChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="mt-2 mb-3">
                            <Button variant="contained" className="bg-danger text-white" onClick={handleButtonSendClick} fullWidth>
                                Pošalji
                            </Button>
                        </Grid>
                   </Grid>
                </Paper>
            </Container>
        </div>
    )
}

Register.propTypes = {
    user:PropTypes.object.isRequired,
    register:PropTypes.func.isRequired,
    error:PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired  
}

const mapStateToProps = (state) => ({
    user:state.user,
    error:state.error
})

export default withRouter(connect(mapStateToProps,{register,clearErrors})(Register))