import React, {Component} from 'react'
import {Link} from "react-router-dom"
import jwtDecode from "jwt-decode"

export default class Nav extends Component {

    
   

   

    logout = () =>{
        this.props.logout()
    } 
    
    

    render() {

        let nav;

        if(this.props.isAuth && this.props.user !== null){
            nav = (
                <div style={{listStyle: "none", textAlign: "left"}} >
            <ul>
                <li style={{ display: "inline"}} > 
                <Link to="/profile" >{this.props.user.email}</Link>
                </li>
                <li style={{ display: "inline",  marginLeft: '10px'}} >
                <Link onClick={this.logout} to="/logout" >Logout</Link>
                </li>
            </ul>
            
        </div> 
            ) 
        } else {

          nav =  ( <div style={{listStyle: "none", textAlign: "left"}} >
            <ul>
                <li style={{ display: "inline"}} > 
                <Link to="/sign-in" >Sign in</Link>
                </li>
                <li style={{ display: "inline",  marginLeft: '10px'}} >
                <Link to="/sign-up" >Register</Link>
                </li>
            </ul>
            
        </div>
        )
        }


        return (
            <>
                {nav}
            </>
        )
    }
}



            