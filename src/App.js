import React, { Component } from 'react'
import Todo from "./components/Todo/Todo"
import {v4 as uuidv4} from "uuid"
import validator from 'validator'

export class App extends Component {

  state = {
    isAuth: false,
    email:"",
    password:"",
    errorMessage: false,
    passwordError: false,
    passwordErrorMessage: "Password must contain numbers, characters, capital and all that jazz",
    submitErrorMessage: '',
    submitError: false
  }

  handleOnChangeEmail = (event) => {
    
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleOnChangePassword = async (event) => {

    
     await this.setState({
      [event.target.name]: event.target.value
    })

      let isPassword = validator.matches(this.state.password,  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

    if(isPassword){
      this.setState({
        passwordError: false,
        passwordErrorMessage: ''
      })

    } else {
      this.setState({
        passwordError: true,
        passwordErrorMessage: "Password must contain numbers, characters, capital and all that jazz"
      })
    }
  }


  appHandleOnClickSub = (event) => {
    event.preventDefault()
    

    let usernameCheck = validator.isEmpty(this.state.email)
    let passwordCheck = validator.isEmpty(this.state.password)

    if(usernameCheck && passwordCheck === true){
      this.setState({
        submitError: true,
        submitErrorMessage: "Username and password empty"
      })
      return
    }else if(usernameCheck  === true){
      this.setState({
        submitError: true,
        submitErrorMessage: "Username  empty"
      })
      return
    }else if(passwordCheck === true){
      this.setState({
        submitError: true,
        submitErrorMessage: "Password empty"
      }) 
      
      return 
    }else this.setState({
        submitError: false,
        submitErrorMessage: ""
    })
  }
    
  


  render() {
   
    const {isAuth, errorMessage, passwordError, passwordErrorMessage, submitError,  submitErrorMessage} = this.state


    let showTodoComponent = isAuth ? ( <Todo/> 
    )  : ( 

      

    <form onSubmit={this.appHandleOnClickSub} >
      {errorMessage ? <div>That is not an email</div>: null}
      {passwordError ? <div>{passwordErrorMessage}</div>: null}
      {submitError ? <div>{submitErrorMessage}</div>: null}

      <input 
        type="text" 
        placeholder="Email" 
        onChange={this.handleOnChangeEmail} 
        value={this.state.email}
        name='email'
        /> <br/>
      <input 
      type="text" 
      placeholder="Password" 
      onChange={this.handleOnChangePassword} 
      value={this.state.password}
      name='password' 
      /> <br/>
      <button>Sign in</button>
    </form> )

    return (
      <div style={{textAlign: "center", marginTop: "15%"}} > {showTodoComponent} </div>
    )
      
   
  }
}

export default App
