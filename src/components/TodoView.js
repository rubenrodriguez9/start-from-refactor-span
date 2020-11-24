import React from 'react'

import "./TodoView.css"

const TodoView = ({todoList, handleDeleteOnClick, appHandleEditTodo, appHandleEditOnChange, editTodoValue, appHandleEditSubmit, disableTrigger}) => {

    const  deleteTodo = (id) => {
    handleDeleteOnClick(id) 
    }

    const handleEdit = (id) => {
        appHandleEditTodo(id)
        
    }

    const handleEditOnChange = (event) => {
        appHandleEditOnChange(event)
    }

    const handleSubmit =(id) => {
        appHandleEditSubmit(id)
    }

    return (
        <div>
         <ul>
          {todoList.map(({id, todo, editToggle}) => {
            return (<li  style={{marginTop: 10+"px"}} key={id}> 
            
                        {/* input and todo display */}
            
         {editToggle ?  (
             //shows input if edit toggle is tru
         <input
         type="text"
         onChange={(event) => handleEditOnChange(event)}
         name="editTodoValue"
         value={editTodoValue}
         />
         ) :(
             //shows todo if edit toggle is false
            <span>{todo}</span>
         )
            }


                         {/* edit and update toggle */}
            {editToggle ? 
            (<span
                className="edit-button todo-button-shared" 
                onClick={() => handleSubmit(id)}
              
            >Update</span>
            ):(
              <span
              onClick={() => handleEdit(id)}
                className={disableTrigger ? 'disabled' :"edit-button todo-button-shared"}
              
              >Edit</span>  
            )}
            

           

            
            <span 
            onClick={ () => deleteTodo(id)}
            className={disableTrigger ? "disabled" : "delete-button todo-button-shared"}

            >Delete</span>
            <br/>
            </li>
            )
          })}
        </ul>
        </div>
    )
}


export default TodoView
