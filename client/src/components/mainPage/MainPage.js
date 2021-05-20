import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import AppNavbar from '../layout/AppNavbar'
import LogoNavbar from '../layout/LogoNavbar'
import {makeStyles,Hidden,Container,Grid,Paper,List,ListItem,ListItemText,Typography,CardContent,CircularProgress,Card,CardHeader,CardMedia,GridList,GridListTile} from '@material-ui/core'
import PropTypes from 'prop-types'
import {getProizvodi,clearProizvod} from '../../actions/proizvodActions'
import Carousel from 'react-material-ui-carousel'
import placeholder1 from './placeholder1.png'
import placeholder2 from './placeholder2.png'
import placeholder3 from './placeholder3.png'

const MainPage = ({proizvod:{proizvod,proizvodi,proizvodiQuery,isLoading},korpa,getProizvodi,clearErrors},{themeMode}) => {

    useEffect(() =>{
        getProizvodi()
    }, [getProizvodi])

    const useStyles = makeStyles((theme) => ({
        fixedHeight:{
            maxHeight:340,
            width:"100%",
            height:"auto",
        },
        coverRatio:{
            objectFit:"cover",
        },
        cardImage:{
            maxWidth:"100%",
            width:"100%",
            objectFit:"contain",
            height:"100%",
            maxHeight:250,
            transitionProperty:"filter",
            transitionDuration:"0.2s",
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
        inlineTypo:{
            display:"inline"
        },
        marginTop14Procent:{
            marginTop:"34vh"
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
        }
    }))

    const classes = useStyles()

    return proizvodi.data[0].eanKod === "" ? (
        <Container maxWidth="xl">
            <Grid container className={classes.marginTop14Procent} justify="center">
                <CircularProgress size={80}/>
            </Grid>
        </Container>) : (
            <div>
                <AppNavbar/>
                <Paper>
                <Hidden smDown>
                    <Carousel className={classes.coverRatio} autoPlay={false} indicatorIconButtonProps={{style:{display:'none'}}} activeIndicatorIcomButtonProps={{style:{display:'none'}}} animation="fade" timeout={200}>
                        <Link to={`/login`}><img src={placeholder1} className={classes.fixedHeight} key="1"/></Link>
                        <Link to={`/login`}><img src={placeholder2} className={classes.fixedHeight} key="2"/></Link>
                        <Link to={`/login`}><img src={placeholder3} className={classes.fixedHeight} key="3"/></Link>
                    </Carousel>
                </Hidden>
                <Hidden smUp>
                    <Carousel className={classes.coverRatio} autoPlay={false} indicatorIconButtonProps={{style:{display:'none'}}} activeIndicatorIcomButtonProps={{style:{display:'none'}}} animation="fade" timeout={200}>
                        <Link to={`/login`}><img src={placeholder1} className={classes.fixedHeight} key="1"/></Link>
                        <Link to={`/login`}><img src={placeholder2} className={classes.fixedHeight} key="2"/></Link>
                        <Link to={`/login`}><img src={placeholder3} className={classes.fixedHeight} key="3"/></Link>
                    </Carousel>
                </Hidden>
                <Container maxWidth="xl">
                    <Grid container spacing={1} className="mt-1">
                        <Grid container>
                            <Grid item xs={12} className="text-left pt-3 pr-3 pb-3">
                                <Typography variant="h4">
                                    Na popustu
                                </Typography>
                            </Grid>
                            <Grid container>
                                {proizvodi.najnovije.map(({slike,nazivOpis,cena,recenzije,_id})=>(
                                    <Grid item xs={12} sm={6} lg={2}>
                                        <Paper variant="outlined" square style={{height: "100%"}}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Link to={`${_id}`} underline="none" className={classes.cardImageHover}><img src={slike[0]} className={classes.cardImage} alt={_id}/></Link>
                                                </Grid>
                                                <Grid item xs={12} style={{height: 50,padding:10}}>
                                                    <Link style={{ textDecoration: 'none'}} underline="none" to={`${_id}`}>
                                                        <Typography color="textPrimary" variant="body2" component="p">
                                                            {nazivOpis.length > 10 ? (<span>{nazivOpis.toString().substring(0,Math.ceil(nazivOpis.length/1.7))+"..."}</span>) : (<span>{nazivOpis.toString()}</span>)}
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                                <Grid item xs={12} style={{padding:10}}>
                                                    <Typography variant="subtitle2">
                                                        <b>{cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} RSD</b>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item xs={12} className="text-left pt-3 pr-3 pb-3">
                                <Typography variant="h4">
                                    Na popustu
                                </Typography>
                            </Grid>
                            <Grid container>
                                {proizvodi.topOcena.map(({slike,nazivOpis,cena,recenzije,_id})=>(
                                    <Grid item xs={12} sm={6} lg={2}>
                                        <Card variant="outlined">
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Link to={`${_id}`} underline="none" className={classes.cardImageHover}><img src={slike[0]} className={classes.cardImage} alt={_id}/></Link>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Link style={{ textDecoration: 'none'}} underline="none" to={`${_id}`}>
                                                        <Typography color="textPrimary" variant="body2" component="p">
                                                            {nazivOpis.length > 10 ? (<span>{nazivOpis.toString().substring(0,Math.ceil(nazivOpis.length/2))+"..."}</span>) : (<span>{nazivOpis.toString()}</span>)}
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2">
                                                        <b>{cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} RSD</b>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item xs={12} className="text-left pt-3 pr-3 pb-3">
                                <Typography variant="h4">
                                    Na popustu
                                </Typography>
                            </Grid>
                            <Grid container>
                                {proizvodi.popust.map(({slike,nazivOpis,cena,recenzije,_id})=>(
                                    <Grid item xs={12} sm={6} lg={2}>
                                        <Card variant="outlined">
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Link to={`${_id}`} underline="none" className={classes.cardImageHover}><img src={slike[0]} className={classes.cardImage} alt={_id}/></Link>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Link style={{ textDecoration: 'none'}} underline="none" to={`${_id}`}>
                                                        <Typography color="textPrimary" variant="body2" component="p">
                                                            {nazivOpis.length > 10 ? (<span>{nazivOpis.toString().substring(0,Math.ceil(nazivOpis.length/2))+"..."}</span>) : (<span>{nazivOpis.toString()}</span>)}
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle2">
                                                        <b>{cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} RSD</b>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                </Paper>
                <LogoNavbar/>
            </div>
        )
        //return(<div></div>)
}

MainPage.propTypes = {
    getProizvodi:PropTypes.func.isRequired,
    proizvod:PropTypes.object.isRequired,
    korpa:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    proizvod:state.proizvod,
    korpa:state.korpa
})

export default withRouter(connect(mapStateToProps,{getProizvodi})(MainPage))