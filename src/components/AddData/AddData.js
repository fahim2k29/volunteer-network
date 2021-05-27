import React from 'react';
import fakeData from '../../fakeData/data.js';

const AddData = () => {
    const handleAddProduct = () => {
        fetch('http://localhost:5000/addNetwork',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(fakeData)
        })
    }
    return (
        <div>
            <button onClick={handleAddProduct}>Add New Info</button>
        </div>
    );
};

export default AddData;