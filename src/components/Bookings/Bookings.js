import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Booking.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect( () => {
        fetch('http://localhost:5000/registrations?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    } , [])

    return (
        <div>
            <h3>You Have: {bookings.length} Bookings</h3>
            <Grid container justify="center" xs={12}>
                <Grid item xs={12} md={6} className="styles">
                    {
                        bookings.map(book => <li  key={book._id}>{book.name} Date:{(new Date(book.checkDate).toDateString('dd/MM/yyyy'))}</li>)
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default Bookings;