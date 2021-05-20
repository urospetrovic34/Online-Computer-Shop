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
    const [tipHddChecked,setTipHddChecked] = useState(false)
    const [formatDiskaChecked,setFormatDiskaChecked] = useState(false)
    const [konekcijaDiskaChecked,setKonekcijaDiskaChecked] = useState(false)
    const [kapacitetDiskaChecked,setKapacitetDiskaChecked] = useState(false)
    const [brojObrtajaChecked,setBrojObrtajaChecked] = useState(false)
    const [bufferDiskaChecked,setBufferDiskaChecked] = useState(false)

    const [cenaRaspon,setCenaRaspon] = useState([])
    const [cenaMin,setCenaMin] = useState(cenaRaspon[0])
    const [cenaMax,setCenaMax] = useState(cenaRaspon[1])
    const [cenaNiz,setCenaNiz] = useState([])

    //CUSTOM
    const [tipHddNiz,setTipHddNiz] = useState([])
    const [formatDiskaNiz,setFormatDiskaNiz] = useState([])
    const [konekcijaDiskaNiz,setKonekcijaDiskaNiz] = useState([])
    const [kapacitetDiskaNiz,setKapacitetDiskaNiz] = useState([])
    const [brojObrtajaNiz,setBrojObrtajaNiz] = useState([])
    const [bufferDiskaNiz,setBufferDiskaNiz] = useState([])

    const [cenaToQuery,setCenaToQuery] = useQueryParam('cenaDo',NumberParam)
    const [cenaFromQuery,setCenaFromQuery] = useQueryParam('cenaOd',NumberParam)
    const [brojStraneQuery,setBrojStraneQuery] = useQueryParam('brojStrane',NumberParam)
    const [sortByQuery,setSortByQuery] = useQueryParam('sortBy',NumberParam)
    const [orderByQuery,setOrderByQuery] = useQueryParam('orderBy',StringParam)

    //CUSTOM
    const [tipHddQuery,setTipHddQuery] = useQueryParam('tipHdd',withDefault(ArrayParam, []))
    const [formatDiskaQuery,setFormatDiskaQuery] = useQueryParam('formatDiska',withDefault(ArrayParam, []))
    const [konekcijaDiskaQuery,setKonekcijaDiskaQuery] = useQueryParam('konekcijaDiska',withDefault(ArrayParam, []))
    const [kapacitetDiskaQuery,setKapacitetDiskaQuery] = useQueryParam('kapacitetDiska',withDefault(ArrayParam, []))
    const [brojObrtajaQuery,setBrojObrtajaQuery] = useQueryParam('brojObrtaja',withDefault(ArrayParam, []))
    const [bufferDiskaQuery,setBufferDiskaQuery] = useQueryParam('bufferDiska',withDefault(ArrayParam, []))

    //CUSTOM
    const [tipHddNizAux,setTipHddNizAux] = useState(tipHddQuery)
    const [formatDiskaNizAux,setFormatDiskaNizAux] = useState(formatDiskaQuery)
    const [konekcijaDiskaNizAux,setKonekcijaDiskaNizAux] = useState(konekcijaDiskaQuery)
    const [kapacitetDiskaNizAux,setKapacitetDiskaNizAux] = useState(kapacitetDiskaQuery)
    const [brojObrtajaNizAux,setBrojObrtajaNizAux] = useState(brojObrtajaQuery)
    const [bufferDiskaNizAux,setBufferDiskaNizAux] = useState(bufferDiskaQuery)

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

        if(tipHddQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({tipHdd})=>(
                tipHddNiz.push({checked:JSON.parse(localStorage.getItem(tipHdd)),value:tipHdd})
            ))}
    
            setTipHddNiz([...new Set(tipHddNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({tipHdd})=>(
                tipHddNiz.push({checked:localStorage.setItem(tipHdd,false),value:tipHdd})
            ))}
    
            setTipHddNiz([...new Set(tipHddNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }

        if(formatDiskaQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({formatDiska})=>(
                formatDiskaNiz.push({checked:JSON.parse(localStorage.getItem(formatDiska)),value:formatDiska})
            ))}
    
            setFormatDiskaNiz([...new Set(formatDiskaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({formatDiska})=>(
                formatDiskaNiz.push({checked:localStorage.setItem(formatDiska,false),value:formatDiska})
            ))}
    
            setFormatDiskaNiz([...new Set(formatDiskaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }

        if(konekcijaDiskaQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({konekcijaDiska})=>(
                konekcijaDiskaNiz.push({checked:JSON.parse(localStorage.getItem(konekcijaDiska)),value:konekcijaDiska})
            ))}
    
            setKonekcijaDiskaNiz([...new Set(konekcijaDiskaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({konekcijaDiska})=>(
                konekcijaDiskaNiz.push({checked:localStorage.setItem(konekcijaDiska,false),value:konekcijaDiska})
            ))}
    
            setKonekcijaDiskaNiz([...new Set(konekcijaDiskaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(kapacitetDiskaQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({kapacitetDiska})=>(
                kapacitetDiskaNiz.push({checked:JSON.parse(localStorage.getItem(kapacitetDiska)),value:kapacitetDiska})
            ))}
    
            setKapacitetDiskaNiz([...new Set(kapacitetDiskaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({kapacitetDiska})=>(
                kapacitetDiskaNiz.push({checked:localStorage.setItem(kapacitetDiska,false),value:kapacitetDiska})
            ))}
    
            setKapacitetDiskaNiz([...new Set(kapacitetDiskaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(brojObrtajaQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({brojObrtaja})=>(
                brojObrtajaNiz.push({checked:JSON.parse(localStorage.getItem(brojObrtaja)),value:brojObrtaja})
            ))}
    
            setBrojObrtajaNiz([...new Set(brojObrtajaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({brojObrtaja})=>(
                brojObrtajaNiz.push({checked:localStorage.setItem(brojObrtaja,false),value:brojObrtaja})
            ))}
    
            setBrojObrtajaNiz([...new Set(brojObrtajaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        
        if(bufferDiskaQuery.length!==0)
        {
            {proizvodiQuery.filter.map(({bufferDiska})=>(
                bufferDiskaNiz.push({checked:JSON.parse(localStorage.getItem(bufferDiska)),value:bufferDiska})
            ))}
    
            setBufferDiskaNiz([...new Set(bufferDiskaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
        else
        {
            {proizvodiQuery.filter.map(({bufferDiska})=>(
                bufferDiskaNiz.push({checked:localStorage.setItem(bufferDiska,false),value:bufferDiska})
            ))}
    
            setBufferDiskaNiz([...new Set(bufferDiskaNiz.map(e => JSON.stringify(e)))].map(e => JSON.parse(e)))
        }
    }

    //CUSTOM
    const handleCheckboxTipHddChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<tipHddNiz.length;i++)
        {
            if(tipHddNiz[i].value===event.target.name)
            {
                tipHddNiz[i].checked=value
            }
        }

        if(value===true)
        {
            tipHddNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<tipHddNizAux.length;i++)
            {
                if(tipHddNizAux[i]===event.target.name)
                {
                    tipHddNizAux.splice(i,1)
                }
            }
        }

        setTipHddQuery(tipHddNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxFormatDiskaChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<formatDiskaNiz.length;i++)
        {
            if(formatDiskaNiz[i].value===event.target.name)
            {
                formatDiskaNiz[i].checked=value
            }
        }

        if(value===true)
        {
            formatDiskaNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<formatDiskaNizAux.length;i++)
            {
                if(formatDiskaNizAux[i]===event.target.name)
                {
                    formatDiskaNizAux.splice(i,1)
                }
            }
        }

        setFormatDiskaQuery(formatDiskaNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxKonekcijaDiskaChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<konekcijaDiskaNiz.length;i++)
        {
            if(konekcijaDiskaNiz[i].value===event.target.name)
            {
                konekcijaDiskaNiz[i].checked=value
            }
        }

        if(value===true)
        {
            konekcijaDiskaNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<konekcijaDiskaNizAux.length;i++)
            {
                if(konekcijaDiskaNizAux[i]===event.target.name)
                {
                    konekcijaDiskaNizAux.splice(i,1)
                }
            }
        }

        setKonekcijaDiskaQuery(konekcijaDiskaNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }    

    //CUSTOM
    const handleCheckboxBrojObrtajaChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<brojObrtajaNiz.length;i++)
        {
            if(brojObrtajaNiz[i].value===event.target.name)
            {
                brojObrtajaNiz[i].checked=value
            }
        }

        if(value===true)
        {
            brojObrtajaNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<brojObrtajaNizAux.length;i++)
            {
                if(brojObrtajaNizAux[i]===event.target.name)
                {
                    brojObrtajaNizAux.splice(i,1)
                }
            }
        }

        setBrojObrtajaQuery(brojObrtajaNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }

    //CUSTOM
    const handleCheckboxBufferDiskaChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<bufferDiskaNiz.length;i++)
        {
            if(bufferDiskaNiz[i].value===event.target.name)
            {
                bufferDiskaNiz[i].checked=value
            }
        }

        if(value===true)
        {
            bufferDiskaNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<bufferDiskaNizAux.length;i++)
            {
                if(bufferDiskaNizAux[i]===event.target.name)
                {
                    bufferDiskaNizAux.splice(i,1)
                }
            }
        }

        setBufferDiskaQuery(bufferDiskaNizAux)
        setBrojStraneQuery(1)
        getProizvodiQuery()
        setSignal(false)
    }    

    //CUSTOM    
    const handleCheckboxKapacitetDiskaChange = (event,value) => {

        localStorage.setItem(event.target.name,event.target.checked)

        for(let i=0;i<kapacitetDiskaNiz.length;i++)
        {
            if(kapacitetDiskaNiz[i].value===event.target.name)
            {
                kapacitetDiskaNiz[i].checked=value
            }
        }

        if(value===true)
        {
            kapacitetDiskaNizAux.push(event.target.name)
        }
        else
        {
            for(let i=0;i<kapacitetDiskaNizAux.length;i++)
            {
                if(kapacitetDiskaNizAux[i]===event.target.name)
                {
                    kapacitetDiskaNizAux.splice(i,1)
                }
            }
        }

        setKapacitetDiskaQuery(kapacitetDiskaNizAux)
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
    const handleButtonTipHddChecked = () => {
        setTipHddChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonFormatDiskaChecked = () => {
        setFormatDiskaChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonKonekcijaDiskaChecked = () => {
        setKonekcijaDiskaChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonBrojObrtajaChecked = () => {
        setBrojObrtajaChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonBufferDiskaChecked = () => {
        setBufferDiskaChecked((prev) => !prev)
    }

    //CUSTOM
    const handleButtonKapacitetDiskaChecked = () => {
        setKapacitetDiskaChecked((prev) => !prev)
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
                                <ListItem key="tipHddLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Tip HDD</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tipHddNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tipHddChecked} collapsedHeight={140}>
                                                {tipHddNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipHddChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTipHddChecked}>
                                                <ListItemText className="text-center" fullWidth>{tipHddChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tipHddNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipHddChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="formatDiskaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Format HDD</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {formatDiskaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={formatDiskaChecked} collapsedHeight={140}>
                                                {formatDiskaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxFormatDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonFormatDiskaChecked}>
                                                <ListItemText className="text-center" fullWidth>{formatDiskaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {formatDiskaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxFormatDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="konekcijaDiskaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Konekcija HDD</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {konekcijaDiskaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={konekcijaDiskaChecked} collapsedHeight={140}>
                                                {konekcijaDiskaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKonekcijaDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonKonekcijaDiskaChecked}>
                                                <ListItemText className="text-center" fullWidth>{konekcijaDiskaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {konekcijaDiskaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKonekcijaDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="brojObrtajaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Broj obrtaja</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {brojObrtajaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={brojObrtajaChecked} collapsedHeight={140}>
                                                {brojObrtajaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojObrtajaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonBrojObrtajaChecked}>
                                                <ListItemText className="text-center" fullWidth>{brojObrtajaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {brojObrtajaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojObrtajaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="bufferDiskaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Bafer</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {bufferDiskaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={bufferDiskaChecked} collapsedHeight={140}>
                                                {bufferDiskaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBufferDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonBufferDiskaChecked}>
                                                <ListItemText className="text-center" fullWidth>{bufferDiskaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {bufferDiskaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBufferDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="kapacitetDiskaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Kapacitet HDD</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {kapacitetDiskaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={kapacitetDiskaChecked} collapsedHeight={140}>
                                                {kapacitetDiskaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKapacitetDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonKapacitetDiskaChecked}>
                                                <ListItemText className="text-center" fullWidth>{kapacitetDiskaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {kapacitetDiskaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKapacitetDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
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
                                <ListItem key="tipHddLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Tip HDD</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {tipHddNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={tipHddChecked} collapsedHeight={140}>
                                                {tipHddNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipHddChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonTipHddChecked}>
                                                <ListItemText className="text-center" fullWidth>{tipHddChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {tipHddNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxTipHddChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="formatDiskaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Format HDD</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {formatDiskaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={formatDiskaChecked} collapsedHeight={140}>
                                                {formatDiskaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxFormatDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonFormatDiskaChecked}>
                                                <ListItemText className="text-center" fullWidth>{formatDiskaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {formatDiskaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxFormatDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="konekcijaDiskaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Konekcija HDD</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {konekcijaDiskaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={konekcijaDiskaChecked} collapsedHeight={140}>
                                                {konekcijaDiskaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKonekcijaDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonKonekcijaDiskaChecked}>
                                                <ListItemText className="text-center" fullWidth>{konekcijaDiskaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {konekcijaDiskaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKonekcijaDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="brojObrtajaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Broj obrtaja</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {brojObrtajaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={brojObrtajaChecked} collapsedHeight={140}>
                                                {brojObrtajaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojObrtajaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonBrojObrtajaChecked}>
                                                <ListItemText className="text-center" fullWidth>{brojObrtajaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {brojObrtajaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBrojObrtajaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="bufferDiskaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>Bafer</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {bufferDiskaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={bufferDiskaChecked} collapsedHeight={140}>
                                                {bufferDiskaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBufferDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonBufferDiskaChecked}>
                                                <ListItemText className="text-center" fullWidth>{bufferDiskaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {bufferDiskaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxBufferDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                </ListItem>
                                            ))}
                                        </span>
                                    )}
                                </FormGroup>
                            </List>
                            <List className="pt-0 pb-0">
                                <ListItem key="kapacitetDiskaLabelKey" className="pt-0 pb-0">
                                    <ListItemText>TDP</ListItemText>
                                </ListItem>
                                <Divider/>
                                <FormGroup>
                                    {kapacitetDiskaNiz.length > 3 ? (
                                        <span>
                                            <Collapse in={kapacitetDiskaChecked} collapsedHeight={140}>
                                                {kapacitetDiskaNiz.map(e=>(
                                                    <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                        <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKapacitetDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
                                                    </ListItem>
                                                ))}
                                            </Collapse>
                                            <ListItem button onClick={handleButtonKapacitetDiskaChecked}>
                                                <ListItemText className="text-center" fullWidth>{kapacitetDiskaChecked === false ? (<span>Prikaži više</span>) : (<span>Prikaži manje</span>)}</ListItemText>
                                            </ListItem>
                                        </span>
                                    ) : (
                                        <span>
                                            {kapacitetDiskaNiz.map(e=>(
                                                <ListItem key={e.value.toString()} className="pt-0 pb-0">
                                                    <FormControlLabel control={<Checkbox checked={e.checked} onChange={handleCheckboxKapacitetDiskaChange} name={e.value.toString()} id={e.value.toString()}/>} label={e.value.toString()}/>
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