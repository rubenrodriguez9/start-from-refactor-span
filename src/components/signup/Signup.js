import React, { Component } from 'react'
import Todo from "../Todo/Todo"
import validator from 'validator'
import axios from "axios"
import Message from "../shared/message/Message"

export class Signup extends Component {

  state = {
    isAuth: false,
    email:"",
    password:"",
    errorMessage: false,
    passwordError: false,
    passwordErrorMessage: "Password must contain numbers, characters, capital and all that jazz",
    submitErrorMessage: '',
    submitError: false,
    emailError: false,
    emailErrorMessage: ''
  }

  handleOnChangeEmail = (event) => {
   
   let emailCheck =  validator.isEmail(this.state.email)
    console.log(emailCheck);
   if(!emailCheck){
     this.setState({
       emailError: true,
       emailErrorMessage: 'Please use a valid email',
       submitErrorMessage:'',
       submitError:false
     })
   }else this.setState({
    emailError: false,
    emailErrorMessage: 'Please use a valid email'
  })

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


  appHandleOnClickSub =  async (event) => {
    event.preventDefault()
    
    console.log(this.state.email, this.state.password);

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
    
    try{

       let success = await axios.post('http://localhost:3001/api/users/create-User',{
      
        email:this.state.email,
        password: this.state.password
      })
      this.setState({
        isAuth: true
      })


      

    }
    catch (e) {
      if(e.response.status === 409){
        this.setState({
          submitError: true,
          submitErrorMessage: 'Email has already been taken'

        })
      }else console.log(e);
      

    }
  }



    
  


  render() {
   
    const {isAuth, emailError, emailErrorMessage, passwordError, passwordErrorMessage, submitError,  submitErrorMessage} = this.state


    let showTodoComponent = isAuth ? ( <Todo/> 
    )  : ( 

      

    <form onSubmit={this.appHandleOnClickSub} >
      {emailError ? <Message message={emailErrorMessage}/>: null}
      {passwordError ? <Message message={passwordErrorMessage}/>: null}
      {submitError ? <Message message={submitErrorMessage}/>: null}
      
      
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

export default Signup
