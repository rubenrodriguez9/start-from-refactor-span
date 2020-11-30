import React, { Component } from 'react'
import Todo from "../Todo/Todo"
import validator from 'validator'
import axios from "axios"
import Message from "../shared/message/Message"
import jwtdecode from "jwt-decode";


export class Signin extends Component {

  state = {
    user: null,
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

  componentDidMount () {


      let token = localStorage.getItem("jwtToken")


      if(token !== null){
        let decoded = jwtdecode(token);

        let currentTime = Date.now() / 1000
        console.log(currentTime, decoded.exp)

        
        if(decoded.exp < currentTime){
          localStorage.removeItem('jwtToken')
          this.props.history.push('/sign-in')
        }else this.props.history.push('/todo')

        
      } 


      

  } 

  handleOnChangeEmail = (event) => {
   
   let emailCheck =  validator.isEmail(this.state.email)
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

  }


  appHandleOnClickSub =  async (event) => {
    event.preventDefault()
    


    let usernameCheck = validator.isEmpty(this.state.email)

    if(usernameCheck  === true){
      this.setState({
        submitError: true,
        submitErrorMessage: "Username  empty"
      })
      return
    
    }else this.setState({
        submitError: false,
        submitErrorMessage: ""
    })
    
    try{

       let success = await axios.post('http://localhost:3001/api/users/sign-in',{
      
        email:this.state.email,
        password: this.state.password
      })
      
      localStorage.setItem("jwtToken", success.data.jwtToken)
      
      
      
      this.setState({
        submitError: false,
        submitErrorMessage: ''

      }, () => {
        this.props.auth(success.data.jwtToken)
        this.props.history.push("/Todo")
    })
      

    }
    catch (e) {
        
      if(e.response.status === 404){
        
        this.setState({
          submitError: true,
          submitErrorMessage: 'Incorrect username'

        })
      }else if(e.response.status === 401){
        this.setState({
            submitError: true,
            submitErrorMessage: 'Incorrect Password '
  
          })
      }else console.log(e)
      

    }
  }



    
  


  render() {
   
    const {isAuth, emailError, emailErrorMessage, submitError,  submitErrorMessage} = this.state


    let showTodoComponent = isAuth ? ( <Todo/> 
    )  : ( 

      

    <form onSubmit={this.appHandleOnClickSub} >
      {emailError ? <Message message={emailErrorMessage}/>: null}
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

export default Signin
