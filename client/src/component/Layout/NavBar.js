import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth/AuthContext';
import ContactContext from '../../context/contact/contactContext';
const NavBar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;
    const contactContext = useContext(ContactContext);

    const {clearContacts}=contactContext;
    const onLogout = () => {
        logout();
        clearContacts();
    }
    const authLinks = (
        <>
            <li>Hello {user && user.name}</li>
            <li><a onClick={onLogout} href="#!"><i className="fa fa-sign-out-alt"></i><span className="hide-sm">Logout</span></a></li>
        </>
    )

    const guestLinks = (
        <>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>


        </>
    )
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className="fas fa-id-card-alt">Contact keeper</i>
            </h1>
            <ul>

                {isAuthenticated ? authLinks : guestLinks}

            </ul>

        </div>
    )
}



export default NavBar
