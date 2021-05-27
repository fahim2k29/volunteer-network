import React from 'react';
import {Grid} from '@material-ui/core';
import './Volunteer.css'
import { Link } from 'react-router-dom';
const Volunteer = (props) => {
    const {id, name, img, des} = props.data;

    const backgroundImageStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        width: "96%",
        borderRadius: "10px",
        margin: "2px",
      };

    return (
        <Grid item xs={12} md={3}>
          <Link
            to={`/register/${id}`}
            style={{ textDecoration: "none" }}
          >
        <div
            className="volunteer-area" 
            style={backgroundImageStyle}
        >
          <h2 style={{ marginTop: "160px", fontFamily:"TimesNewRoman", color: "white", textAlign:"center" }}>
            {name}
          </h2>
          <p style={{fontFamily:"TimesNewRoman", color: "white", textAlign:"center" }}>{des}</p>
        </div>
        </Link>
      </Grid>
    );
};

export default Volunteer;