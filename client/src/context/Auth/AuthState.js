import React, { useReducer } from 'react';
 

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


     

        return(
            <AuthContext.Provider value={{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user:state.user,
                error:state.error
           
            }}>
                {props.children}
            </AuthContext.Provider>
        )
};

export default AuthState;