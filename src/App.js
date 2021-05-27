import Header from './components/Header/Header';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from './components/Home/Home';
import RegisterVolunteer from './components/RegisterVolunteer/RegisterVolunteer';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Bookings from './components/Bookings/Bookings';
import AddData from './components/AddData/AddData';

export const UserContext = createContext()


function App() {
  const [loggedInUser, setLoggedInUser] =  useState({});

  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>  
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <PrivateRoute path="/register/:id">
          <RegisterVolunteer></RegisterVolunteer>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/bookingDetails">
          <Bookings></Bookings>
        </Route>
        <Route path="/addInfo">
            <AddData></AddData>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
