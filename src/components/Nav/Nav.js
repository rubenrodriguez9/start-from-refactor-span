import React, {Component} from 'react'
import {Link} from "react-router-dom"
import jwtDecode from "jwt-decode"

export default class Nav extends Component {

    state = {
        isAuth: false,
        user: null
    }



    componentDidMount() {
        let token = localStorage.getItem("jwtToken")

      if(token !== null){
        let decoded = jwtDecode(token);

        let currentTime = Date.now() / 1000

        if(decoded.exp < currentTime){
            localStorage.removeItem('jwtToken')

            this.props.history.push('/sign-in')
        }else

        this.setState({
            isAuth: true,
            user :{
          email: decoded.email,
          _id: decoded._id
        }
        })
      }
               
    }

   

    logout = () =>{
        localStorage.removeItem('jwtToken')

        this.setState({
            isAuth: false,
            user: null
        })
    } 
    
    

    render() {

        let nav;

        if(this.state.isAuth && this.state.user !== null){
            nav = (
                <div style={{listStyle: "none", textAlign: "left"}} >
            <ul>
                <li style={{ display: "inline"}} > 
                <Link to="/profile" >{this.state.user.email}</Link>
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



            