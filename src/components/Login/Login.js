import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css';
import googleLogo from '../../images/logos/google.png'
import { Button } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor:"white",
      border: "1px solid #bfbfbf",
      boxShadow: "0 2px 4px 0px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.19)",
      padding:"20px",
    }
  }));


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const { from } = location.state || { from: { pathname: "/" } };
    const classes = useStyles();

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleGoogleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setLoggedInUser(signedInUser);
            storeAuthToken();
            history.replace(from);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }


    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
           sessionStorage.setItem('token', idToken);
          }).catch(function(error) {
            // Handle error
          });
    }
    

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h1>Login With</h1>
                    <div className="googleButton" style={{ width: "300px", margin: "auto" }}>
                        <img
                            src={googleLogo}
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                            ></img>
                        <Button onClick={handleGoogleSignIn}>Continue with Google</Button>
                    </div><br/>
                    <p>Don't have an account? Create an account With Google</p>
                </div>
            </Container>

    );
};

export default Login;