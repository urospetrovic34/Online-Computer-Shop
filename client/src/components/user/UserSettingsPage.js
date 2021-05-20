import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {makeStyles,RadioGroup,FormControlLabel,Radio,CircularProgress,Divider,GridList,GridListTile,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Grid,Container,Typography,Paper,Hidden,Button,FormControl,TextField,Breadcrumbs,CardContent,List,ListItem,ListItemText,Modal,AppBar,Tabs,Tab} from '@material-ui/core'
import AppNavbar from '../layout/AppNavbar'
import PropTypes from 'prop-types'
import {editUser} from '../../actions/userActions'

const UserSettingsPage = ({user:{isAuthenticated,user},editUser,history}) => {

    const [selectedTab,setSelectedTab] = useState(0)
    const [modalVisibility,setModalVisibility] = useState(false)
    const [vrstaKupca,setVrstaKupca] = useState(user.vrstaLica)

    const state = {
        ime:user.ime,
        prezime:user.prezime,
        email:user.email,
        telefon:user.telefon,
        grad:user.grad,
        postanskiBroj:user.postanskiBroj,
        ulica:user.ulica,
        broj:user.broj,
        pib:user.pib,
        firma:user.firma
    }

    const [data,setData] = useState(state)

    const {ime,prezime,email,telefon,grad,ulica,broj,postanskiBroj,firma,pib} = data

    console.log(data)

    const useStyles = makeStyles((theme) => ({
        tealBack:{
            backgroundColor:theme.palette.secondary.main,
            color:theme.palette.secondary.contrastText
        },
        modalPicture:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }))

    const classes = useStyles()

    const handleOpenModal = () => {
        setModalVisibility(true)
    }

    const handleCloseModal = () => {
        setModalVisibility(false)
    }

    const handleRadioKupacChange = (event,value) => {
        setVrstaKupca(value)
    }

    const handleChange = (event) => {
        setData({...data,[event.target.name]:event.target.value})
    }

    const handleEditData = (event) => {

        event.preventDefault()

        const editedUser = {
            ime:ime,
            prezime:prezime,
            email:email,
            grad:grad,
            broj:broj,
            postanskiBroj:postanskiBroj,
            firma:firma,
            pib:pib,
            ulica:ulica,
            telefon:telefon,
            vrstaLica:vrstaKupca
        }

        editUser(user._id,editedUser)

        setModalVisibility(false)
    }

    const useEffect = (() =>{
        if(isAuthenticated===false)
        {
            history.push("/pretraga")
        }
    })

    console.log(user)

    return(
        <div>
            <AppNavbar/>
            <Modal open={modalVisibility} onClose={handleCloseModal} className={classes.modalPicture} disableEnforceFocus>
                <div>
                    <Paper style={{padding:25,width:800}}>
                        <Grid container justify="center" alignItems="center" spacing={1}>
                            <Grid item xs={12} style={{marginBottom:10}}>
                                <Typography variant="h6">
                                    Korisničke informacije
                                </Typography>
                                <FormControl component="fieldset" fullWidth>
                                    <RadioGroup onChange={handleRadioKupacChange} defaultValue={user.vrstaLica} row>
                                        <FormControlLabel value="fizickoLice" control={<Radio/>} label="Fizičko lice"/>
                                        <FormControlLabel value="pravnoLice" control={<Radio/>} label="Pravno lice"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {vrstaKupca === "fizickoLice" ? (<Grid item xs={6} style={{marginBottom:10,paddingRight:5}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Ime" name="ime" id="ime" defaultValue={user.ime} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>) : (<span></span>)}
                            {vrstaKupca === "fizickoLice" ? (<Grid item xs={6} style={{marginBottom:10,paddingLeft:5}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Prezime" name="prezime" id="prezime" defaultValue={user.prezime} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>) : (<span></span>)}
                            {vrstaKupca === "pravnoLice" ? (<Grid item xs={6} style={{marginBottom:10,paddingRight:5}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Firma" name="firma" id="firma" defaultValue={user.firma} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>) : (<span></span>)}
                            {vrstaKupca === "pravnoLice" ? (<Grid item xs={6} style={{marginBottom:10,paddingLeft:5}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="PIB" name="pib" id="pib" defaultValue={user.pib} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>) : (<span></span>)}
                            <Grid item xs={12} style={{marginBottom:10}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Email" name="email" id="email" defaultValue={user.email} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:10}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Telefon" name="telefon" id="telefon" defaultValue={user.telefon} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={10} style={{marginBottom:10,paddingRight:5}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Ulica" name="ulica" id="ulica" defaultValue={user.ulica} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} style={{marginBottom:10,paddingLeft:5}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Broj" name="broj" id="broj" defaultValue={user.broj} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={8} style={{marginBottom:10,paddingRight:5}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Grad" name="grad" id="grad" defaultValue={user.grad} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} style={{marginBottom:10,paddingLeft:5}}>
                                <FormControl variant="outlined" fullWidth>
                                    <TextField label="Poštanski broj" name="postanskiBroj" id="postanskiBroj" defaultValue={user.postanskiBroj} variant="outlined" onChange={handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{textAlign:'right'}}>
                                <Button variant="contained" style={{ borderRadius: 0,width:390 }} color="primary" onClick={handleEditData}>
                                    Izmeni
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </Modal>
            <Container maxWidth="xl" style={{paddingLeft:100,paddingRight:100,marginTop:10}}>
                <Grid container spacing={1} style={{marginTop:20}}>
                    <Grid xs={12} md={2} style={{marginBottom:10,paddingLeft:5,paddingRight:5}}>
                        <Paper variant="outlined" square>
                            <List style={{paddingBottom:0,paddingTop:0}}>
                                <ListItem className={classes.tealBack}><Typography variant="h6">Panel</Typography></ListItem>
                                <Divider/>
                                <ListItem button onClick={(event) => setSelectedTab(0)}><Typography variant="subtitle1">Informacije</Typography></ListItem>
                                <ListItem button onClick={(event) => setSelectedTab(1)}><Typography variant="subtitle1">Narudžbine</Typography></ListItem>
                                <ListItem button onClick={(event) => setSelectedTab(2)}><Typography variant="subtitle1">Wishlist</Typography></ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid xs={12} md={10} style={{paddingLeft:5,paddingRight:5}}>
                        {selectedTab === 0 ? (
                            <span>
                                <Paper variant="outlined" square>
                                    <Grid container spacing={1} style={{padding:14}}>
                                        <Grid item xs={6}>
                                            <Typography variant="h5" style={{padding:5}}>
                                                Korisnički panel 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{textAlign:'right'}}>
                                            <Button size="small" style={{textTransform:'none'}} onClick={handleOpenModal}>
                                                <Typography variant="subtitle2">
                                                    Izmeni informacije 
                                                </Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} style={{marginBottom:5}}>
                                            <Paper variant="outlined" square style={{padding:5,borderBottomColor:'transparent'}}>
                                                <Typography variant="subtitle1">
                                                    <b>Kontakt informacije</b>
                                                </Typography>
                                            </Paper>
                                            <Paper variant="outlined" square style={{padding:5}}>
                                                <Typography variant="subtitle2" style={{marginBottom:5,padding:5}}>
                                                    Tip korisnika: {
                                                    user.vrstaLica === '' ? (<span>N/A</span>) 
                                                    : user.vrstaLica === 'fizickoLice' ? (<span>Fizičko lice</span>) 
                                                    : (<span>Pravno lice</span>)
                                                }
                                                </Typography>
                                                {user.vrstaLica === 'fizickoLice' ? (<span>
                                                    <Typography variant="subtitle2" style={{marginBottom:5,padding:5}}>
                                                        Ime i prezime: {user.ime} {user.prezime}
                                                    </Typography>
                                                </span>) 
                                                : <span></span>}
                                                <Typography variant="subtitle2" style={{marginBottom:5,padding:5}}>
                                                    Email: {user.email}
                                                </Typography>
                                                {user.vrstaLica === 'pravnoLice' ? (<span>
                                                    <Typography variant="subtitle2" style={{marginBottom:5,padding:5}}>
                                                        Firma: {user.firma === '' ? (<span>N/A</span>) : (<span>{user.firma}</span>)}
                                                    </Typography>
                                                </span>) 
                                                : <span></span>}
                                                {user.vrstaLica === 'pravnoLice' ? (<span>
                                                    <Typography variant="subtitle2" style={{marginBottom:5,padding:5}}>
                                                        PIB: {user.pib === '' ? (<span>N/A</span>) : (<span>{user.pib}</span>)}
                                                    </Typography>
                                                </span>) 
                                                : <span></span>}
                                                <Typography variant="subtitle2" style={{padding:5}}>
                                                    Telefon: {user.telefon === '' ? (<span>N/A</span>) : (<span>{user.telefon}</span>)}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Paper variant="outlined" square style={{padding:5,borderBottomColor:'transparent'}}>
                                                <Typography variant="subtitle1">
                                                    <b>Adresa</b>
                                                </Typography>
                                            </Paper>
                                            <Paper variant="outlined" square style={{padding:5}}>
                                                <Typography variant="subtitle2" style={{marginBottom:5,padding:5}}>
                                                    Ulica i broj: {user.ulica === '' ? (<span>N/A</span>) : (<span>{user.ulica} {user.broj}</span>)}
                                                </Typography>
                                                <Typography variant="subtitle2" style={{marginBottom:5,padding:5}}>
                                                    Grad: {user.grad === '' ? (<span>N/A</span>) : (<span>{user.grad}</span>)}
                                                </Typography>
                                                <Typography variant="subtitle2" style={{padding:5}}>
                                                    Poštanski broj: {user.postanskiBroj === '' ? (<span>N/A</span>) : (<span>{user.postanskiBroj}</span>)}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </span>
                        ) : selectedTab === 1 ? (
                            <span>
                            <Paper variant="outlined" square>
                                <Grid container spacing={1} style={{padding:14}}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
                                            Narudžbine 
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">
                                            Trenutno nemate narudžbine 
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                            </span>
                        ) : (
                            <span>
                            <Paper variant="outlined" square>
                                <Grid container spacing={1} style={{padding:14}}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
                                            Wishlist 
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">
                                            Trenutno nemate proizvode u wishlist-u 
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                            </span>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

UserSettingsPage.propTypes = {
    user:PropTypes.object.isRequired,
    editUser:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user
})

export default withRouter(connect(mapStateToProps,{editUser})(UserSettingsPage))