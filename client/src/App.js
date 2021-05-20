import './App.css';
import React, {useEffect,useState,Fragment} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import {ThemeContext} from './util/ThemeContext'
import MainPage from './components/mainPage/MainPage'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProizvodPage from './components/proizvodPage/ProizvodPage'
import CpuSearchPage from './components/searchPage/CpuSearchPage'
import GpuSearchPage from './components/searchPage/GpuSearchPage'
import MaticnaPlocaSearchPage from './components/searchPage/MaticnaPlocaSearchPage'
import HddSearchPage from './components/searchPage/HddSearchPage'
import UserSettingsPage from './components/user/UserSettingsPage'
import Korpa from './components/kupovina/Korpa'
import Kasa from './components/kupovina/Kasa'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import {PersistGate} from 'redux-persist/integration/react'
import { createMuiTheme, ThemeProvider,CssBaseline } from '@material-ui/core'
import {persistStore} from 'redux-persist'

function App() {

  const persistor = persistStore(store)

  const [themeMode,setThemeMode] = useState('light')

  const theme = createMuiTheme({
    palette:{
      type:themeMode,
      primary:{
        main: themeMode === "light" ? '#E43C40' : '#444444',
        contrastText: "#fff"
      },
      secondary:{
        main: themeMode === "light" ? '#00B2A9' : '#333333',
        contrastText: "#fff"
      },
      warning:{
        main: '#fff'
      },
      text: {
        primary: themeMode === "light" ? '#000' : '#fff',
        secondary: themeMode === "light" ? '#000' : '#fff'
      },
      action:{
        hover: themeMode === "light" ? '#eeeeee' : '#333333'
      }
    }
  })

  const handleLightMode = () => {
    setThemeMode('light')
  }

  const handleDarkMode = () => {
    setThemeMode('dark')
  }

  return (
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <QueryParamProvider ReactRouterRoute={Route}>
            <ThemeProvider theme={theme}>
              <ThemeContext.Provider value={[themeMode,setThemeMode]}>
              <CssBaseline>
                <div className="App">  
                  <Switch>
                    <Route themeMode={themeMode} path="/" exact component={MainPage}/>
                    <Route themeMode={themeMode} path="/login" exact component={Login}/>
                    <Route themeMode={themeMode} path="/register" exact component={Register}/>
                    <Route themeMode={themeMode} path="/korpa" exact component={Korpa}/>
                    <Route themeMode={themeMode} path="/kasa" exact component={Kasa}/>
                    <Route themeMode={themeMode} path="/procesori" exact component={CpuSearchPage}/>
                    <Route themeMode={themeMode} path="/grafickeKarte" exact component={GpuSearchPage}/>
                    <Route themeMode={themeMode} path="/maticnePloce" exact component={MaticnaPlocaSearchPage}/>
                    <Route themeMode={themeMode} path="/hardDiskovi" exact component={HddSearchPage}/>
                    <Route themeMode={themeMode} path="/nalog" exact component={UserSettingsPage}/>
                    <Route themeMode={themeMode} path="/:id" exact component={ProizvodPage}/>
                  </Switch>
                </div>
              </CssBaseline>
              </ThemeContext.Provider>
            </ThemeProvider>
          </QueryParamProvider>
        </Router>
      </PersistGate>   
  );
}

export default App;
