import React, {Component} from 'react'
import {Link} from "react-router-dom"


 const Home = () => {
    return (
        <div>
            The greatest todo app. Sign up <Link to="/home" >Here</Link>
        </div>
    )
}

export default Home