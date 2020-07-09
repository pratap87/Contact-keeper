import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';
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
    CONTACT_ERROR,
    UPDATE_CONTACT,
    GET_CONTACTS,

} from '../Types';

const ContactState = props => {
    const initailState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initailState);

    //Get Contacts
    const getContacts = async () => {


        try {
            const res = await axios.get('http://localhost:5000/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data })

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }

    }


    const addContact = async contact => {

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('http://localhost:5000/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data })

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }

    }

    const deleteContact = async id => {
        try {
            await axios.delete(`http://localhost:5000/api/contacts/${id}`);

            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }


    }

      // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };


    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }
    const setCurrent = contact => {

        dispatch({ type: SET_CURRENT, payload: contact })
    }
    const clearCurrent = () => {

        dispatch({ type: CLEAR_CURRENT })
    }

   


    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    const clearFilter = () => {

        dispatch({ type: CLEAR_FILTER })
    }




    //Add Contact
    //set current contact
    //clear current contact
    //update
    //filter
    //clear filter
    //delete

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            error: state.error,
            setCurrent,
            clearCurrent,
            addContact,
            updateContact,
            deleteContact,
            filtered: state.filtered,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts

        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;