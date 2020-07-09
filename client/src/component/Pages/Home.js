import React,{useEffect,useContext} from 'react'
import Contact from '../contact/Contact';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ConatctFilter'
import AuthContext from '../../context/Auth/AuthContext';
const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
         authContext.loadUser();

    }, [])

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contact />
            </div>
        </div>
    )
}

export default Home
