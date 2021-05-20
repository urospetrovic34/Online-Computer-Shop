import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {makeStyles,CircularProgress,GridList,GridListTile,Divider,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Grid,Container,Typography,Paper,Hidden,Button,FormControl,TextField,Breadcrumbs,CardContent,List,ListItem,ListItemText,Modal,AppBar,Tabs,Tab} from '@material-ui/core'
import AppNavbar from '../layout/AppNavbar'
import LogoNavbar from '../layout/LogoNavbar'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {getProizvod,clearProizvod,editProizvod} from '../../actions/proizvodActions'
import {korpaAddProizvod} from '../../actions/korpaActions'
import misc from '../../util/pomocniFajl.json' 
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import GradeIcon from '@material-ui/icons/Grade'
import {TabPanel} from '@material-ui/lab'

const ProizvodPage = ({proizvod:{proizvod,isLoading},user:{isAuthenticated},korpa:{stavke},getProizvod,editProizvod,match}) => {

    const [selectedSlika, setSelectedSlika] = useState("")
    const [modalVisibility,setModalVisibility] = useState(false)
    const [modalVisibility2,setModalVisibility2] = useState(false)
    const [tabValue,setTabValue] = useState(0)
    const [kolicina,setKolicina] = useState(1)
    const [imaKorpa,setImaKorpa] = useState(false)
    const [komentar,setKomentar] = useState("")
    const [nizOcene,setNizOcene] = useState(proizvod.recenzije)
    const [signal,setSignal] = useState(false)

    const [nizCardinale,setNizCardinale] = useState([])

    const dispatch = useDispatch()

    console.log(proizvod.recenzije)

    useEffect(() =>{

        if(proizvod.eanKod === "")
        {
            getProizvod(match.params.id)
            setSignal(true)
        }

        for(let i in stavke)
        {
            if(stavke[i].proizvod===match.params.id)
            {
                setImaKorpa(true)
            }
        }
    
    }, [])


    //SPECIFIKACIJE
    nizCardinale.splice(0,nizCardinale.length)

    for(let i in proizvod)
    {
        if(i!=='slike'&&i!=='naLageru'&&i!=='_id'&&i!=='eanKod'&&i!=='nazivOpis'&&i!=='recenzije'&&i!=='datum'&&i!=='__v'&&i!=='cena')
        {
            nizCardinale.push({name:i,value:proizvod[i]})
        }
    }

    for(let i in nizCardinale)
    {
        for(let j in misc)
        {
            if(misc[j].id===nizCardinale[i].name)
            {
                nizCardinale[i].name=misc[j].name
            }
        }
    }
    //SPECIFIKACIJE

    const useStyles = makeStyles((theme) => ({
        marginTop14Procent:{
            marginTop:"34vh"
        },
        fixedHeight:{
            maxHeight:500,
            maxWidth:540,
            width:"100%",
            height:"100%",
            textAlign:'center',
            objectFit:"contain",
            '&:hover': {
                cursor:'pointer'
            }
        },
        fixedHeight2:{
            maxHeight:120,
            maxWidth:"100%",
            width:"100%",
            height:"100%",
            objectFit:"contain",
            '&:hover': {
                cursor:'pointer'
            }
        },
        fixedHeight3:{
            maxHeight:120,
            maxWidth:"100%",
            width:"100%",
            height:"100%",
            objectFit:"contain",
            '&:hover': {
                cursor:'pointer'
            }
        },
        oceneFixedHeight:{
            maxHeight:'100%',
            maxWidth:'100%',
            width:'100%',
            height:'100%',
            textAlign:'center',
            objectFit:"contain",
            '&:hover': {
                cursor:'pointer'
            }
        },
        cardImage:{
            maxWidth:"100%",
            width:"100%",
            objectFit:"contain",
            height:"100%",
            maxHeight:140,
            transitionProperty:"filter",
            transitionDuration:"0.2s",
        },
        modalPicture:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        noDecorationLink:{
            color:"black",
            textDecoration:"none",
            '&:hover': {
                color:"black",
                textDecoration:"none",
            }
        },
        height120:{
            height:'90px !important',
            padding:0,
            marginTop:'0px !important'
        },
        customModalWidth:{
            width:1500
        },
        tableCustomHeading:{
            width:250,
            backgroundColor:theme.palette.action.hover,
            color:theme.palette.primary.contrastText
        },
        InfoPad:{
            padding:14,
            backgroundColor:theme.palette.primary.main,
            color:theme.palette.primary.contrastText,
            borderRadius:5,
            textAlign:'center',
            width:'100%'
        }
    }))

    const slike = []

    for (let i=0;i<proizvod.slike.length;i++) 
    {
        let el = {
            src:proizvod.slike[i],
            altText: `Slika ${i+1}`,
            caption: `Slika ${i+1}`,
            index: `${i}`,
            slikaNum:i+1
        }

        slike.push(el)
    }

    const handlePictureChange = (event) => {

        setSelectedSlika({
            src:proizvod.slike[event.target.alt],
            altText: `Slika ${event.target.alt+1}`,
            caption: `Slika ${event.target.alt+1}`,
            index: event.target.alt,
            slikaNum:event.target.alt+1
        })
    }

    const productId = match.params.id

    const handleOpenModal = (event) => {
        setModalVisibility(true)
    }

    const handleCloseModal = (event) => {
        setModalVisibility(false)
    }

    const handleCloseModal2 = (event) => {
        setModalVisibility2(false)
    }

    const handleTabChange = (event,value) => {
        setTabValue(value)
    }

    const handleButton = () => {
        dispatch(korpaAddProizvod(productId,kolicina))
    }

    const handleKolicinaChange = (event) => {
        setKolicina(event.target.valueAsNumber)
    }

    const handleButtonKomentar = () => {

        const editedProizvod = {
            recenzije:[{}]
        }

        editProizvod(match.params.id,editedProizvod)
    }
    const handleTextFieldChange = (event) => {
        setKomentar(event.target.value)
    }

    console.log(komentar)

    const classes = useStyles()

    return proizvod.eanKod === "" ? 
    (
        <Container maxWidth="xl">
            <Grid container className={classes.marginTop14Procent} justify="center">
                <CircularProgress size={80}/>
            </Grid>
        </Container>) : (
        <div>
            <AppNavbar/>
                <Modal open={modalVisibility2} onClose={handleCloseModal2} style={{display: 'flex',alignItems: 'flex-start',justifyContent: 'center',marginTop:150}}>
                    <Grid container style={{width:500,textAlign:'center',paddingTop:50,paddingBottom:50,backgroundColor:'white'}}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Vaš komentar je usprešno poslat
                            </Typography>
                        </Grid>
                    </Grid>
                </Modal>
            <Modal open={modalVisibility} onClose={handleCloseModal} className={classes.modalPicture} disableEnforceFocus>
                {selectedSlika === "" ? (
                    <Paper variant="outlined" square style={{padding:10,width:800,textAlign:'center'}}>
                        <img src={slike[0].src} alt={slike[0].altText} key={slike[0].altText}/>
                    </Paper>
                ) : (
                    <Paper variant="outlined" square style={{padding:10,width:800,textAlign:'center'}}>
                        <img src={selectedSlika.src} alt={selectedSlika.altText} key={selectedSlika.altText}/>
                    </Paper>
                )}
            </Modal>
            <Container maxWidth="xl" style={{paddingLeft:100,paddingRight:100,marginTop:20}}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">Početna strana</Typography></Link>
                            <Link to="/" style={{ textDecoration: 'none'}} >
                                <Typography color="textPrimary">
                                    {
                                        proizvod.vrstaRobe === 'Procesori' ? (<span>Računari i komponente</span>) :
                                        proizvod.vrstaRobe === 'Napajanja' ? (<span>Računari i komponente</span>) :
                                        proizvod.vrstaRobe === 'Grafičke karte' ? (<span>Računari i komponente</span>) :
                                        proizvod.vrstaRobe === 'Memorije' ? (<span>Računari i komponente</span>) :
                                        proizvod.vrstaRobe === 'SSD' ? (<span>Računari i komponente</span>) :
                                        proizvod.vrstaRobe === 'Hard diskovi' ? (<span>Računari i komponente</span>) :
                                        proizvod.vrstaRobe === 'Matične ploče' ? (<span>Računari i komponente</span>) :
                                        proizvod.vrstaRobe === 'Kućišta' ? (<span>Računari i komponente</span>) : (<span></span>)
                                    }
                                </Typography>
                            </Link>
                            <Link to="/" style={{ textDecoration: 'none'}} >
                                <Typography color="textPrimary">
                                    {
                                        proizvod.vrstaRobe === 'Procesori' ? (<span>Komponente</span>) :
                                        proizvod.vrstaRobe === 'Napajanja' ? (<span>Komponente</span>) :
                                        proizvod.vrstaRobe === 'Grafičke karte' ? (<span>Komponente</span>) :
                                        proizvod.vrstaRobe === 'Memorije' ? (<span>Komponente</span>) :
                                        proizvod.vrstaRobe === 'SSD' ? (<span>Komponente</span>) :
                                        proizvod.vrstaRobe === 'Hard diskovi' ? (<span>Komponente</span>) :
                                        proizvod.vrstaRobe === 'Matične ploče' ? (<span>Komponente</span>) :
                                        proizvod.vrstaRobe === 'Kućišta' ? (<span>Komponente</span>) : (<span></span>)
                                    }
                                </Typography>
                            </Link>
                            <Link to="/" style={{ textDecoration: 'none'}} ><Typography color="textPrimary">{proizvod.vrstaRobe}</Typography></Link>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            {proizvod.nazivOpis}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            <span style={{ paddingRight: 20}}><b>Model</b>: {proizvod.model}</span>
                            <span style={{ paddingRight: 20}}><b>EAN</b>: {proizvod.eanKod}</span> 
                            <span style={{ paddingRight: 20}}><b>Proizvođač</b>: {proizvod.proizvodjac}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginTop:20}}>
                        <Grid container spacing={1}>
                            <Grid xs={12} md={7} style={{textAlign:'center',marginBottom:20}}>
                                <Paper variant="outlined" square>
                                    {selectedSlika === "" ? (
                                        <img src={slike[0].src} alt={slike[0].altText} key={slike[0].altText} className={classes.fixedHeight} onClick={handleOpenModal}/>
                                    ) : (
                                        <img src={selectedSlika.src} alt={selectedSlika.altText} key={selectedSlika.altText} className={classes.fixedHeight} onClick={handleOpenModal}/>
                                    )}
                                </Paper>
                                <GridList cols={slike.length}>
                                    {slike.map((slika)=>(
                                        <GridListTile style={{height:'100%'}}>
                                            <Paper variant="outlined" square>
                                                <img src={slika.src} alt={slika.index} key={slika.altText} className={classes.fixedHeight2} onClick={handlePictureChange}/>
                                            </Paper>
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </Grid>
                            <Grid xs={12} md={5} style={{marginBottom:10,padding:10}}>
                                <Paper variant='outlined' square>
                                    <Grid container spacing={1} style={{marginTop:10,marginBottom:10}}>
                                        <Grid item xs={6} style={{textAlign:'left',paddingLeft:30,paddingTop:30}}>
                                            <Typography variant="subtitle2">
                                                {proizvod.cenaPopust === undefined ? (
                                                    <b><strike>20.000</strike> RSD</b>
                                                ) : (
                                                    <b><strike>{proizvod.cenaPopust.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strike></b>
                                                )}
                                            </Typography>
                                            <Typography variant="h5">
                                                <b>{proizvod.cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} RSD</b>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} style={{textAlign:'right',paddingRight:100}}>
                                                    <Typography>
                                                        æææææ
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Broj ocena ({proizvod.recenzije.length})
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} style={{textAlign:'right',paddingRight:40}}>
                                                    <FormControl style={{paddingRight:10}} variant="outlined">
                                                        <TextField style={{width:60}} defaultValue={1} name="kolicina" id="kolicina" variant="outlined" type="number" onChange={handleKolicinaChange}/>
                                                    </FormControl>
                                                    <Button style={{height:55}} variant="contained" color="primary" onClick={handleButton}>
                                                        {imaKorpa ? (<span>Izmeni korpu</span>) : (<span>Dodaj u korpu</span>)}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Grid xs={12}>
                                    <Grid container>
                                        <Grid xs={12}>
                                            <Grid container style={{marginTop:10,padding:10}}>
                                                <Grid xs={6} style={{textAlign:'left'}}>
                                                    <Typography variant="subtitle1">
                                                        <b>EAN:</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'right'}}>
                                                    <Typography variant="subtitle1">
                                                        {proizvod.eanKod}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'left'}}>
                                                    <Typography variant="subtitle1">
                                                        <b>EAN:</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'right'}}>
                                                    <Typography variant="subtitle1">
                                                        {proizvod.eanKod}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'left'}}>
                                                    <Typography variant="subtitle1">
                                                        <b>Johhny Tightlips:</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'right'}}>
                                                    <Typography variant="subtitle1">
                                                        {proizvod.eanKod}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'left'}}>
                                                    <Typography variant="subtitle1">
                                                        <b>EAN:</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'right'}}>
                                                    <Typography variant="subtitle1">
                                                        {proizvod.eanKod}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'left'}}>
                                                    <Typography variant="subtitle1">
                                                        <b>EAN:</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={6} style={{textAlign:'right'}}>
                                                    <Typography variant="subtitle1">
                                                        {proizvod.eanKod}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} md={7}>
                                <AppBar position="static">
                                    <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" className={classes.tabSettings}>
                                        <Tab label="Specifikacije" value={0}/>
                                        <Tab label="Ocene" value={1}/>
                                    </Tabs>
                                </AppBar>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        tabValue === 0 ? 
                        (
                            <Grid item xs={12} style={{marginBottom:20}}>
                                <Paper variant="outlined" square>
                                    <TableContainer>
                                        <Table size="small">
                                            <TableBody>
                                                {nizCardinale.map(e=>(
                                                    <TableRow>
                                                        <TableCell align="left" className={classes.tableCustomHeading}><Typography color="textPrimary" variant="subtitle1"><b>{e.name}</b></Typography></TableCell>
                                                        <TableCell align="left"><Typography variant="subtitle2">{e.value}</Typography></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        ) 
                        : 
                        (
                            <Grid container>
                                <Grid item xs={12} style={{marginBottom:20,marginTop:10}}>
                                    {isAuthenticated ? (
                                        <span>
                                            <Button variant="contained" color="primary" onClick={handleButtonKomentar}>
                                                Ostavi komentar
                                            </Button>
                                            <FormControl style={{marginTop:10}} variant="outlined" fullWidth>
                                                <TextField variant="outlined" name="komentar" id="komentar" rows={7} InputLabelProps={{shrink: true}} onChange={handleTextFieldChange} multiline/>
                                            </FormControl>
                                        </span>
                                    ) : (
                                        <span>
                                            <div className={classes.InfoPad}>
                                                <Typography variant="subtitle1">
                                                    Ulogujte se da biste mogli da ostavite komentar
                                                </Typography>
                                            </div>
                                        </span>
                                    )}
                                </Grid>
                                <Grid item xs={12} style={{marginBottom:20}}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">
                                                {proizvod.nazivOpis}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">
                                                Svi komentari ({proizvod.recenzije.length})
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider style={{marginTop:10}}/>
                                    <Grid container style={{marginTop:10}}>
                                        <Grid item xs={2}>
                                            <Paper square variant="outlined">
                                                <img src={slike[0].src} alt={slike[0].altText} key={slike[0].altText} className={classes.oceneFixedHeight}/>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={10}>

                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        <Grid>

                                        </Grid>
                                        <Grid>
                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
            <LogoNavbar/>
        </div>
    )
}

ProizvodPage.propTypes = {
    user:PropTypes.object.isRequired,
    getProizvod:PropTypes.func.isRequired,
    korpaAddProizvod:PropTypes.func.isRequired,
    editProizvod:PropTypes.func.isRequired,
    proizvod:PropTypes.object.isRequired,
    korpa:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    proizvod:state.proizvod,
    korpa:state.korpa
})

export default withRouter(connect(mapStateToProps,{getProizvod,korpaAddProizvod,editProizvod})(ProizvodPage))