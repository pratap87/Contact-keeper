import React,{useContext } from 'react'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem'
const ContactList = () => {

    const contactContext=useContext(ContactContext);

    const {contacts,filtered}=contactContext;
    if(contacts.length===0)
    {
        return <h4>Please  Add a contact</h4>
    }
    console.log(contacts)

    return (
        < >
        <TransitionGroup>
        {filtered!==null?filtered.map(contact=> (
            <CSSTransition key={contact.id}  timeout={500} classNames="item ">
        <ContactItem contact={contact}/>
        </CSSTransition>
        )
        ):contacts.map((contact)=>(
            <CSSTransition key={contact.id}  timeout={500} classNames="item ">
            <ContactItem   contact={contact}/>
            </CSSTransition>
       ))}:
          </TransitionGroup>
        </>
    )
}

export default ContactList
