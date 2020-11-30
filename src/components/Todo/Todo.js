import {v4 as uuidv4} from "uuid"

import React, { Component } from 'react'
import TodoView from './TodoView';


export default class Todo extends Component {

  state={
    todoList: [
      {
       id: uuidv4(),
       todo: "Wash clothes",
       editToggle: false
      },
      {
        id: uuidv4(),
        todo: "Go food shopping",
        editToggle: false
       },
       {
        id: uuidv4(),
        todo: "Study Javascript",
        editToggle: false
       }
    ],
    todoValue: "",
    showNoTodoMessage: false,
    disableTrigger: false,
    editTodoValue: ''
  }

  handleSubmitOnClick = () =>{

  
    let arr = [...this.state.todoList, {id:uuidv4(), todo: this.state.todoValue}]

    this.setState({
      todoList: arr,
      todoValue: "",
      showNoTodoMessage: false
    })
  }

  handleInputOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  handleDeleteOnClick =  async (targetID) => {
    

    let arr = [...this.state.todoList].filter((item) => {
            return item.id !== targetID
    })

   await this.setState({
      todoList: arr
    })

    
   if(this.state.todoList.length === 0) {
      this.setState({
        showNoTodoMessage: true
      })
      
    }
   
  }

  appHandleEditTodo =  async (targetID) => {
    let value ;
    let arr = [...this.state.todoList].map((item) => {
    
      if(targetID === item.id){
        item.editToggle = true
        value = item.todo
      }
      return item

    })

    

    console.log(arr)

  


    
    this.setState({
      todoList: arr,
      disableTrigger: true,
      editTodoValue: value
      
    
    })
    
  }

  appHandleEditOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

    
  }

  appHandleEditSubmit = (targetID) => {

    let arr = [...this.state.todoList].map((item) => {
      if(targetID === item.id){
        item.todo = this.state.editTodoValue
        item.editToggle= false
      }
      return item
    }) 

   
    this.setState({
      todoList: arr,
      editTodoValue: "",
      disableTrigger: false
      
    })



  }

  render() {

    const {todoList, showNoTodoMessage, disableTrigger, editTodoValue} = this.state

    return (

      
      <div style={{textAlign: "center"}} >

        {showNoTodoMessage? <div>No todos left</div> : null}
        <input 
          onChange={this.handleInputOnChange}
          name="todoValue"
          type="text" 
          value={this.state.todoValue} />

        <button onClick={this.handleSubmitOnClick}  >Submit</button>

        <TodoView
          todoList={todoList}
          handleDeleteOnClick={this.handleDeleteOnClick}
          appHandleEditTodo={this.appHandleEditTodo}
          disableTrigger={disableTrigger}
          appHandleEditOnChange={this.appHandleEditOnChange}
          editTodoValue={editTodoValue}
          appHandleEditSubmit={this.appHandleEditSubmit}

        
        />
        
        
      </div>
    )
  }
}
