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

const GpuSearchPage = ({proizvod:{proizvodiQuery,isLoading},getProizvodiQuery,history}) => {

    const [drawerOpen,setDrawerOpen] = useState(false)
    const [signal,setSignal] = useState(false)

    //CUSTOMx
    const [kolicinaMemorijeChecked,setKolicinaMemorijeChecked] = useState(false)
    const [tipMemorijeChecked,setTipMemorijeChecked] = useState(false)
    const [magistralaMemorijeChecked,setMagistralaMemorijeChecked] = useState(false)

    const [cenaRaspon,setCenaRaspon] = useState([])
    const [cenaMin,setCenaMin] = useState(cenaRaspon[0])
    const [cenaMax,setCenaMax] = useState(cenaRaspon[1])
    const [cenaNiz,setCenaNiz] = useState([])

    //CUSTOM
    const [kolicinaMemorijeNiz,setKolicinaMemorijeNiz] = useState([])
    const [tipMemorijeNiz,setTipMemorijeNiz] = useState([])
    const [magistralaMemorijeNiz,setMagistralaMemorijeNiz] = useState([])

    const [cenaToQuery,setCenaToQuery] = useQueryParam('cenaDo',NumberParam)
    const [cenaFromQuery,setCenaFromQuery] = useQueryParam('cenaOd',NumberParam)
    const [brojStraneQuery,setBrojStraneQuery] = useQueryParam('brojStrane',NumberParam)
    const [sortByQuery,setSortByQuery] = useQueryParam('sortBy',NumberParam)
    const [orderByQuery,setOrderByQuery] = useQueryParam('orderBy',StringParam)

    //CUSTOM
    const [kolicinaMemorijeQuery,setKolicinaMemorijeQuery] = useQueryParam('kolicinaMemorije',withDefault(ArrayParam, []))
    const [tipMemorijeQuery,setTipMemorijeQuery] = useQueryParam('tipMemorije',withDefault(ArrayParam, []))
    const [magistralaMemorijeQuery,setMagistralaMemorijeQuery] = useQueryParam('magistralaMemorije',withDefault(ArrayParam, []))

    //CUSTOM
    const [kolicinaMemorijeNizAux,setKolicinaMemorijeNizAux] = useState(kolicinaMemorijeQuery)
    const [tipMemorijeNizAux,setTipMemorijeNizAux] = useState(tipMemorijeQuery)
    const [magistralaMemorijeNizAux,setMagistralaMemorijeNizAux] = useState(magistralaMemorijeQuery)

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

        if(kolicinaMemorijeQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({kolicinaMemorije})=>(
                kolicinaMemorijeNiz.push({checked:JSON.parse(localStorage.getItem(kolicinaMemorije)),value:kolicinaMemorije})
            ))}
    
            setKolicinaMemorijeNiz([...new Set(kolicinaMemorijeNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({kolicinaMemorije})=>(
                kolicinaMemorijeNiz.push({checked:localStorage.setItem(kolicinaMemorije,false),value:kolicinaMemorije})
            ))}
    
            setKolicinaMemorijeNiz([...new Set(kolicinaMemorijeNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }

        if(tipMemorijeQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({tipMemorije})=>(
                tipMemorijeNiz.push({checked:JSON.parse(localStorage.getItem(tipMemorije)),value:tipMemorije})
            ))}
    
            setTipMemorijeNiz([...new Set(tipMemorijeNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({tipMemorije})=>(
                tipMemorijeNiz.push({checked:localStorage.setItem(tipMemorije,false),value:tipMemorije})
            ))}
    
            setTipMemorijeNiz([...new Set(tipMemorijeNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(magistralaMemorijeQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({magistralaMemorije})=>(
                magistralaMemorijeNiz.push({checked:JSON.parse(localStorage.getItem(magistralaMemorije)),value:magistralaMemorije})
            ))}
    
            setMagistralaMemorijeNiz([...new Set(magistralaMemorijeNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({magistralaMemorije})=>(
                magistralaMemorijeNiz.push({checked:localStorage.setItem(magistralaMemorije,false),value:magistralaMemorije})
            ))}
    
            setMagistralaMemorijeNiz([...new Set(magistralaMemorijeNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
    }

    //CUSTOM
    const handleCheckboxKolicinaMemorijeChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<kolicinaMemorijeNiz.length;i++)
        {
            if(kolicinaMemorijeNiz[i].value===event.target.name)
            {
                kolicinaMemorijeNiz[i].checked=value
            }
        }

        if(value===true)
        {
            kolicinaMemorijeNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<kolicinaMemorijeNizAux.length;i++)
            {
                if(kolicinaMemorijeNizAux[i]===event.target.name)
                {
                    kolicinaMemorijeNizAux.splice(i,1)
                }
            }
        }

        setKolicinaMemorijeQuery(kolicinaMemorijeNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxTipMemorijeChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<tipMemorijeNiz.length;i++)
        {
            if(tipMemorijeNiz[i].value===event.target.name)
            {
                tipMemorijeNiz[i].checked=value
            }
        }

        if(value===true)
        {
            tipMemorijeNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<tipMemorijeNizAux.length;i++)
            {
                if(tipMemorijeNizAux[i]===event.target.name)
                {
                    tipMemorijeNizAux.splice(i,1)
                }
            }
        }

        setTipMemorijeQuery(tipMemorijeNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }    

    //CUSTOM
    const handleCheckboxMagistralaMemorijeChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<magistralaMemorijeNiz.length;i++)
        {
            if(magistralaMemorijeNiz[i].value===event.target.name)
            {
                magistralaMemorijeNiz[i].checked=value
            }
        }

        if(value===true)
        {
            magistralaMemorijeNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<magistralaMemorijeNizAux.length;i++)
            {
                if(magistralaMemorijeNizAux[i]===event.target.name)
                {
                    magistralaMemorijeNizAux.splice(i,1)
                }
            }
        }

        setMagistralaMemorijeQuery(magistralaMemorijeNizAux)
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
    const handleButtonKolicinaMemorijeChecked = () => {
        setKolicinaMemorijeChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonTipMemorijeChecked = () => {
        setTipMemorijeChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonMagistralaMemorijeChecked = () => {
        setMagistralaMemorijeChecked((prev) => !prev)
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
                                <ListItem key="tipProcesoraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Količina memorije</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {kolicinaMemorijeNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={kolicinaMemorijeChecked} collapsedHeight={140}>
                                                {kolicinaMemorijeNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKolicinaMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonKolicinaMemorijeChecked}>
                                                <ListItemText className="text-center" fullWidth>{kolicinaMemorijeChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {kolicinaMemorijeNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKolicinaMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="podnozjeLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Tip memorije</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tipMemorijeNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tipMemorijeChecked} collapsedHeight={140}>
                                                {tipMemorijeNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTipMemorijeChecked}>
                                                <ListItemText className="text-center" fullWidth>{tipMemorijeChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tipMemorijeNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="brojJezgaraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Magistrala memorije</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {magistralaMemorijeNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={magistralaMemorijeChecked} collapsedHeight={140}>
                                                {magistralaMemorijeNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxMagistralaMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonMagistralaMemorijeChecked}>
                                                <ListItemText className="text-center" fullWidth>{magistralaMemorijeChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {magistralaMemorijeNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxMagistralaMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
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
                                <ListItem key="tipProcesoraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Količina memorije</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {kolicinaMemorijeNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={kolicinaMemorijeChecked} collapsedHeight={140}>
                                                {kolicinaMemorijeNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKolicinaMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonKolicinaMemorijeChecked}>
                                                <ListItemText className="text-center" fullWidth>{kolicinaMemorijeChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {kolicinaMemorijeNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKolicinaMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="podnozjeLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Magistrala memorije</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {magistralaMemorijeNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={magistralaMemorijeChecked} collapsedHeight={140}>
                                                {magistralaMemorijeNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTipMemorijeChecked}>
                                                <ListItemText className="text-center" fullWidth>{magistralaMemorijeChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {magistralaMemorijeNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipMemorijeChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
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

GpuSearchPage.propTypes = {
    getProizvodiQuery: PropTypes.func.isRequired,
    proizvod:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    proizvod:state.proizvod
})

export default withRouter(connect(mapStateToProps,{getProizvodiQuery})(GpuSearchPage))