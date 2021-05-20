import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {makeStyles,Paper,Grid,Container,FormControl,TextField,Typography,Button} from '@material-ui/core'
import LogoNavbar from '../layout/LogoNavbar'
import {login} from '../../actions/userActions'
import PropTypes from 'prop-types'
import {clearErrors} from '../../actions/errorActions'

const Login = ({user:{isAuthenticated},error:{id,msg},login,clearErrors,history}) => {

    const [errorSignal,setErrorSignal] = useState(false)
    const [poruka,setPoruka] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const useStyles = makeStyles((theme) => ({

    }))

    const classes = useStyles()

    const handleTextFieldEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleTextFieldPasswordChange =  (event) => {
        setPassword(event.target.value)
    }

    const handleButtonSendClick = (event) => {

        event.preventDefault()

        const user = {
            email,password
        }

        login(user)
    }

    useEffect(()=>{
        clearErrors()
    },[])

    useEffect(()=>{

        if(id==='LOGIN_FAIL')
        {
            setErrorSignal(true)
            setPoruka(msg.msg)
            setEmail("")
            setPassword("")
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

    return (
        <div>
            <LogoNavbar/>
            <Container maxWidth="sm">
                <Paper variant="outlined" className="mt-5" square>
                    <Grid container spacing={1} className="p-3">
                        <Grid item xs={12} className="mt-3">
                            <Typography variant="h5">Prijavite se <Typography variant="subtitle1" style={{color:"red"}}>{poruka}</Typography></Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <TextField label="Email" name="email" id="email" error={errorSignal} variant="outlined" value={email} onChange={handleTextFieldEmailChange}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="mt-2">
                            <FormControl variant="outlined" fullWidth>
                                <TextField label="Lozinka" name="password" type="password" id="password" error={errorSignal} variant="outlined" value={password} onChange={handleTextFieldPasswordChange}/>
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

Login.propTypes = {
    user:PropTypes.object.isRequired,
    login:PropTypes.func.isRequired,
    error:PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired  
}

const mapStateToProps = (state) => ({
    user:state.user,
    error:state.error
})

export default withRouter(connect(mapStateToProps,{login,clearErrors})(Login))