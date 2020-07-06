import React, { useReducer } from 'react';
import {v4}from 'uuid';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    CLEAR_CONTACTS,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    
    UPDATE_CONTACT
} from '../Types';

const ContactState = props => {
    const initailState = {
        contacts: [
            {
                id: 1,
                name: 'jill johnson',
                email: 'jill@gmail.com',
                phone: '111-22-333',
                type: 'personal'
            },
            {
                id: 2,
                name: 'phil johnson',
                email: 'phll@gmail.com',
                phone: '111-22-333',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Noah',
                email: 'abc@gmail.com',
                phone: '111-22-333',
                type: 'professional'
            },
        ],
        current:null,
        filtered:null
    };

    const [state,dispatch]=useReducer(contactReducer,initailState);


    const addContact=contact=>{
        contact.id= v4()
        dispatch({type:ADD_CONTACT,payload:contact})
    }
    
    const deleteContact=id=>{
       
        dispatch({type:DELETE_CONTACT,payload:id})
    }

    const setCurrent=contact=>{
       
        dispatch({type:SET_CURRENT,payload:contact})
    }
    const clearCurrent=( )=>{
       
        dispatch({type:CLEAR_CURRENT})
    }

    const updateContact=contact=>{
 
        dispatch({type:UPDATE_CONTACT,payload:contact})
    }


    const filterContacts=text=>{
        dispatch({type:FILTER_CONTACTS,payload:text})
    }

    const clearFilter=( )=>{
       
        dispatch({type:CLEAR_FILTER})
    }
        //Add Contact
        //set current contact
        //clear current contact
        //update
        //filter
        //clear filter
        //delete

        return(
            <ContactContext.Provider value={{
                contacts:state.contacts,
                current:state.current,
                setCurrent,
                clearCurrent,
                addContact,
                updateContact,
                deleteContact,
                    filtered:state.filtered,
                    filterContacts,
                    clearFilter
            }}>
                {props.children}
            </ContactContext.Provider>
        )
};

export default ContactState;