import React, {useEffect,useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {makeStyles,AppBar,Toolbar,Typography} from '@material-ui/core'
import PropTypes from 'prop-types'

const LogoNavbar = ({}) => {

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
        }
    }))

    const classes = useStyles()

    return (
        <div>
            <AppBar position="relative" color="secondary">
                <Toolbar className="ml-auto mr-auto">
                    <Typography variant="h6"><Link to={`/`} className={classes.title}>Store</Link></Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

LogoNavbar.propTypes = {

}

const mapStateToProps = (state) => ({

})

export default withRouter(connect(mapStateToProps)(LogoNavbar))