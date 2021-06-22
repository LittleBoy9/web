import React,{ createContext, useReducer } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './Components/NavBar';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Logout from './pages/Logout';
import UpdatePass from './pages/UpdatePass';
import P404 from './pages/P404';

import { useAlert } from 'react-alert'

import { initialState, reducer } from '../src/reducer/UseReducer';

export const userContext = createContext();

const Routing = () => {
  
  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/registration">
        <Registration />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/updatepass">
        <UpdatePass />
      </Route>
      <Route>
        <P404 />
      </Route>
    </Switch>
  )
}

function App() {
  const alert = useAlert();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <BrowserRouter>
        <userContext.Provider value={{state, dispatch}}>
          <NavBar />
          <Routing />
        </userContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
