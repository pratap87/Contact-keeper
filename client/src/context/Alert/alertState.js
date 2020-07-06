import React, { useReducer } from 'react';
 import {v4} from 'uuid';

import  alertContext from './alertContext ';
import  AlertReducer from './alertReducer';
import {SET_ALERT,REMOVE_ALERT} from '../Types'

const AlerState = props => {
    const initailState = [];

    const [state,dispatch]=useReducer(AlertReducer,initailState);


    const setAlert=(msg,type,timeout=5000)=>{
        const id=v4();
        dispatch({
            type:SET_ALERT,
            payload:{msg,type,id}
        });

        setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),timeout)
    }  

        return(
            <alertContext.Provider value={{
                alerts:state,
                setAlert
           
            }}>
                {props.children}
            </alertContext.Provider>
        )
};

export default AlerState;