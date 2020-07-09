import React from 'react';
 import {BrowserRouter as Router,Switch,Route} from  'react-router-dom';
import './App.css';
import NavBar from './component/Layout/NavBar';
import Home from './component/Pages/Home'
import About from './component/Pages/About'
import ContactState from './context/contact/contactSate';   
import  AuthState from './context/Auth/AuthState';  
import  AlertState from './context/alert/alertState';  
import Register from './component/auth/Register'
import Login from './component/auth/Login'
import Alerts from './component/Layout/Alert'
import setAuthToken from './utils/SetAuthToken';
import PrivateRoute from './component/routing/privateroute';
 
if(localStorage.token){
  setAuthToken(localStorage.token);
  }

const App=()=> {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
     <>
     <NavBar/>
     <div className="container">
       <Alerts/>
       <Switch>
         <PrivateRoute exact path='/'component={Home}/>
         <Route exact path='/about' component={About}/>
         <Route exact path='/register' component={Register}/>
         <Route exact path='/login' component={Login}/>
       </Switch>
     </div>
     </>
    </Router>
    </AlertState>
    </ContactState>

    </AuthState>
  );
}

export default App;
