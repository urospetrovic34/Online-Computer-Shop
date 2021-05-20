import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {makeStyles,Toolbar,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Drawer,ListSubheader,CircularProgress,Grid,Card,Container,IconButton,Collapse,Typography,InputLabel,Slider,Paper,Select,Hidden,Button,FormControl,FormGroup,Checkbox,FormControlLabel,TextField,Breadcrumbs,Divider,CardContent,List,ListItem,MenuItem,ListItemText,Modal,AppBar,Tabs,Tab} from '@material-ui/core'
import AppNavbar from '../layout/AppNavbar'
import LogoNavbar from '../layout/LogoNavbar'
import {korpaAddProizvod,korpaRemoveProizvod} from '../../actions/korpaActions'
import PropTypes from 'prop-types'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'
import { useDispatch } from 'react-redux'

const Korpa = ({korpa:{stavke},login,history}) => {

    let price = 0
    let pdv = 0
    let ukupno = 0

    const dispatch = useDispatch()

    const useStyles = makeStyles((theme) => ({
        cardImage:{
            objectFit:"scale-down",
            height:"100%",
            backgroundColor:"white",
            maxHeight:90
        },
        title:{
            color:"white",
            textDecoration:"none",
            '&:hover': {
                color:"white",
                textDecoration:"none",
            },
            display: 'block',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            }
        },
        prazanDisplay:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            paddingTop:50,
            paddingBottom:50,
            backgroundColor:theme.palette.action.selected
        }
    }))

    const classes = useStyles()

    for(let i in stavke)
    {
        console.log(stavke[i].cena)
        price+=parseFloat(stavke[i].cena)
    }

    for(let i in stavke)
    {
        pdv = (((100*0.2)/(100+0.2))*price).toFixed(2)
    }

    ukupno = (parseFloat(price) + parseFloat(pdv)).toFixed(2)

    const handleRemoveProizvod = (id) => {
        dispatch(korpaRemoveProizvod(id))
    }

    const handleKolicinaChange = (event,proizvod,kolicina) => {
        console.log(event)
        dispatch(korpaAddProizvod(proizvod,kolicina))
    }

    useEffect(() =>{

    }, [])

    return (
        <div>
            <AppNavbar/>
            <Paper>
                <Container maxWidth="xl" style={{minHeight:'100vh'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={10} className="p-3 pb-0 mt-3 text-left">
                            <Typography variant="h4">Korpa</Typography>           
                        </Grid>     
                        <Grid item xs={2} className="p-3 pb-0 mt-3 text-right">
                            <Typography variant="h6">Pregled artikala</Typography>        
                        </Grid>
                        {stavke.length > 0 ? (     
                        <Grid item xs={12} className="mt-3">
                            <TableContainer>
                                <Table style={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"><Typography>Naziv proizvoda</Typography></TableCell>
                                            <TableCell align="center"><Typography>Pojedinačna cena</Typography></TableCell>
                                            <TableCell align="center"><Typography>Količina</Typography></TableCell>
                                            <TableCell align="center"><Typography>Ukupno</Typography></TableCell>
                                            <TableCell align="center"><Typography></Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            stavke.map(({cena,kolicina,nazivOpis,slika,proizvod})=>(
                                                <TableRow>
                                                    <TableCell align="center"><img src={slika} className={classes.cardImage} alt={proizvod}/></TableCell>
                                                    <TableCell align="center"><Typography>{nazivOpis}</Typography></TableCell>
                                                    <TableCell align="center"><Typography>{cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography></TableCell>
                                                    <TableCell align="center"><Typography>{kolicina}</Typography></TableCell>
                                                    <TableCell align="center"><Typography>{(kolicina*cena).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography></TableCell>
                                                    <TableCell align="center">
                                                        <Typography>
                                                            <IconButton onClick={() => handleRemoveProizvod(proizvod)}>
                                                                <CancelIcon/>
                                                            </IconButton>
                                                        </Typography>
                                                        <Link to={`${proizvod}`}>
                                                            <Typography>
                                                                <IconButton>
                                                                    <EditIcon/>
                                                                </IconButton>
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid> ) : (
                            <Grid item xs={12} className="mt-3">
                            <TableContainer>
                                <Table style={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"><Typography>Naziv proizvoda</Typography></TableCell>
                                            <TableCell align="center"><Typography>Pojedinačna cena</Typography></TableCell>
                                            <TableCell align="center"><Typography>Količina</Typography></TableCell>
                                            <TableCell align="center"><Typography>Ukupno</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                                <div className="text-center" className={classes.prazanDisplay}>
                                    <Typography variant="h6">Korpa je trenutno prazna</Typography>
                                </div>
                        </Grid>
                        )}     
                        <Grid item xs={6} lg={10} className="p-3 pb-0 mt-3 text-right">

                        </Grid>  
                        {stavke.length > 0 ? (<Grid item xs={6} lg={2} className="p-3 pb-0 mt-3 text-right">
                            <Grid container style={{textAlign:'right'}}>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" className="text-left">Ukupno</Typography> 
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" className="text-right">{price}</Typography> 
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" className="text-left">PDV</Typography> 
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" className="text-right">{pdv}</Typography> 
                                </Grid>
                                <Divider/>
                                <Grid item xs={6}>
                                    <Typography variant="h6" className="text-left"><b>Sve ukupno</b></Typography> 
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" className="text-right">{ukupno}</Typography> 
                                </Grid>
                                <Grid item xs={12} className="mt-3">
                                    <Link to="/kasa" style={{ textDecoration: 'none',visibility: 'transparent'}}>
                                        <Button variant="contained" style={{ borderRadius: 0 }} color="primary" fullWidth>
                                            Idi na kasu
                                        </Button>
                                    </Link> 
                                </Grid>
                            </Grid>
                        </Grid>) : (<span></span>)}                    
                   </Grid>
                </Container>
            </Paper>
            <AppBar position="static" color="secondary">
                <Toolbar className="ml-auto mr-auto">
                    <Typography variant="h6"><Link to={`/`} className={classes.title}>Store</Link></Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

Korpa.propTypes = {
    korpa:PropTypes.object.isRequired,
    korpaAddProizvod:PropTypes.func.isRequired,
    korpaRemoveProizvod:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    korpa:state.korpa
})

export default withRouter(connect(mapStateToProps,{korpaAddProizvod})(Korpa))