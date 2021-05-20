import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {makeStyles,Drawer,ListSubheader,CircularProgress,Grid,Card,Container,IconButton,Collapse,Typography,InputLabel,Slider,Paper,Select,Hidden,Button,FormControl,FormGroup,Checkbox,FormControlLabel,TextField,Breadcrumbs,Divider,CardContent,List,ListItem,MenuItem,ListItemText,Modal,AppBar,Tabs,Tab} from '@material-ui/core'
import AppNavbar from '../layout/AppNavbar'
import LogoNavbar from '../layout/LogoNavbar'
import {getProizvodiQuery,clearProizvodi} from '../../actions/proizvodActions'
import { useQueryParam, NumberParam, StringParam,ArrayParam,JsonParam,useQueryParams,withDefault} from 'use-query-params'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import MenuIcon from '@material-ui/icons/Menu'

const CpuSearchPage = ({proizvod:{proizvodiQuery,isLoading},getProizvodiQuery,history}) => {

    const [drawerOpen,setDrawerOpen] = useState(false)
    const [signal,setSignal] = useState(false)

    //CUSTOM
    const [proizvodjacChecked,setProizvodjacChecked] = useState(false)
    const [tipProcesoraChecked,setTipProcesoraChecked] = useState(false)
    const [podnozjeChecked,setPodnozjeChecked] = useState(false)
    const [brojJezgaraChecked,setBrojJezgaraChecked] = useState(false)
    const [nitiChecked,setNitiChecked] = useState(false)
    const [tdpChecked,setTdpChecked] = useState(false)

    const [cenaRaspon,setCenaRaspon] = useState([])
    const [cenaMin,setCenaMin] = useState(cenaRaspon[0])
    const [cenaMax,setCenaMax] = useState(cenaRaspon[1])
    const [cenaNiz,setCenaNiz] = useState([])

    //CUSTOM
    const [proizvodjacNiz,setProizvodjacNiz] = useState([])
    const [tipProcesoraNiz,setTipProcesoraNiz] = useState([])
    const [podnozjeNiz,setPodnozjeNiz] = useState([])
    const [brojJezgaraNiz,setBrojJezgaraNiz] = useState([])
    const [nitiNiz,setNitiNiz] = useState([])
    const [tdpNiz,setTdpNiz] = useState([])

    const [cenaToQuery,setCenaToQuery] = useQueryParam('cenaDo',NumberParam)
    const [cenaFromQuery,setCenaFromQuery] = useQueryParam('cenaOd',NumberParam)
    const [brojStraneQuery,setBrojStraneQuery] = useQueryParam('brojStrane',NumberParam)
    const [sortByQuery,setSortByQuery] = useQueryParam('sortBy',NumberParam)
    const [orderByQuery,setOrderByQuery] = useQueryParam('orderBy',StringParam)

    //CUSTOM
    const [proizvodjacQuery,setProizvodjacQuery] = useQueryParam('proizvodjac',withDefault(ArrayParam, []))
    const [tipProcesoraQuery,setTipProcesoraQuery] = useQueryParam('tipProcesora',withDefault(ArrayParam, []))
    const [podnozjeQuery,setPodnozjeQuery] = useQueryParam('podnozje',withDefault(ArrayParam, []))
    const [brojJezgaraQuery,setBrojJezgaraQuery] = useQueryParam('brojJezgara',withDefault(ArrayParam, []))
    const [nitiQuery,setNitiQuery] = useQueryParam('niti',withDefault(ArrayParam, []))
    const [tdpQuery,setTdpQuery] = useQueryParam('tdp',withDefault(ArrayParam, []))

    //CUSTOM
    const [proizvodjacNizAux,setProizvodjacNizAux] = useState(proizvodjacQuery)
    const [tipProcesoraNizAux,setTipProcesoraNizAux] = useState(tipProcesoraQuery)
    const [podnozjeNizAux,setPodnozjeNizAux] = useState(podnozjeQuery)
    const [brojJezgaraNizAux,setBrojJezgaraNizAux] = useState(brojJezgaraQuery)
    const [nitiNizAux,setNitiNizAux] = useState(nitiQuery)
    const [tdpNizAux,setTdpNizAux] = useState(tdpQuery)

    const [lowCena,setLowCena] = useState(cenaRaspon[0])
    const [highCena,setHighCena] = useState(cenaRaspon[1])
    const [sortVal,setSortVal] = useState("")

    const cenaPodesi = () => {

        setCenaToQuery(undefined)
        setCenaFromQuery(undefined)

        {proizvodiQuery.filter.map(({cena})=>(
            cenaNiz.push(cena)
        ))}

        setCenaNiz([...new Set(cenaNiz)])

        let cenaMin = Math.min(...cenaNiz)
        let cenaMax = Math.max(...cenaNiz)

        setCenaMin(cenaMin)
        setCenaMax(cenaMax)
        setLowCena(cenaMin)
        setHighCena(cenaMax)

        cenaRaspon.push(cenaMin)
        cenaRaspon.push(cenaMax)
    }

    const useStyles = makeStyles((theme) => ({
        marginTop14Procent:{
            marginTop:"34vh"
        },
        breadcrumbLink:{
            color:'black',
            '&:hover': {
                color:'black'
            }
        },
        sortSelectCustomWidth:{
            minWidth: 240,
            [theme.breakpoints.down('sm')]: {
                minWidth: 120,
            },
        },
        cardImage:{
            width:"100%",
            objectFit:"scale-down",
            height:"100%",
            backgroundColor:"white",
            maxHeight:150
        },
        cardImageHover:{
            transitionProperty:"filter",
            transitionDuration:"0.2s",
            '&:hover': {
                filter: `brightness(85%)`
            }
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
            padding:0,
            marginTop:'0px !important'
        },
        nazivOpisOptions:{
            paddingBottom:14,
            paddingLeft:20,
            height:30,
            color:"black",
            textDecoration:"none",
            '&:hover': {
                color:"black",
                textDecoration:"none",
            }
        },
        cenaOptions:{
            paddingLeft:20,
            paddingBottom:10
        },
        recenzijeOptions:{
            paddingTop:14,
            paddingLeft:20,
        },
        iconButtonNoHover:{
        color:"black",
        backgroundColor:'white',
          '&:hover': {
              backgroundColor:'white',
          },
          '&:active': {
            backgroundColor:'white',
            color:'black'
          }
        },
        item:{
            color:"black",
            textDecoration:"none",
            '&:hover': {
                color:"black",
                textDecoration:"none",
                cursor:'pointer !important'
            },
            cursor:'pointer !important',
            display: 'inline',
            [theme.breakpoints.up('sm')]: {
                display: 'inline',
            },
            padding:2
        },
        listWidth:{
          width: 250
        }
    }))

    const classes = useStyles()

    const handleSliderChange = (event,value) => {

        setCenaRaspon(value)
        setCenaFromQuery(value[0])
        setCenaToQuery(value[1])

        setLowCena(value[0])
        setHighCena(value[1])
        getProizvodiQuery()   
        setSignal(false)
    }

    //CUSTOM
    const fillQuery = () => {

        if(proizvodjacQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({proizvodjac})=>(
                proizvodjacNiz.push({checked:JSON.parse(localStorage.getItem(proizvodjac)),value:proizvodjac})
            ))}
    
            setProizvodjacNiz([...new Set(proizvodjacNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({proizvodjac})=>(
                proizvodjacNiz.push({checked:localStorage.setItem(proizvodjac,false),value:proizvodjac})
            ))}
    
            setProizvodjacNiz([...new Set(proizvodjacNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }

        if(tipProcesoraQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({tipProcesora})=>(
                tipProcesoraNiz.push({checked:JSON.parse(localStorage.getItem(tipProcesora)),value:tipProcesora})
            ))}
    
            setTipProcesoraNiz([...new Set(tipProcesoraNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({tipProcesora})=>(
                tipProcesoraNiz.push({checked:localStorage.setItem(tipProcesora,false),value:tipProcesora})
            ))}
    
            setTipProcesoraNiz([...new Set(tipProcesoraNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }

        if(podnozjeQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({podnozje})=>(
                podnozjeNiz.push({checked:JSON.parse(localStorage.getItem(podnozje)),value:podnozje})
            ))}
    
            setPodnozjeNiz([...new Set(podnozjeNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({podnozje})=>(
                podnozjeNiz.push({checked:localStorage.setItem(podnozje,false),value:podnozje})
            ))}
    
            setPodnozjeNiz([...new Set(podnozjeNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(brojJezgaraQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({brojJezgara})=>(
                brojJezgaraNiz.push({checked:JSON.parse(localStorage.getItem(brojJezgara)),value:brojJezgara})
            ))}
    
            setBrojJezgaraNiz([...new Set(brojJezgaraNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({brojJezgara})=>(
                brojJezgaraNiz.push({checked:localStorage.setItem(brojJezgara,false),value:brojJezgara})
            ))}
    
            setBrojJezgaraNiz([...new Set(brojJezgaraNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(nitiQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({niti})=>(
                nitiNiz.push({checked:JSON.parse(localStorage.getItem(niti)),value:niti})
            ))}
    
            setNitiNiz([...new Set(nitiNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({niti})=>(
                nitiNiz.push({checked:localStorage.setItem(niti,false),value:niti})
            ))}
    
            setNitiNiz([...new Set(nitiNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(tdpQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({tdp})=>(
                tdpNiz.push({checked:JSON.parse(localStorage.getItem(tdp)),value:tdp})
            ))}
    
            setTdpNiz([...new Set(tdpNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({tdp})=>(
                tdpNiz.push({checked:localStorage.setItem(tdp,false),value:tdp})
            ))}
    
            setTdpNiz([...new Set(tdpNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
    }

    //CUSTOM
    const handleCheckboxProizvodjacChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<proizvodjacNiz.length;i++)
        {
            if(proizvodjacNiz[i].value===event.target.name)
            {
                proizvodjacNiz[i].checked=value
            }
        }

        if(value===true)
        {
            proizvodjacNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<proizvodjacNizAux.length;i++)
            {
                if(proizvodjacNizAux[i]===event.target.name)
                {
                    proizvodjacNizAux.splice(i,1)
                }
            }
        }

        setProizvodjacQuery(proizvodjacNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxTipProcesoraChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<tipProcesoraNiz.length;i++)
        {
            if(tipProcesoraNiz[i].value===event.target.name)
            {
                tipProcesoraNiz[i].checked=value
            }
        }

        if(value===true)
        {
            tipProcesoraNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<tipProcesoraNizAux.length;i++)
            {
                if(tipProcesoraNizAux[i]===event.target.name)
                {
                    tipProcesoraNizAux.splice(i,1)
                }
            }
        }

        setTipProcesoraQuery(tipProcesoraNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxPodnozjeChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<podnozjeNiz.length;i++)
        {
            if(podnozjeNiz[i].value===event.target.name)
            {
                podnozjeNiz[i].checked=value
            }
        }

        if(value===true)
        {
            podnozjeNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<podnozjeNizAux.length;i++)
            {
                if(podnozjeNizAux[i]===event.target.name)
                {
                    podnozjeNizAux.splice(i,1)
                }
            }
        }

        setPodnozjeQuery(podnozjeNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }    

    //CUSTOM
    const handleCheckboxBrojJezgaraChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<brojJezgaraNiz.length;i++)
        {
            if(brojJezgaraNiz[i].value===event.target.name)
            {
                brojJezgaraNiz[i].checked=value
            }
        }

        if(value===true)
        {
            brojJezgaraNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<brojJezgaraNizAux.length;i++)
            {
                if(brojJezgaraNizAux[i]===event.target.name)
                {
                    brojJezgaraNizAux.splice(i,1)
                }
            }
        }

        setBrojJezgaraQuery(brojJezgaraNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxBrojNitiChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<nitiNiz.length;i++)
        {
            if(nitiNiz[i].value===event.target.name)
            {
                nitiNiz[i].checked=value
            }
        }

        if(value===true)
        {
            nitiNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<nitiNizAux.length;i++)
            {
                if(nitiNizAux[i]===event.target.name)
                {
                    nitiNizAux.splice(i,1)
                }
            }
        }

        setNitiQuery(nitiNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }    

    //CUSTOM    
    const handleCheckboxTdpChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<tdpNiz.length;i++)
        {
            if(tdpNiz[i].value===event.target.name)
            {
                tdpNiz[i].checked=value
            }
        }

        if(value===true)
        {
            tdpNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<tdpNizAux.length;i++)
            {
                if(tdpNizAux[i]===event.target.name)
                {
                    tdpNizAux.splice(i,1)
                }
            }
        }

        setTdpQuery(tdpNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    const handleSortChange = (event,value) => {
        if(event.target.value==="Cena opadajuce")
        {
            setOrderByQuery("cena")
            setSortByQuery(-1)
            setSortVal("Cena opadajuce")
        }
        else if(event.target.value==="Cena rastuce")
        {
            setOrderByQuery("cena")
            setSortByQuery(1)
            setSortVal("Cena rastuce")
        }
        else if(event.target.value==="Najnovije")
        {
            setOrderByQuery("datum")
            setSortByQuery(-1)
            setSortVal("Najnovije")
        }
        else
        {
            setOrderByQuery(undefined)
            setSortByQuery(undefined)
            setSortVal("")
        }

        getProizvodiQuery()
        setSignal(false)
    }

    const handleBrojStraneChange = (event,value) => {
        window.scrollTo(0, 0)
        setBrojStraneQuery(value)
        getProizvodiQuery()
        setSignal(false)
    }

    const handleToggleDrawer = () => {
        setDrawerOpen((prev) => !prev)
    }

    //CUSTOM
    const handleButtonProizvodjacChecked = () => {
        setProizvodjacChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonTipProcesoraChecked = () => {
        setTipProcesoraChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonPodnozjeChecked = () => {
        setPodnozjeChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonBrojJezgaraChecked = () => {
        setBrojJezgaraChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonNitiChecked = () => {
        setNitiChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonTdpChecked = () => {
        setTdpChecked((prev) => !prev)
    }

    useEffect(() =>{

        clearProizvodi() 
        getProizvodiQuery()
        setSignal(true)

        if(brojStraneQuery===undefined)
        {
            setBrojStraneQuery(1)
        }
        
    },[])

    useEffect(() =>{

        if(!isLoading && signal===true)
        {
            {
                cenaPodesi()
                fillQuery()
            }
        }

    },[isLoading])

    return (
        <div>
            <AppNavbar/>
            <Paper>
            <Container maxWidth="xl">
                <Grid container spacing={1} className="mt-1">
                    <Grid container>
                        <Grid item xs={12} className="text-left pt-3 pr-3">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link style={{ textDecoration: 'none'}} to="/"><Typography color="textPrimary">Početna strana</Typography></Link>
                                <Link style={{ textDecoration: 'none'}} to="/racunariKomponente"><Typography color="textPrimary">Računari i komponente</Typography></Link>
                                <Link style={{ textDecoration: 'none'}} to="/racunariKomponente/komponente"><Typography color="textPrimary">Komponente</Typography></Link>
                                <Link style={{ textDecoration: 'none'}} to={history.location.pathname+history.location.search}><Typography color="textPrimary">Procesori</Typography></Link>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <Grid container>
                    <Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
                            <div role="presentation" className={classes.listWidth} onKeyDown={handleToggleDrawer}>
                        <Grid item xs={12} md={3} className="mt-1">
                            <List className="pt-0 pb-0">
                                <ListItem key="cenaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Cena</ListItemText>
                                </ListItem>
                                <Divider/>
                                <ListItem key="cenaIndicatorKey" className="pt-3 pb-0">
                                    <ListItemText className="text-left"><span>{lowCena === undefined ? (<span></span>) : (<span>{lowCena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>) } RSD</span></ListItemText>
                                    <ListItemText className="text-right"><span>{highCena === undefined ? (<span></span>) : (<span>{highCena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>) } RSD</span></ListItemText>
                                </ListItem>
                                <ListItem key="cenaSliderKey" className="pt-3 pb-0">
                                    <Slider style={{ color:'inherit' }} value={cenaRaspon} min={cenaMin} max={cenaMax} onChange={handleSliderChange}/>
                                </ListItem>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="proizvodjacLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Proizvođač</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {proizvodjacNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={proizvodjacChecked} collapsedHeight={140}>
                                                {proizvodjacNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxProizvodjacChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonProizvodjacChecked}>
                                                <ListItemText className="text-center" fullWidth>{proizvodjacChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {proizvodjacNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxProizvodjacChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="tipProcesoraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Tip procesora</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tipProcesoraNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tipProcesoraChecked} collapsedHeight={140}>
                                                {tipProcesoraNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipProcesoraChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTipProcesoraChecked}>
                                                <ListItemText className="text-center" fullWidth>{tipProcesoraChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tipProcesoraNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipProcesoraChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="podnozjeLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Podnožje</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {podnozjeNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={podnozjeChecked} collapsedHeight={140}>
                                                {podnozjeNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodnozjeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonPodnozjeChecked}>
                                                <ListItemText className="text-center" fullWidth>{podnozjeChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {podnozjeNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodnozjeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="brojJezgaraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Broj jezgara</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {brojJezgaraNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={brojJezgaraChecked} collapsedHeight={140}>
                                                {brojJezgaraNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojJezgaraChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonBrojJezgaraChecked}>
                                                <ListItemText className="text-center" fullWidth>{brojJezgaraChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {brojJezgaraNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojJezgaraChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="nitiLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Threads</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {nitiNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={nitiChecked} collapsedHeight={140}>
                                                {nitiNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojNitiChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonNitiChecked}>
                                                <ListItemText className="text-center" fullWidth>{nitiChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {nitiNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojNitiChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="tdpLabelKey" className="pt-0 pb-0">
                                    <ListItemText>TDP</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tdpNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tdpChecked} collapsedHeight={140}>
                                                {tdpNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTdpChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTdpChecked}>
                                                <ListItemText className="text-center" fullWidth>{tdpChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tdpNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTdpChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                        </Grid>
                            </div>
                        </Drawer>
                        <Hidden smDown>
                        <Grid item xs={12} md={3} className="mt-1">
                            <List className="pt-0 pb-0">
                                <ListItem key="cenaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Cena</ListItemText>
                                </ListItem>
                                <Divider/>
                                <ListItem key="cenaIndicatorKey" className="pt-3 pb-0">
                                    <ListItemText className="text-left"><span>{lowCena === undefined ? (<span></span>) : (<span>{lowCena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>) } RSD</span></ListItemText>
                                    <ListItemText className="text-right"><span>{highCena === undefined ? (<span></span>) : (<span>{highCena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>) } RSD</span></ListItemText>
                                </ListItem>
                                <ListItem key="cenaSliderKey" className="pt-3 pb-0">
                                    <Slider style={{ color:'inherit' }} value={cenaRaspon} min={cenaMin} max={cenaMax} onChange={handleSliderChange}/>
                                </ListItem>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="proizvodjacLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Proizvođač</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {proizvodjacNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={proizvodjacChecked} collapsedHeight={140}>
                                                {proizvodjacNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxProizvodjacChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonProizvodjacChecked}>
                                                <ListItemText className="text-center" fullWidth>{proizvodjacChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {proizvodjacNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxProizvodjacChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="tipProcesoraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Tip procesora</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tipProcesoraNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tipProcesoraChecked} collapsedHeight={140}>
                                                {tipProcesoraNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipProcesoraChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTipProcesoraChecked}>
                                                <ListItemText className="text-center" fullWidth>{tipProcesoraChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tipProcesoraNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipProcesoraChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="podnozjeLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Podnožje</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {podnozjeNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={podnozjeChecked} collapsedHeight={140}>
                                                {podnozjeNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodnozjeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonPodnozjeChecked}>
                                                <ListItemText className="text-center" fullWidth>{podnozjeChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {podnozjeNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodnozjeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="brojJezgaraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Broj jezgara</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {brojJezgaraNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={brojJezgaraChecked} collapsedHeight={140}>
                                                {brojJezgaraNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojJezgaraChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonBrojJezgaraChecked}>
                                                <ListItemText className="text-center" fullWidth>{brojJezgaraChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {brojJezgaraNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojJezgaraChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="nitiLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Threads</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {nitiNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={nitiChecked} collapsedHeight={140}>
                                                {nitiNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojNitiChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonNitiChecked}>
                                                <ListItemText className="text-center" fullWidth>{nitiChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {nitiNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojNitiChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="tdpLabelKey" className="pt-0 pb-0">
                                    <ListItemText>TDP</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tdpNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tdpChecked} collapsedHeight={140}>
                                                {tdpNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTdpChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTdpChecked}>
                                                <ListItemText className="text-center" fullWidth>{tdpChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tdpNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTdpChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                        </Grid>
                        </Hidden>
                        <Grid item xs={12} md={9}>
                            <Grid container>
                                <Grid item xs={6} className="p-3 pb-0 mt-3 text-left">
                                    <Hidden mdUp>
                                        <span style={{ textDecoration: 'none',color:'inherit' }}>
                                            <IconButton onClick={handleToggleDrawer}>
                                                <MenuIcon/><Typography variant="h4">{'\u00A0'}Procesori</Typography>
                                            </IconButton>
                                        </span>                
                                    </Hidden>
                                    <Hidden smDown>
                                        <Typography variant="h4">Procesori</Typography>            
                                    </Hidden>
                                </Grid>
                                <Grid item xs={6} className="p-3 pb-0 mt-3 text-right">
                                    <FormControl variant="outlined" className={classes.sortSelectCustomWidth}>
                                        <InputLabel id="label">Sortiranje</InputLabel>
                                        <Select inputlabelprops={{shrink: true}} className="text-left" label="Sortiranje" id="Sortiranje" onChange={handleSortChange} value={sortVal}>
                                            <MenuItem value="" id="">Poništi</MenuItem>
                                            <MenuItem value="Cena opadajuce" id="Cena opadajuce">Cena opadajuće</MenuItem>
                                            <MenuItem value="Cena rastuce" id="Cena rastuce">Cena rastuće</MenuItem>
                                            <MenuItem value="Najnovije" id="Najnovije">Najnovije</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {isLoading ? (
                                    <Container maxWidth="xl">
                                        <Grid container className={classes.marginTop14Procent} justify="center">
                                            <CircularProgress color="inherit" size={80}/>
                                        </Grid>
                                    </Container>
                                ) : (
                                    <span>
                                    <Grid container spacing={1} className="p-3">
                                        {proizvodiQuery.proizvodi.map(({slike,_id/*,recenzije*/,cena,nazivOpis})=>(
                                            <Grid item xs={12} sm={6} md={4}>
                                                    <Card variant="outlined">
                                                        <Link to={`${_id}`} color="inherit" underline="none" className={classes.cardImageHover}><img src={slike[0]} className={classes.cardImage} alt={_id}/></Link>
                                                        <CardContent className="text-left">
                                                            <Typography variant="subtitle2">
                                                                {/*{recenzije < 2 ? (<span>★☆☆☆☆</span>) : recenzije < 4 ? (<span>★★☆☆☆</span>) : recenzije < 6 ? (<span>★★★☆☆</span>) : recenzije < 8 ? (<span>★★★★☆</span>) : (<span>★★★★★</span>)}
                                                                    <span>{'\u00A0'}</span>
                                                                ({recenzije.length})*/}
                                                            </Typography>
                                                            <Link style={{ textDecoration: 'none',color:'inherit' }} color="inherit" underline="none" to={`${_id}`}>
                                                                <Typography variant="body2" component="p">
                                                                    {nazivOpis.length > 10 ? (<span>{nazivOpis.toString().substring(0,Math.ceil(nazivOpis.length/2))+"..."}</span>) : (<span>{nazivOpis.toString()}</span>)}
                                                                </Typography>
                                                            </Link>
                                                            <Typography variant="subtitle2">
                                                                <b>{cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} RSD</b>
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {proizvodiQuery.proizvodiStrane > 1 ? (
                                        <span>
                                            <Grid className="p-2 pb-4" container justify="center" alignItems="center">
                                                <Pagination variant="outlined" count={Math.ceil(proizvodiQuery.proizvodiStrane)} onChange={handleBrojStraneChange} defaultPage={brojStraneQuery}/>
                                            </Grid>
                                        </span>
                                    ) : (
                                        <span>
                                            <Grid container justify="center" alignItems="center">
                                                
                                            </Grid>
                                        </span>
                                    )}
                                    </span>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            </Paper>
            <LogoNavbar/>
        </div>
    )

    //return (<div></div>)
}

CpuSearchPage.propTypes = {
    getProizvodiQuery: PropTypes.func.isRequired,
    proizvod:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    proizvod:state.proizvod
})

export default withRouter(connect(mapStateToProps,{getProizvodiQuery})(CpuSearchPage))