import React, { useReducer } from 'react';
 import axios from 'axios';
 import setAuthToken from '../../utils/SetAuthToken';
import  AuthContext from './AuthContext';
import  AuthReducer from './AuthReducer';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REMOVE_ALERT,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS
} from '../Types';

 
const AuthState = props => {
    const initailState = {
         token:localStorage.getItem('token'),
         isAuthenticated:null,
         loading:true,
         error:null,
         user:null
    };

    const [state,dispatch]=useReducer(AuthReducer,initailState);


    const loadUser = async () => {
        if(localStorage.token){
        setAuthToken(localStorage.token);
        }
    
        try {
          const res = await axios.get('http://localhost:5000/api/auth');
    
          dispatch({
            type: USER_LOADED,
            payload: res.data
          });
        } catch (err) {
          dispatch({ type: AUTH_ERROR });
        }
      };
     // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      
      }
    };

    try {
      const res = await axios.post('http://localhost:5000/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      
      }
    };

    try {
      const res = await axios.post('http://localhost:5000/api/auth', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const logout=()=>dispatch({type:LOGOUT});

  const clearErrors=()=>dispatch({
      type:CLEAR_ERRORS
  })
//load user

        return(
            <AuthContext.Provider value={{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user:state.user,
                error:state.error,
                logout,
                register,
                clearErrors,loadUser,login
           
            }}>
                {props.children}
            </AuthContext.Provider>
        )
};

export default AuthState;