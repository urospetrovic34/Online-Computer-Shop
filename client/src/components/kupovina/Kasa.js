import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {makeStyles,BottomNavigation,Toolbar,Stepper,Radio,RadioGroup,Step,StepLabel,Table,TableBody,Popover,TableCell,TableContainer,TableHead,TableRow,Drawer,ListSubheader,CircularProgress,Grid,Card,Container,IconButton,Collapse,Typography,InputLabel,Slider,Paper,Select,Hidden,Button,FormControl,FormGroup,Checkbox,FormControlLabel,TextField,Breadcrumbs,Divider,CardContent,List,ListItem,MenuItem,ListItemText,Modal,AppBar,Tabs,Tab} from '@material-ui/core'
import AppNavbarKasa from '../layout/AppNavbarKasa'
import LogoNavbar from '../layout/LogoNavbar'
import {korpaAddProizvod,korpaRemoveProizvod} from '../../actions/korpaActions'
import PropTypes from 'prop-types'
import {login} from '../../actions/userActions'
import {addKupovina} from '../../actions/kupovinaActions'
import {clearErrors} from '../../actions/errorActions'
import CancelIcon from '@material-ui/icons/Cancel'
import { useDispatch } from 'react-redux'
    
const state = {
    ime:"",
    prezime:"",
    firma:"",
    pib:"",
    telefon:"",
    ulica:"",
    broj:"",
    grad:"",
    postanskiBroj:"",
    vrstaLica:"",
    napomene:""
}

const Korpa = ({korpa:{stavke},kupovina:{success},user:{isAuthenticated,user},error:{id,msg},login,addKupovina,clearErrors,history}) => {
    
    const [data,setData] = useState(state)
    const [errorSignal,setErrorSignal] = useState(false)
    const [aktivan, setAktivan] = React.useState(0)
    const [dostava,setDostava] = useState("kucnaDostava")
    const [vrstaKupca,setVrstaKupca] = useState()
    const [placanja,setPlacanja] = useState("placanjePoPreuzimanju")
    const [email,setEmail] = useState("")
    const [closeSignal,setCloseSignal] = useState(false)
    const [password,setPassword] = useState("")
    const [modalVisibility,setModalVisibility] = useState(false)
    const [napomene,setNapomene] = useState("")
    let price = 0
    let pdv = 0
    let ukupno2 = 0
    let ukupno = 0

    const useStyles = makeStyles((theme) => ({
        cardImage:{
            objectFit:"scale-down",
            height:"100%",
            backgroundColor:"white",
            maxHeight:90
        }
    }))

    const {ime,prezime,telefon,grad,ulica,broj,postanskiBroj,firma,pib} = data

    const classes = useStyles()

    useEffect(() =>{
        if(isAuthenticated)
        {
            setAktivan(1)
        }
        else
        {
            setAktivan(0)
        }

        clearErrors()

    },[])

    useEffect(()=>{

        if(id==='LOGIN_FAIL')
        {
            setErrorSignal(true)
            setData({...data,ime:"",prezime:"",email:"",password:""})
        }
        else
        {
            setErrorSignal(false)
        }

    },[msg])

    useEffect(()=>{

        /*if(isAuthenticated)
        {
            handleStepperChangeOne()
        }*/

        if(isAuthenticated)
        {
            if(user.ime!==null)
            {
                setData({...data,ime:user.ime,prezime:user.prezime,email:user.email,telefon:user.telefon,grad:user.grad,ulica:user.ulica,broj:user.broj,postanskiBroj:user.postanskiBroj,pib:user.pib,firma:user.firma})
                setEmail(user.email)
            }
        }

    },[isAuthenticated])

    for(let i in stavke)
    {
        price+=stavke[i].cena
    }

    for(let i in stavke)
    {
        pdv = (((100*0.2)/(100+0.2))*price).toFixed(2)
    }

    ukupno2 = Math.round((parseFloat(price) + parseFloat(pdv)))

    ukupno = (parseFloat(price) + parseFloat(pdv)).toFixed(2)

    const handleTextFieldChange = (event) => {
        setData({...data,[event.target.name]:event.target.value})
    }

    const handleTextFieldEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleTextFieldPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleStepperChangeOne = () => {
        setAktivan(1)
    }

    const handleLoginChangeOne = (event) => {

        event.preventDefault()

        const user = {
            email,password
        }

        login(user)
    }

    const handleRadioKupacChange = (event,value) => {
        setVrstaKupca(value)
    }

    const handleStepperChangeTwo = () => {
        if(vrstaKupca==='fizickoLice')
        {
            if(ime!=="" && prezime!=="" && email!=="" && telefon!=="" && ulica!=="" && broj!=="" && grad!=="" && postanskiBroj!=="")
            {
                setAktivan(2)
                setErrorSignal(false)
            }
            else
            {
                setErrorSignal(true)
            }
        }
        else
        {
            if(firma!=="" && pib!=="" && email!=="" && telefon!=="" && ulica!=="" && broj!=="" && grad!=="" && postanskiBroj!=="")
            {
                setAktivan(2)
                setErrorSignal(false)
            }
            else
            {
                setErrorSignal(true)
            }
        }
    }

    const handleStepperChangeThree = () => {
        setAktivan(3)
    }

    const handleRadioIsporukaChange = (event,value) => {
        setDostava(value)
    }

    const handleRadioPlacanjeChange = (event,value) => {
        setPlacanja(value)
    }

    const handleChange = (event) => {
        setData({...data,[event.target.name]:event.target.value})
    }

    const handleChangeNapomena = (event) => {
        setNapomene(event.target.value)
    }

    async function handleButtonSend(){

        if(isAuthenticated)
        {
            let a = await addKupovina(JSON.stringify({
                "ime":ime,
                "prezime":prezime,
                "telefon":telefon,
                "email":email,
                "grad":grad,
                "ulica":ulica,
                "broj":broj,
                "postanskiBroj":postanskiBroj,
                "firma":firma,
                "pib":pib,
                "vrstaLica":vrstaKupca,
                "stavke":stavke,
                "nacinIsporuke":dostava,
                "nacinPlacanja":placanja,
                "ukupnaCena":ukupno2,
                "napomena":napomene,
                "user":user._id
            }))
    
            if(a.success)
            {
                setModalVisibility(true)
            }
        }
        else
        {
            let a = await addKupovina(JSON.stringify({
                "ime":ime,
                "prezime":prezime,
                "telefon":telefon,
                "email":email,
                "grad":grad,
                "ulica":ulica,
                "broj":broj,
                "postanskiBroj":postanskiBroj,
                "firma":firma,
                "pib":pib,
                "vrstaLica":vrstaKupca,
                "stavke":stavke,
                "nacinIsporuke":dostava,
                "nacinPlacanja":placanja,
                "ukupnaCena":ukupno2,
                "napomena":napomene,
                "user":""
            }))
    
            if(a.success)
            {
                setModalVisibility(true)
            }

        }
    }
            
    if(closeSignal===true)
    {
        history.push('/')
    }

    useEffect(() =>{
        if(isAuthenticated)
        {
            setVrstaKupca(user.vrstaLica)
        }
        else
        {
            setVrstaKupca('fizickoLice')
        }
    }, [])

    const handleCloseModal = () => {

        setModalVisibility(false)

        setCloseSignal(true)
    }

    return (
        <div>
            <AppNavbarKasa/>
            <div>
                <Paper style={{minHeight:'100vh'}}>
                <Modal open={modalVisibility} onClose={handleCloseModal} style={{display: 'flex',alignItems: 'flex-start',justifyContent: 'center',marginTop:150}}>
                    <Grid container style={{width:500,textAlign:'center',paddingTop:50,paddingBottom:50,backgroundColor:'white'}}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Porudžbina je uspešno poslata
                            </Typography>
                        </Grid>
                    </Grid>
                </Modal>
                    <Container maxWidth="xl">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stepper activeStep={aktivan} alternativeLabel>
                                    <Step key="1">
                                        <StepLabel>Prijava</StepLabel>
                                    </Step>
                                    <Step key="2">
                                        <StepLabel>Podaci kupca</StepLabel>
                                    </Step>
                                    <Step key="3">
                                        <StepLabel>Način isporuke i plaćanja</StepLabel>
                                    </Step>
                                    <Step key="4">
                                        <StepLabel>Pregled</StepLabel>
                                    </Step>
                                </Stepper>
                            </Grid>   
                        </Grid>
                    </Container>
                        {
                            aktivan === 1 ? (
                                <span>
                                    {isAuthenticated === true ? (
                                    <span>
                                        <Container maxWidth="lg">
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <FormControl component="fieldset" fullWidth>
                                                        <RadioGroup onChange={handleRadioKupacChange} defaultValue={user.vrstaLica} row>
                                                            <FormControlLabel value="fizickoLice" control={<Radio/>} label="Fizičko lice"/>
                                                            <FormControlLabel value="pravnoLice" control={<Radio/>} label="Pravno lice"/>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                                {errorSignal ? (<Grid item xs={12}><Typography variant="h6" style={{color:'red'}}>Niste popunili sva polja</Typography></Grid>) : (<span></span>)}
                                                {vrstaKupca === "fizickoLice" ? (<Grid item xs={6}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Ime" name="ime" id="ime" error={errorSignal} defaultValue={user.ime} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>) : (<span></span>)}
                                                {vrstaKupca === "fizickoLice" ? (<Grid item xs={6}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Prezime" name="prezime" id="prezime" error={errorSignal} defaultValue={user.prezime} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>) : (<span></span>)}
                                                {vrstaKupca === "pravnoLice" ? (<Grid item xs={6}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Firma" name="firma" id="firma" error={errorSignal} defaultValue={user.firma} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>) : (<span></span>)}
                                                {vrstaKupca === "pravnoLice" ? (<Grid item xs={6}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="PIB" name="pib" id="pib" error={errorSignal} defaultValue={user.pib} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>) : (<span></span>)}
                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Email" name="email" id="email" error={errorSignal} defaultValue={user.email} variant="outlined" onChange={handleTextFieldEmailChange}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Telefon" name="telefon" id="telefon" error={errorSignal} defaultValue={user.telefon} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Ulica" name="ulica" id="ulica" error={errorSignal} defaultValue={user.ulica} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Broj" name="broj" id="broj" error={errorSignal} defaultValue={user.broj} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Grad" name="grad" id="grad" error={errorSignal} defaultValue={user.grad} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Poštanski broj" name="postanskiBroj" id="postanskiBroj" error={errorSignal} defaultValue={user.postanskiBroj} variant="outlined" onChange={handleChange}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Dodatne napomene" variant="outlined" name="napomene" id="napomene" rows={5} InputLabelProps={{shrink: true}} onChange={handleChangeNapomena} multiline/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} className="text-right mb-3">
                                                    <Button variant="contained" style={{ borderRadius: 0,width:390 }} color="primary" onClick={handleStepperChangeTwo}>
                                                        Nastavi
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </span>
                                ) : (
                                    <span>
                                    <Container maxWidth="lg">
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <FormControl component="fieldset" fullWidth>
                                                    <RadioGroup onChange={handleRadioKupacChange} value={vrstaKupca} row>
                                                        <FormControlLabel value="fizickoLice" control={<Radio/>} label="Fizičko lice"/>
                                                        <FormControlLabel value="pravnoLice" control={<Radio/>} label="Pravno lice"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            {errorSignal ? (<Grid item xs={12}><Typography variant="h6" style={{color:'red'}}>Niste popunili sva polja</Typography></Grid>) : (<span></span>)}
                                            {vrstaKupca === "fizickoLice" ? (<Grid item xs={6}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Ime" name="ime" id="ime" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>) : (<span></span>)}
                                            {vrstaKupca === "fizickoLice" ? (<Grid item xs={6}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Prezime" name="prezime" id="prezime" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>) : (<span></span>)}
                                            {vrstaKupca === "pravnoLice" ? (<Grid item xs={6}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Firma" name="firma" id="firma" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>) : (<span></span>)}
                                            {vrstaKupca === "pravnoLice" ? (<Grid item xs={6}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="PIB" name="pib" id="pib" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>) : (<span></span>)}
                                            <Grid item xs={12}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Email" name="email" id="email" error={errorSignal} variant="outlined" onChange={handleTextFieldEmailChange}/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Telefon" name="telefon" id="telefon" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Ulica" name="ulica" id="ulica" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Broj" name="broj" id="broj" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Grad" name="grad" id="grad" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Poštanski broj" name="postanskiBroj" id="postanskiBroj" error={errorSignal} variant="outlined" onChange={handleChange}/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField label="Dodatne napomene" variant="outlined" name="napomene" id="napomene" rows={5} InputLabelProps={{shrink: true}} onChange={handleChangeNapomena} multiline/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} className="text-right mb-3">
                                                <Button variant="contained" style={{ borderRadius: 0,width:390 }} color="primary" onClick={handleStepperChangeTwo}>
                                                    Nastavi
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                    </span>
                                )}

                                </span>
                                
                            ) 
                            : aktivan === 2 ? (
                                <span>
                                    <Container maxWidth="lg">
                                        <Paper variant="outlined" style={{padding:10}}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Typography variant="h6">
                                                    Način isporuke
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl component="fieldset" fullWidth>
                                                    <RadioGroup onChange={handleRadioIsporukaChange} value={dostava}>
                                                        <FormControlLabel value="kucnaDostava" control={<Radio/>} label="Dostava na kućnu adresu"/>
                                                        <FormControlLabel value="preuzimanjeProdavnica" control={<Radio/>} label="Preuzimanje u prodavnici"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h6">
                                                    Način plaćanja
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl component="fieldset" fullWidth>
                                                    <RadioGroup onChange={handleRadioPlacanjeChange} value={placanja}>
                                                        <FormControlLabel value="placanjePoPreuzimanju" control={<Radio/>} label="Plaćanje po preuzimanju"/>
                                                        <FormControlLabel value="virmanskoPlacanje" control={<Radio/>} label="Virmansko plaćanje"/>
                                                        <FormControlLabel value="placanjeKarticom" control={<Radio/>} label="Plaćanje karticom"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign:'right'}}>
                                                <Button variant="contained" style={{ borderRadius: 0,width:390 }} color="primary" onClick={handleStepperChangeThree}>
                                                    Nastavi
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        </Paper>
                                    </Container>  
                                </span> 
                            ) 
                            : aktivan === 3 ? (
                                <span>
                                    <Container maxWidth="lg">
                                        <Paper variant="outlined" style={{padding:10}}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5">
                                                        Pregled porudžbine
                                                    </Typography>
                                                </Grid>
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
                                                                {stavke.map(({cena,kolicina,nazivOpis,slika,proizvod})=>(
                                                                    <TableRow>
                                                                        <TableCell align="center"><img src={slika} className={classes.cardImage} alt={proizvod}/></TableCell>
                                                                        <TableCell align="center"><Typography>{nazivOpis}</Typography></TableCell>
                                                                        <TableCell align="center"><Typography>{cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography></TableCell>
                                                                        <TableCell align="center"><Typography>{kolicina}</Typography></TableCell>
                                                                        <TableCell align="center"><Typography>{(kolicina*cena).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography></TableCell>
                                                                    </TableRow>
                                                                ))
                                                            }
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6">
                                                                Način isporuke
                                                            </Typography>
                                                            <Typography variant="subtitle1">
                                                                {dostava === 'kucnaDostava' ? (<span>Kućna dostava</span>) : (<span>Preuzminanje u prodavnici</span>)}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6">
                                                                Način plaćanja
                                                            </Typography>
                                                            <Typography variant="subtitle1">
                                                                {placanja === 'placanjePoPreuzimanju' ? (<span>Plaćanje po preuzimanju</span>) : placanja === 'virmanskoPlacanje' ? (<span>Virmansko plaćanje</span>) : (<span>Plaćanje karticom</span>)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={6} style={{textAlign:'left'}}>
                                                    <Grid container>
                                                        <Grid xs={12}>
                                                            <Typography variant="h6">
                                                                Podaci kupca
                                                            </Typography>
                                                        </Grid>
                                                        {vrstaKupca === 'fizickoLice' ? (<Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Ime i prezime:
                                                            </Typography>
                                                        </Grid>) :(<Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Firma:
                                                            </Typography>
                                                        </Grid>)} 
                                                        {vrstaKupca === 'fizickoLice' ? (<Grid xs={6}>
                                                            <Typography variant="subtitle1" style={{textAlign:'right'}}>
                                                                {ime} {prezime}
                                                            </Typography>
                                                        </Grid>) : (<Grid xs={6}>
                                                            <Typography variant="subtitle1" style={{textAlign:'right'}}>
                                                                {firma}
                                                            </Typography>
                                                        </Grid>)}
                                                        {vrstaKupca === 'pravnoLice' ? (
                                                            <Grid xs={6}>
                                                                <Typography variant="subtitle1">
                                                                    PIB:
                                                                </Typography>
                                                            </Grid>
                                                        ) : (<span></span>)}
                                                        {vrstaKupca === 'pravnoLice' ? (
                                                            <Grid xs={6}>
                                                                <Typography variant="subtitle1" style={{textAlign:'right'}}>
                                                                    {pib}
                                                                </Typography>
                                                            </Grid>
                                                        ) : (<span></span>)}
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Email:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1" style={{textAlign:'right'}}>
                                                                {email}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Telefon:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1" style={{textAlign:'right'}}>
                                                                {telefon}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Ulica i broj:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1" style={{textAlign:'right'}}>
                                                                {ulica} {broj}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Grad:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1" style={{textAlign:'right'}}>
                                                                {grad}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Poštanski broj:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1" style={{textAlign:'right'}}>
                                                                {postanskiBroj}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Cena bez PDV:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6} style={{textAlign:'right'}}>
                                                            <Typography variant="subtitle1">
                                                                {price.toFixed(2)}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                PDV:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6} style={{textAlign:'right'}}>
                                                            <Typography variant="subtitle1">
                                                                {pdv}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <Typography variant="subtitle1">
                                                                Ukupno:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={6} style={{textAlign:'right',marginBottom:20}}>
                                                            <Typography variant="subtitle1">
                                                                {ukupno}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={10} style={{textAlign:'right',marginBottom:20}}>
                                                        </Grid>
                                                        <Grid xs={2} style={{textAlign:'right'}}>
                                                            <Button variant="contained" style={{ borderRadius: 0 }} color="primary" onClick={handleButtonSend} fullWidth>
                                                                Poruči
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Container>
                                </span>
                            )
                            : (
                                <span>
                                    <Container maxWidth="md">
                                        <Grid container spacing={6}>
                                            <Grid item xs={12}>
                                                <Grid item xs={12} className="mt-2">
                                                    <Typography variant="h5">Prijavite se</Typography>
                                                </Grid>
                                                <Grid item xs={12} className="mt-2">
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Email" name="email" id="email" error={errorSignal} variant="outlined" onChange={handleTextFieldEmailChange}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} className="mt-2">
                                                    <FormControl variant="outlined" fullWidth>
                                                        <TextField label="Lozinka" name="password" type="password" error={errorSignal} id="password" variant="outlined" onChange={handleTextFieldPasswordChange}/>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} className="mt-2">
                                                    <Button variant="contained" color="primary" onClick={handleLoginChangeOne} fullWidth>
                                                        Prijava
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} className="mt-2">
                                                    <Button variant="contained" color="secondary" onClick={handleStepperChangeOne} fullWidth>
                                                        Nastavi bez prijave
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Container>  
                                </span>
                            )
                        }
                </Paper>
            </div>
            <LogoNavbar/>
        </div>
    )
}

Korpa.propTypes = {
    korpa:PropTypes.object.isRequired,
    kupovina:PropTypes.object.isRequired,
    korpaAddProizvod:PropTypes.func.isRequired,
    korpaRemoveProizvod:PropTypes.func.isRequired,
    addKupovina:PropTypes.func.isRequired,
    login:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    error:PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired  
}

const mapStateToProps = (state) => ({
    korpa:state.korpa,
    user:state.user,
    error:state.error,
    kupovina:state.kupovina
})

export default withRouter(connect(mapStateToProps,{clearErrors,korpaAddProizvod,login,addKupovina})(Korpa))