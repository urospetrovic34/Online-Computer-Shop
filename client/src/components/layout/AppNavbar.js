import React, {useEffect,useContext,useState,useRef,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {logout} from '../../actions/userActions'
import {AppBar,Toolbar,Grid,Modal,Popper,createMuiTheme,Collapse,Typography,Hidden,Paper,makeStyles,InputBase,IconButton,Drawer,List,ListItem,ListItemText,Divider,ListItemIcon,Menu,MenuItem,ListSubheader} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PropTypes from 'prop-types'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import {useMediaQuery} from 'react-responsive'
import useDarkMode from 'use-dark-mode'
import {ThemeContext} from '../../util/ThemeContext'

const AppNavbar = ({user:{isAuthenticated,user},korpa:{stavke},logout}) => {

    const [drawerOpen,setDrawerOpen] = useState(false)
    const [menuOpen,setMenuOpen] = useState(false)
    const [laptopOpen,setLaptopOpen] = useState(false)
    const [komponenteOpen,setKomponenteOpen] = useState(false)
    const [opremaOpen,setOpremaOpen] = useState(false)
    const [laptopDrawer,setLaptopDrawer] = useState(false)
    const [komponenteDrawer,setKomponenteDrawer] = useState(false)
    const [opremaDrawer,setOpremaDrawer] = useState(false)
    const [textPretrage,setTextPretrage] = useState("")
    const [theme,setTheme] = useContext(ThemeContext)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const menuEl = useRef()
    const [anchorEl2,setAnchorEl2] = React.useState(null)

    console.log(theme)

    const useStyles = makeStyles((theme) => ({
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
        item:{
            color:"white",
            textDecoration:"none",
            '&:hover': {
                color:"white",
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
        item2:{
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
        itemBlack:{
            color:"black",
            textDecoration:"none",
            '&:hover': {
                color:"black",
                textDecoration:"none",
            },
            display: 'inline',
            [theme.breakpoints.up('sm')]: {
                display: 'inline',
            },
            padding:2
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: "white",
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('md')]: {
              marginLeft: theme.spacing(3),
              width: 'auto',
            },
            [theme.breakpoints.down('sm')]: {
              marginLeft: theme.spacing(3),
              width: '100%',
            }
          },
          searchIcon: {
            height: '100%',
            position: 'absolute',
            borderRadius: theme.shape.borderRadius,
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.up('md')]: {
              marginLeft: theme.spacing(63)
            },
            [theme.breakpoints.down('sm')]: {
                marginLeft: '92%'
            },
            [theme.breakpoints.down('xs')]: {
                marginLeft: '90%'
            },
            zIndex:999
          },
          inputRoot: {
            color: 'black'
          },
          inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: 10,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
              width: '60ch'
            }
          },
          listWidth:{
            width: 250
          },
          listWidth2:{
            width: 200,
            paddingTop:0,
            paddingBottom:0
          },
          listWidth3:{
            width: 240,
            paddingTop:0,
            paddingBottom:0
          },
          menuWidth:{
            width: 175,
          },
          iconButtonNoHover:{
            '&:hover': {
                backgroundColor:'inherit'
            }
          },
          customListItem:{
              backgroundColor:"green",
              color:"white",
              '&:hover': {
                  color:"white",
                  backgroundColor:"green",
              },
          },
          contextMenu:{
            position:'fixed',
            zIndex:10000,
            width:'150px',
            background:'#1b1a1a',
            borderRadius:'5px',
            transform:'scale(0)',
            transformOrigin:'top left'
          },
          contextItem:{
            padding:'8px 10px',
            fontSize:'15px',
            color:'#eee'
          },
          popperList:{
              backgroundColor: '#fff',
              position:'relative',
              zIndex:100000
          },
          popperListSchwarz:{
              backgroundColor: '#000',
              position:'relative',
              zIndex:100000
          },
          tealOrangeBack:{
              backgroundColor:theme.palette.secondary.main,
              color:theme.palette.secondary.contrastText
          }
    }))

    const classes = useStyles()

    const handleSearch = () => {
        window.location.replace("/pretraga")
    }

    const handleToggleDrawer = () => {
        setDrawerOpen((prev) => !prev)
        setLaptopOpen(false)
        setKomponenteOpen(false)
        setOpremaOpen(false)
    }

    const handleToggleMenu = (event) => {
        setAnchorEl(event.currentTarget)
        setMenuOpen((prev) => !prev)
    }

    const handleLogoutChange = () => {
        logout()
    }
    const handleLaptopClick = (event) => {
        setLaptopOpen(true)
        setKomponenteOpen(false)
        setOpremaOpen(false)
        setAnchorEl2(menuEl.current)
    }

    const handleLaptopClick2 = (event) => {
        
    }

    const handleKomponentaClick = () => {
        setLaptopOpen(false)
        setKomponenteOpen(true)
        setOpremaOpen(false)
        setAnchorEl2(menuEl.current)
    }

    const handleOpremaClick = () => {
        setLaptopOpen(false)
        setKomponenteOpen(false)
        setOpremaOpen(true)
        setAnchorEl2(menuEl.current)
    }

    const handleDarkModeClick = () => {
        setLaptopOpen(false)
        setKomponenteOpen(false)
        setOpremaOpen(false)
    }

    const handleDarkMode = () => {
        if(theme==='light')
        {
            setTheme('dark')
        }
        else
        {
            setTheme('light')
        }
    }

    const loggedOut = (
        <Fragment>
            {stavke.length === 0 ? (
            <span className="pt-2 pl-2 pb-2"><IconButton color="inherit" className={classes.iconButtonNoHover}>
                <ShoppingCartIcon style={{ color: 'white' }}/><Typography variant="subtitle1" className={classes.item}><Link to={`/korpa`} className={classes.item}>Korpa</Link></Typography>
            </IconButton></span>
            ) : (
            <span className="pt-2 pl-2 pb-2"><IconButton color="inherit" className={classes.iconButtonNoHover}>
                <ShoppingCartIcon style={{ color: 'green' }}/><Typography variant="subtitle1" className={classes.item}><Link to={`/korpa`} className={classes.item}>Korpa</Link></Typography>
            </IconButton></span>
            )}
            <span className="p-2"><Typography variant="subtitle1" className={classes.item} onClick={handleToggleMenu}>Nalog</Typography></span>
            <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleToggleMenu} keepMounted>
                <MenuItem><Typography variant="subtitle1" className={classes.itemBlack}><Link to={`/login`} className={classes.itemBlack}>Prijava</Link></Typography></MenuItem>
                <MenuItem><Typography variant="subtitle1" className={classes.itemBlack}><Link to={`/register`} className={classes.itemBlack}>Registracija</Link></Typography></MenuItem>
            </Menu>
        </Fragment>
    )
    const loggedIn = (
        
        <Fragment>
            {stavke === "" ? (
            <span className="pt-2 pl-2 pb-2"><IconButton color="inherit" className={classes.iconButtonNoHover}>
                <ShoppingCartIcon/><Typography variant="subtitle1" className={classes.item}><Link to={`/korpa`} className={classes.item}>Korpa</Link></Typography>
            </IconButton></span>
            ) : (
            <span className="pt-2 pl-2 pb-2"><IconButton color="inherit" className={classes.iconButtonNoHover}>
                <ShoppingCartIcon style={{ color: 'green' }}/><Typography variant="subtitle1" className={classes.item}><Link to={`/korpa`} className={classes.item}>Korpa</Link></Typography>
            </IconButton></span>
            )}
            <span className="p-2"><Typography variant="subtitle1" className={classes.item}><Link to={`/nalog`} className={classes.item}>{user === null ? (<span></span>) : (<span>{user.ime} {user.prezime}</span>)}</Link></Typography></span>
            <span className="p-2"><Typography variant="subtitle1" className={classes.item} onClick={handleLogoutChange}>Odjava</Typography></span>
        </Fragment>
    )
    const adminloggedIn = (
        
        <Fragment>
            {stavke === "" ? (
            <span className="pt-2 pl-2 pb-2"><IconButton color="inherit" className={classes.iconButtonNoHover}>
                <ShoppingCartIcon/><Typography variant="subtitle1" className={classes.item}><Link to={`/korpa`} className={classes.item}>Korpa</Link></Typography>
            </IconButton></span>
            ) : (
            <span className="pt-2 pl-2 pb-2"><IconButton color="inherit" className={classes.iconButtonNoHover}>
                <ShoppingCartIcon style={{ color: 'green' }}/><Typography variant="subtitle1" className={classes.item}><Link to={`/korpa`} className={classes.item}>Korpa</Link></Typography>
            </IconButton></span>
            )}
            <span className="p-2"><Typography variant="subtitle1" className={classes.item}><Link to={`/admin`} className={classes.item}>{user === null ? (<span></span>) : (<span>Admin</span>)}</Link></Typography></span>
            <span className="p-2"><Typography variant="subtitle1" className={classes.item} onClick={handleLogoutChange}>Odjava</Typography></span>
        </Fragment>
    )

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" className="mr-auto"><Link to={`/`} className={classes.title}>Store</Link></Typography>
                    <Hidden smDown>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <IconButton color="inherit" onClick={handleSearch}>
                                    <SearchIcon/>
                                </IconButton>
                            </div>
                            <InputBase placeholder="Pretraga" classes={{root:classes.inputRoot,input:classes.inputInput}} inputProps={{ 'aria-label': 'search' }}/>
                        </div>
                    </Hidden>
                    {isAuthenticated ? (loggedIn) : (loggedOut)}
                </Toolbar>
            </AppBar>
            <Hidden mdUp>
                <AppBar position="relative">
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <IconButton color="inherit" onClick={handleSearch}>
                                    <SearchIcon/>
                                </IconButton>
                            </div>
                            <InputBase placeholder="Pretraga" classes={{root:classes.inputRoot,input:classes.inputInput}} inputProps={{ 'aria-label': 'search' }}/>
                        </div>
                    </Toolbar>
                </AppBar>
            </Hidden>
            <AppBar position="relative" color="secondary">
                <Toolbar>
                    <IconButton color="inherit" onClick={handleToggleDrawer} className={classes.iconButtonNoHover}>
                        <MenuIcon className={classes.item}/><Typography variant="subtitle1" className={classes.item}>Ponuda</Typography>
                    </IconButton>
                    <Link to={`/`} style={{textDecoration: 'none',color:'white'}}><Typography variant="subtitle1" className="p-2">Akcije</Typography></Link>
                    <Link to={`/`} style={{ textDecoration: 'none',color:'white'}}><Typography variant="subtitle1" className="p-2">Katalog</Typography></Link>
                    <Hidden mdUp>
                        <span>
                        <Drawer id="drawer" anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
                            <div role="presentation" className={classes.listWidth} onKeyDown={handleToggleDrawer}>
                                <List className="pt-0">
                                    <ListSubheader className={classes.tealOrangeBack}><Typography variant="h5" className="pt-4 pr-2 pb-4 text-center">Prodavnica</Typography></ListSubheader>
                                    <Divider/>
                                    <span>
                                        <ListItem ref={menuEl} key="text0">
                                            <b><Typography variant="h6">Sve kategorije</Typography></b>
                                        </ListItem>
                                    </span>
                                    <Divider/>
                                    <ListItem button key="text1" onClick={handleLaptopClick}>
                                        <Typography color="textPrimary"><ListItemText primary="Prenosni računari"/></Typography>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem button key="text5" onClick={handleKomponentaClick}>
                                        <Link to={`/racunariKomponente`} style={{ textDecoration: 'none'}}><Typography color="textPrimary"><ListItemText primary="Računari i komponente"/></Typography></Link>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem button key="text9" onClick={handleOpremaClick}>
                                        <Link to={`/racunarskaOprema`} style={{ textDecoration: 'none'}}><Typography color="textPrimary"><ListItemText primary="Računarska oprema"/></Typography></Link>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem key="text13">
                                        <b><Typography variant="h6">Nalog i podešavanja</Typography></b>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem button key="text14">
                                        <ListItemIcon>
                                            <Brightness5Icon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Noćni režim" onClick={handleDarkMode}/>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem button key="text15">
                                        <Link style={{color:"inherit",textDecoration:'none'}} to={`/login`}><ListItemText primary="Prijava"/></Link>
                                    </ListItem>
                                </List>
                            </div>
                        </Drawer>
                        </span>
                    </Hidden>
                    <Hidden smDown>
                        <span>
                        <Drawer id="drawer" anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
                            <div role="presentation" className={classes.listWidth} onKeyDown={handleToggleDrawer}>
                                <List className="pt-0">
                                    <ListSubheader className={classes.tealOrangeBack}><Typography variant="h5" className="pt-4 pr-2 pb-4 text-center">Prodavnica</Typography></ListSubheader>
                                    <Divider/>
                                    <span>
                                        <ListItem ref={menuEl} key="text0">
                                            <b><Typography variant="h6">Sve kategorije</Typography></b>
                                        </ListItem>
                                    </span>
                                    <Divider/>
                                    <ListItem button key="text1" onMouseEnter={handleLaptopClick}>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography color="textPrimary"><ListItemText primary="Prenosni računari"/></Typography></Link>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem button key="text5" onMouseEnter={handleKomponentaClick}>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography color="textPrimary"><ListItemText primary="Računari i komponente"/></Typography></Link>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem button key="text9" onMouseEnter={handleOpremaClick}>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography color="textPrimary"><ListItemText primary="Računarska oprema"/></Typography></Link>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem key="text13">
                                        <b><Typography variant="h6">Nalog i podešavanja</Typography></b>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem button key="text14">
                                        <ListItemIcon>
                                            <Brightness5Icon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Noćni režim" onClick={handleDarkMode} onMouseEnter={handleDarkModeClick}/>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem button key="text15">
                                        <Link style={{color:"inherit",textDecoration:'none'}} to={`/login`}><ListItemText primary="Prijava"/></Link>
                                    </ListItem>
                                </List>
                            </div>
                        </Drawer>
                        </span>
                    </Hidden>
                </Toolbar>
            </AppBar>
            {theme === 'light' ? (
                <Popper open={laptopOpen} id='simple-popper' anchorEl={anchorEl2} placement="left-start" className={classes.popperList} transition>
                    <span>
                        <Grid container>
                            <Grid item xs={12} style={{padding:20}}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <List className={classes.listWidth2}>  
                                            <ListItem>
                                                <Typography variant="subtitle1"> 
                                                    <b>Laptop računari</b>
                                                </Typography>
                                            </ListItem>
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Sa AMD procesorom"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Sa Intel procesorom"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Gaming laptopovi"/></Typography></Link>
                                            </ListItem>    
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="2 u 1 laptopovi"/></Typography></Link>
                                            </ListItem>  
                                        </List>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <List className={classes.listWidth2}>
                                            <ListItem> 
                                                <Typography variant="subtitle1"> 
                                                    <b>Proizvođači</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Acer"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Apple"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Asus"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Dell"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="HP"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Lenovo"/></Typography></Link>
                                            </ListItem>     
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Huawei"/></Typography></Link>
                                            </ListItem> 
                                        </List>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </span>
                </Popper>
                ) : (
                <Popper open={laptopOpen} id='simple-popper' anchorEl={anchorEl2} placement="left-start" className={classes.popperListSchwarz} transition>
                    <span>
                        <Grid container>
                            <Grid item xs={12} style={{padding:20}}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <List className={classes.listWidth2}>  
                                            <ListItem>
                                                <Typography variant="subtitle1"> 
                                                    <b>Laptop računari</b>
                                                </Typography>
                                            </ListItem>
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Sa AMD procesorom"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Sa Intel procesorom"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Gaming laptopovi"/></Typography></Link>
                                            </ListItem>    
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="2 u 1 laptopovi"/></Typography></Link>
                                            </ListItem>   
                                        </List>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <List className={classes.listWidth2}>
                                            <ListItem> 
                                                <Typography variant="subtitle1"> 
                                                    <b>Proizvođači</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Acer"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Apple"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Asus"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Dell"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="HP"/></Typography></Link>
                                            </ListItem>   
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Lenovo"/></Typography></Link>
                                            </ListItem>     
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Huawei"/></Typography></Link>
                                            </ListItem> 
                                        </List>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </span>
                </Popper>
            )}
            {theme === 'light' ? (
                <Popper open={komponenteOpen} id='simple-popper' anchorEl={anchorEl2} placement="left-start" className={classes.popperList} transition>
                    <span>
                        <Grid container>
                            <Grid item xs={12} style={{padding:20}}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <List className={classes.listWidth2}>
                                            <ListItem>
                                                <Typography variant="subtitle1"> 
                                                    <b>Računari</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem>
                                                <Typography variant="subtitle2"> 
                                                    <b>Cena</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Do 30.000"/></Typography></Link>
                                            </ListItem> 
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Od 30.000 do 50.000"/></Typography></Link>
                                            </ListItem> 
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Preko 50.000"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem>
                                                <Typography variant="subtitle2"> 
                                                    <b>Procesor</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="AMD"/></Typography></Link>
                                            </ListItem> 
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Intel"/></Typography></Link>
                                            </ListItem>  
                                        </List>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <List className={classes.listWidth2}>
                                            <ListItem>
                                                <Typography variant="subtitle1"> 
                                                    <b>Komponente</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/procesori?brojStrane=1&vrstaRobe=Procesori`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Procesori"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/maticnePloce?brojStrane=1&vrstaRobe=Matične ploče`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Matične ploče"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/memorije?brojStrane=1&vrstaRobe=Memorije`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Memorije"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/grafickeKarte?brojStrane=1&vrstaRobe=Grafičke karte`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Grafičke karte"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/hardDiskovi?brojStrane=1&vrstaRobe=Hard diskovi`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Hard diskovi"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/ssd?brojStrane=1&vrstaRobe=SSD`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="SSD"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/napajanja?brojStrane=1&vrstaRobe=Napajanja`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Napajanja"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/kucista?brojStrane=1&vrstaRobe=Kućišta`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Kućišta"/></Typography></Link>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <List className={classes.listWidth2}>
                                            <ListItem>
                                                <Typography variant="subtitle1"> 
                                                    <b>Monitori</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem>
                                                <Typography variant="subtitle2"> 
                                                    <b>Cena</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Do 30.000"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Od 30.000 do 50.000"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Preko 50.000"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem>
                                                <Typography variant="subtitle2"> 
                                                    <b>Dijagonala</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Do 19,5”"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Od 20” do 23,8”"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Preko 24”"/></Typography></Link>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </span>
                </Popper>
                ) : (
                <Popper open={komponenteOpen} id='simple-popper' anchorEl={anchorEl2} placement="left-start" className={classes.popperListSchwarz} transition>
                    <span>
                        <Grid container>
                            <Grid item xs={12} style={{padding:20}}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <List className={classes.listWidth2}>
                                            <ListItem>
                                                <Typography variant="subtitle1"> 
                                                    <b>Računari</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem>
                                                <Typography variant="subtitle2"> 
                                                    <b>Cena</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Do 30.000"/></Typography></Link>
                                            </ListItem> 
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Od 30.000 do 50.000"/></Typography></Link>
                                            </ListItem> 
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Preko 50.000"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem>
                                                <Typography variant="subtitle2"> 
                                                    <b>Procesor</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="AMD"/></Typography></Link>
                                            </ListItem> 
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Intel"/></Typography></Link>
                                            </ListItem>  
                                        </List>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <List className={classes.listWidth2}>
                                            <ListItem>
                                                <Typography variant="subtitle1"> 
                                                    <b>Komponente</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/procesori?brojStrane=1&vrstaRobe=Procesori`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Procesori"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/maticnePloce?brojStrane=1&vrstaRobe=Matične ploče`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Matične ploče"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/memorije?brojStrane=1&vrstaRobe=Memorije`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Memorije"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/grafickeKarte?brojStrane=1&vrstaRobe=Grafičke karte`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Grafičke karte"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/hardDiskovi?brojStrane=1&vrstaRobe=Hard diskovi`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Hard diskovi"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/ssd?brojStrane=1&vrstaRobe=SSD`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="SSD"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/napajanja?brojStrane=1&vrstaRobe=Napajanja`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Napajanja"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/kucista?brojStrane=1&vrstaRobe=Kućišta`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Kućišta"/></Typography></Link>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <List className={classes.listWidth2}>
                                            <ListItem>
                                                <Typography variant="subtitle1"> 
                                                    <b>Monitori</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem>
                                                <Typography variant="subtitle2"> 
                                                    <b>Cena</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Do 30.000"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Od 30.000 do 50.000"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Preko 50.000"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem>
                                                <Typography variant="subtitle2"> 
                                                    <b>Dijagonala</b>
                                                </Typography>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Do 19,5”"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Od 20” do 23,8”"/></Typography></Link>
                                            </ListItem>  
                                            <ListItem button>
                                                <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Preko 24”"/></Typography></Link>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </span>
                </Popper>
            )}
            {theme === 'light' ? (
                <Popper open={opremaOpen} id='simple-popper' anchorEl={anchorEl2} placement="left-start" className={classes.popperList} transition>
                    <span>
                        <Grid container>
                            <Grid item xs={12} style={{padding:20}}>
                                <List className={classes.listWidth2}>  
                                    <ListItem>
                                        <Typography variant="subtitle1"> 
                                            <b>Računarska oprema</b>
                                        </Typography>
                                    </ListItem>
                                    <ListItem button>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Tastature"/></Typography></Link>
                                    </ListItem>  
                                    <ListItem button>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Miševi"/></Typography></Link>
                                    </ListItem>  
                                    <ListItem button>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Zvučnici"/></Typography></Link>
                                    </ListItem>  
                                </List>
                            </Grid>
                        </Grid>
                    </span>
                </Popper>
                ) : (
                <Popper open={opremaOpen} id='simple-popper' anchorEl={anchorEl2} placement="left-start" className={classes.popperListSchwarz} transition>
                    <span>
                        <Grid container>
                            <Grid item xs={12} style={{padding:20}}>
                                <List className={classes.listWidth2}>
                                    <ListItem>
                                        <Typography variant="subtitle1"> 
                                            <b>Računarska oprema</b>
                                        </Typography>
                                    </ListItem>
                                    <ListItem button>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Tastature"/></Typography></Link>
                                    </ListItem>  
                                    <ListItem button>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Miševi"/></Typography></Link>
                                    </ListItem>  
                                    <ListItem button>
                                        <Link to={`/`} style={{ textDecoration: 'none'}}><Typography align="center" color="textPrimary"><ListItemText primary="Zvučnici"/></Typography></Link>
                                    </ListItem>  
                                </List>
                            </Grid>
                        </Grid>
                    </span>
                </Popper>
            )}
        </div>
    )
}

AppNavbar.propTypes = {
    user:PropTypes.object.isRequired,
    korpa:PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    korpa:state.korpa
})

export default withRouter(connect(mapStateToProps,{logout})(AppNavbar))