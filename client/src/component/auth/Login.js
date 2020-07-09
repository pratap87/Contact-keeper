import React, { useState,useContext,useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/Auth/AuthContext';
const Login = (props) => {

    const alertContext  =useContext(AlertContext); 

    const authContext =useContext(AuthContext);

    const {login,error,clearErrors,isAuthenticated}=authContext;
    const {setAlert}=alertContext;

    
    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error==='Invalid Credentials'){
            setAlert(error,'danger')
            clearErrors();
        }
    },[error,isAuthenticated,props.history])

    const [user, setuser] = useState({

         
        email: '',
        password: '',
        
    })

    const {  email, password  } = user;

    const onChange = e => setuser({ ...user, [e.target.name]: e.target.value });

    const onSubmit=e=>{
        e.preventDefault();
        if(email===''||password===''){
             setAlert('fill all the fields','danger');
        }
        else{
            login({
                email,
                password
            });
        }
    }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>
                
                <div className="form-group">
                    <lable htmlFor="email">Email</lable>
                    <input type="email" name="email" value={email} onChange={onChange}
                    required />
                </div>
                <div className="form-group">
                    <lable htmlFor="password">Password</lable>
                    <input type="password" name="password" value={password} onChange={onChange}
                    required />
                </div>
               
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
};

export default Login;