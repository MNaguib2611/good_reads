import React, { useState } from "react";
import axios from 'axios';


const handleDeleteAuthor = (props) => {

    console.log(props)

    const delURL = `${process.env.REACT_APP_BACKEND_URL}/authors/${props.history.location.state.record._id}`;

    axios.delete(delURL, {
        withCredentials: true
    })
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    window.location = "/authors";
    // props.history.push("/authors");
}

export default handleDeleteAuthor