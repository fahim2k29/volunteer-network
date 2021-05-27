import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logos/logo.png';
import "./Header.css";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useState(UserContext);
    console.log(loggedInUser.email);
    return (
        <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent: "space-between",
            height: "50px",
            padding: "5px 20px",
        }}>

           <div>
               <Link to="/">
                <img style={{width:'150px'}} src={logo} alt=""/>
               </Link>
           </div>
           <div className="header-right" style={{
            display:"flex",
            alignItems:"center"
            }}>
                <Link style={{textDecoration: "none"}} to="/">
                    <p>Home</p>
                </Link>
                <Link style={{textDecoration: "none"}} to="/donation">
                    <p>Donation</p>
                </Link>
                {/* <Link style={{textDecoration: "none"}} to="/login">
                    <p>Login</p>
                </Link> */}

                {loggedInUser.email ? 
                
                <button onClick={()=> setLoggedInUser({})}>Sign out</button>
                :
                <Link style={{textDecoration: "none"}} to="/login">
                    <p>Login</p>
                </Link>
                }
           </div>
        </div>
    );
};

export default Header;