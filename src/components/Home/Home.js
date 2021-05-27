import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import fakeData from '../../fakeData/data.js';
import Volunteer from './../Volunteer/Volunteer';

const Home = () => {
  const [networks, setNetworks] = useState([]);
  console.log()
  useEffect(()=>{
    fetch('http://localhost:5000/networks')
    .then( res => res.json())
    .then(data => setNetworks(data))
  }, [])
    return (
        <Grid>
        
        <Grid
          container
          item
          xs={12}
          justify="center"
          style={{ marginTop:'50px',  cursor: "pointer" }}
        >
            {
                networks.map(data => <Volunteer key={data.id} data={data}></Volunteer>)
            }
        </Grid>
        
      </Grid>
    );
};

export default Home;