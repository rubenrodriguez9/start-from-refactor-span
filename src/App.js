import React, { Component } from 'react'
import Signup from "./components/signup/Signup"
import  { BrowserRouter as Router, Route, Switch,  } from "react-router-dom"
import Home from "./components/home/Home"
import Signin from "./components/signin/Signin"
import Nav from "./components/Nav/Nav"
import Todo from "./components/Todo/Todo"
import jwtDecode from "jwt-decode"
export class App extends Component {

  
  
    state = {
      isAuth: true,
      user: null
    }
  
    auth = (jwtToken) => {

      let decoded = jwtDecode(jwtToken)
      console.log(decoded);

      this.setState({
        isAuth: true,
        user: {
          email: decoded.email,
          _id: decoded._id
        }
      })
    }


  render() {
   
    return(

    
      <Router>
        <Nav isAuth={this.state.isAuth} user={this.state.user} />
        <Switch>
          <Route  exact path="/"   component={Home} />
          <Route  exact path="/sign-up" component={Signup} />  
          {/* <Route  exact path="/sign-in"   component={Signin} auth={this.auth}/> */}
          <Route  exact path="/sign-in"   component={(props) => <Signin {...props} auth={this.auth}/>} />
          <Route  exact path="/todo"   component={Todo} />
          
        </Switch>
          
      </Router>
      
    )
  }
}

export default App
