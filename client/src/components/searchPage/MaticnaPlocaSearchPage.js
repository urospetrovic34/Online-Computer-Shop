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

const MaticnaPlocaSearchPage = ({proizvod:{proizvodiQuery,isLoading},getProizvodiQuery,history}) => {

    const [drawerOpen,setDrawerOpen] = useState(false)
    const [signal,setSignal] = useState(false)

    //CUSTOM
    const [tipCpuChecked,setTipCpuChecked] = useState(false)
    const [podnozjePloceChecked,setPodnozjePloceChecked] = useState(false)
    const [cipsetChecked,setCipsetChecked] = useState(false)
    const [formatPloceChecked,setFormatPloceChecked] = useState(false)
    const [podrzanaMemorijaChecked,setPodrzanaMemorijaChecked] = useState(false)

    const [cenaRaspon,setCenaRaspon] = useState([])
    const [cenaMin,setCenaMin] = useState(cenaRaspon[0])
    const [cenaMax,setCenaMax] = useState(cenaRaspon[1])
    const [cenaNiz,setCenaNiz] = useState([])

    //CUSTOM
    const [tipCpuNiz,setTipCpuNiz] = useState([])
    const [podnozjePloceNiz,setPodnozjePloceNiz] = useState([])
    const [cipsetNiz,setCipsetNiz] = useState([])
    const [formatPloceNiz,setFormatPloceNiz] = useState([])
    const [podrzanaMemorijaNiz,setPodrzanaMemorijaNiz] = useState([])

    const [cenaToQuery,setCenaToQuery] = useQueryParam('cenaDo',NumberParam)
    const [cenaFromQuery,setCenaFromQuery] = useQueryParam('cenaOd',NumberParam)
    const [brojStraneQuery,setBrojStraneQuery] = useQueryParam('brojStrane',NumberParam)
    const [sortByQuery,setSortByQuery] = useQueryParam('sortBy',NumberParam)
    const [orderByQuery,setOrderByQuery] = useQueryParam('orderBy',StringParam)

    //CUSTOM
    const [tipCpuQuery,setTipCpuQuery] = useQueryParam('tipProcesora',withDefault(ArrayParam, []))
    const [podnozjePloceQuery,setPodnozjePloceQuery] = useQueryParam('podnozjePloce',withDefault(ArrayParam, []))
    const [cipsetQuery,setCipsetQuery] = useQueryParam('cipset',withDefault(ArrayParam, []))
    const [formatPloceQuery,setFormatPloceQuery] = useQueryParam('formatPloce',withDefault(ArrayParam, []))
    const [podrzanaMemorijaQuery,setPodrzanaMemorijaQuery] = useQueryParam('podrzanaMemorija',withDefault(ArrayParam, []))

    //CUSTOM
    const [tipCpuNizAux,setTipCpuNizAux] = useState(tipCpuQuery)
    const [podnozjePloceNizAux,setPodnozjePloceNizAux] = useState(podnozjePloceQuery)
    const [cipsetNizAux,setCipsetNizAux] = useState(cipsetQuery)
    const [formatPloceNizAux,setFormatPloceNizAux] = useState(formatPloceQuery)
    const [podrzanaMemorijaNizAux,setPodrzanaMemorijaNizAux] = useState(podrzanaMemorijaQuery)

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

        if(tipCpuQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({tipProcesora})=>(
                tipCpuNiz.push({checked:JSON.parse(localStorage.getItem(tipProcesora)),value:tipProcesora})
            ))}
    
            setTipCpuNiz([...new Set(tipCpuNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({tipProcesora})=>(
                tipCpuNiz.push({checked:localStorage.setItem(tipProcesora,false),value:tipProcesora})
            ))}
    
            setTipCpuNiz([...new Set(tipCpuNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }

        if(podnozjePloceQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({podnozjePloce})=>(
                podnozjePloceNiz.push({checked:JSON.parse(localStorage.getItem(podnozjePloce)),value:podnozjePloce})
            ))}
    
            setPodnozjePloceNiz([...new Set(podnozjePloceNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({podnozjePloce})=>(
                podnozjePloceNiz.push({checked:localStorage.setItem(podnozjePloce,false),value:podnozjePloce})
            ))}
    
            setPodnozjePloceNiz([...new Set(podnozjePloceNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }

        if(cipsetQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({cipset})=>(
                cipsetNiz.push({checked:JSON.parse(localStorage.getItem(cipset)),value:cipset})
            ))}
    
            setCipsetNiz([...new Set(cipsetNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({cipset})=>(
                cipsetNiz.push({checked:localStorage.setItem(cipset,false),value:cipset})
            ))}
    
            setCipsetNiz([...new Set(cipsetNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(formatPloceQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({formatPloce})=>(
                formatPloceNiz.push({checked:JSON.parse(localStorage.getItem(formatPloce)),value:formatPloce})
            ))}
    
            setFormatPloceNiz([...new Set(formatPloceNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({formatPloce})=>(
                formatPloceNiz.push({checked:localStorage.setItem(formatPloce,false),value:formatPloce})
            ))}
    
            setFormatPloceNiz([...new Set(formatPloceNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(podrzanaMemorijaQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({podrzanaMemorija})=>(
                podrzanaMemorijaNiz.push({checked:JSON.parse(localStorage.getItem(podrzanaMemorija)),value:podrzanaMemorija})
            ))}
    
            setPodrzanaMemorijaNiz([...new Set(podrzanaMemorijaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({podrzanaMemorija})=>(
                podrzanaMemorijaNiz.push({checked:localStorage.setItem(podrzanaMemorija,false),value:podrzanaMemorija})
            ))}
    
            setPodrzanaMemorijaNiz([...new Set(podrzanaMemorijaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
    }

    //CUSTOM
    const handleCheckboxTipCpuChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<tipCpuNiz.length;i++)
        {
            if(tipCpuNiz[i].value===event.target.name)
            {
                tipCpuNiz[i].checked=value
            }
        }

        if(value===true)
        {
            tipCpuNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<tipCpuNizAux.length;i++)
            {
                if(tipCpuNizAux[i]===event.target.name)
                {
                    tipCpuNizAux.splice(i,1)
                }
            }
        }

        setTipCpuQuery(tipCpuNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxPodnozjePloceChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<podnozjePloceNiz.length;i++)
        {
            if(podnozjePloceNiz[i].value===event.target.name)
            {
                podnozjePloceNiz[i].checked=value
            }
        }

        if(value===true)
        {
            podnozjePloceNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<podnozjePloceNizAux.length;i++)
            {
                if(podnozjePloceNizAux[i]===event.target.name)
                {
                    podnozjePloceNizAux.splice(i,1)
                }
            }
        }

        setPodnozjePloceQuery(podnozjePloceNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxCipsetChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<cipsetNiz.length;i++)
        {
            if(cipsetNiz[i].value===event.target.name)
            {
                cipsetNiz[i].checked=value
            }
        }

        if(value===true)
        {
            cipsetNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<cipsetNizAux.length;i++)
            {
                if(cipsetNizAux[i]===event.target.name)
                {
                    cipsetNizAux.splice(i,1)
                }
            }
        }

        setCipsetQuery(cipsetNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }    

    //CUSTOM
    const handleCheckboxFormatPloceChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<formatPloceNiz.length;i++)
        {
            if(formatPloceNiz[i].value===event.target.name)
            {
                formatPloceNiz[i].checked=value
            }
        }

        if(value===true)
        {
            formatPloceNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<formatPloceNizAux.length;i++)
            {
                if(formatPloceNizAux[i]===event.target.name)
                {
                    formatPloceNizAux.splice(i,1)
                }
            }
        }

        setFormatPloceQuery(formatPloceNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxPodrzanaMemorijaChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<podrzanaMemorijaNiz.length;i++)
        {
            if(podrzanaMemorijaNiz[i].value===event.target.name)
            {
                podrzanaMemorijaNiz[i].checked=value
            }
        }

        if(value===true)
        {
            podrzanaMemorijaNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<podrzanaMemorijaNizAux.length;i++)
            {
                if(podrzanaMemorijaNizAux[i]===event.target.name)
                {
                    podrzanaMemorijaNizAux.splice(i,1)
                }
            }
        }

        setPodrzanaMemorijaQuery(podrzanaMemorijaNizAux)
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
    const handleButtonTipCpuChecked = () => {
        setTipCpuChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonPodnozjePloceChecked = () => {
        setPodnozjePloceChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonCipsetChecked = () => {
        setCipsetChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonFormatPloceChecked = () => {
        setFormatPloceChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonPodrzanaMemorijaChecked = () => {
        setPodrzanaMemorijaChecked((prev) => !prev)
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
                                    <ListItemText>Tip procesora</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tipCpuNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tipCpuChecked} collapsedHeight={140}>
                                                {tipCpuNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipCpuChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTipCpuChecked}>
                                                <ListItemText className="text-center" fullWidth>{tipCpuChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tipCpuNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipCpuChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="tipProcesoraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Podnožje ploče</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {podnozjePloceNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={podnozjePloceChecked} collapsedHeight={140}>
                                                {podnozjePloceNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodnozjePloceChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonPodnozjePloceChecked}>
                                                <ListItemText className="text-center" fullWidth>{podnozjePloceChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {podnozjePloceNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodnozjePloceChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="podnozjeLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Čipset</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {cipsetNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={cipsetChecked} collapsedHeight={140}>
                                                {cipsetNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxCipsetChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonCipsetChecked}>
                                                <ListItemText className="text-center" fullWidth>{cipsetChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {cipsetNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxCipsetChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="formatPloceLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Format ploče</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {formatPloceNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={formatPloceChecked} collapsedHeight={140}>
                                                {formatPloceNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxFormatPloceChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonFormatPloceChecked}>
                                                <ListItemText className="text-center" fullWidth>{formatPloceChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {formatPloceNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxFormatPloceChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="nitiLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Podržana memorija</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {podrzanaMemorijaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={podrzanaMemorijaChecked} collapsedHeight={140}>
                                                {podrzanaMemorijaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodrzanaMemorijaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonPodrzanaMemorijaChecked}>
                                                <ListItemText className="text-center" fullWidth>{podrzanaMemorijaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {podrzanaMemorijaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodrzanaMemorijaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
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
                                    <ListItemText>Tip CPU</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tipCpuNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tipCpuChecked} collapsedHeight={140}>
                                                {tipCpuNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipCpuChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTipCpuChecked}>
                                                <ListItemText className="text-center" fullWidth>{tipCpuChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tipCpuNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipCpuChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="podnozjePloceLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Podnožje ploče</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {podnozjePloceNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={podnozjePloceChecked} collapsedHeight={140}>
                                                {podnozjePloceNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodnozjePloceChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonPodnozjePloceChecked}>
                                                <ListItemText className="text-center" fullWidth>{podnozjePloceChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {podnozjePloceNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodnozjePloceChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="podnozjeLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Čipset</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {cipsetNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={cipsetChecked} collapsedHeight={140}>
                                                {cipsetNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxCipsetChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonCipsetChecked}>
                                                <ListItemText className="text-center" fullWidth>{cipsetChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {cipsetNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxCipsetChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="brojJezgaraLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Format ploče</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {formatPloceNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={formatPloceChecked} collapsedHeight={140}>
                                                {formatPloceNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxFormatPloceChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonFormatPloceChecked}>
                                                <ListItemText className="text-center" fullWidth>{formatPloceChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {formatPloceNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxFormatPloceChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="nitiLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Podržana memorija</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {podrzanaMemorijaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={podrzanaMemorijaChecked} collapsedHeight={140}>
                                                {podrzanaMemorijaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodrzanaMemorijaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonPodrzanaMemorijaChecked}>
                                                <ListItemText className="text-center" fullWidth>{podrzanaMemorijaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {podrzanaMemorijaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxPodrzanaMemorijaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
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

MaticnaPlocaSearchPage.propTypes = {
    getProizvodiQuery: PropTypes.func.isRequired,
    proizvod:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    proizvod:state.proizvod
})

export default withRouter(connect(mapStateToProps,{getProizvodiQuery})(MaticnaPlocaSearchPage))