import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useParams, useHistory } from 'react-router';
import fakeData from '../../fakeData/data';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 200,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterVolunteer = () => {
    // const [network, setNetwork] = useState({});
    const {id} = useParams();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const volunteer = fakeData.find(data => data.id === parseInt(id));
    const {name, img, des} = volunteer;
    
    const [selectedDate, setSelectedDate] = useState({checkDate: new Date()})
    const history = useHistory();
    const classes = useStyles();

  // useEffect(()=> {
  //   fetch('http://localhost:5000/network/'+id)
  //   .then(res => res.json())
  //   .then(data => setNetwork(data))
  // },[id])


  const handleCheckDate = (date) => {
    const newDates = {...selectedDate};
    newDates.checkDate = date;
    setSelectedDate(newDates);
  }

   const handleRegisterVolunteer = (e) =>{
      const newRegister = {...loggedInUser, ...selectedDate,name,img, des};
      fetch('http://localhost:5000/addRegister', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(newRegister)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      history.push('/bookingDetails')
      e.preventDefault();
   }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Register as a Volunteer
          </Typography>
          <form className={classes.form} onSubmit={handleRegisterVolunteer}>
            <TextField
              required
              fullWidth
              id="fullName"
              label="Full Name"
              defaultValue={loggedInUser.name}
              name="fullName"
              autoComplete="name"
              autoFocus
            />
            <TextField
              required
              fullWidth
              name="email"
              label="email"
              type="email"
              defaultValue={loggedInUser.email}
              id="email"
              autoComplete="email"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                required
                fullWidth
                margin="normal"
                id="date"
                label="Date"
                format="MM/dd/yyyy"
                value={selectedDate.checkDate}
                onChange={handleCheckDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            
            </Grid>
          </MuiPickersUtilsProvider>
            {/* <TextField
             required
             fullWidth
              id="date"
              label="Date"
              type="date"
              value={selectedDate.checkDate}
              onChange={handleCheckDate}
              defaultValue="2021-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
            <TextField
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              defaultValue={des}
              id="description"
              autoComplete="description"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registration
            </Button>
           
          </form>
        </div>
      </Container>
    );
};

export default RegisterVolunteer;