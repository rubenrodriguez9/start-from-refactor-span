import React from 'react'
import Span from "../shared/span/Span"
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
         onChange={handleEditOnChange}
         name="editTodoValue"
         value={editTodoValue}
         />
         ) :(
             //shows todo if edit toggle is false
            <Span
            value={todo}
            
            />
         )
            }


                         {/* edit and update toggle */}
            {editToggle ? 

               ( <Span
                className={"edit-button todo-button-shared"}
                onClick={handleSubmit}
                value={'Update'}
                id={id}
                
                
                />
            ):(
                <Span
                value={"Edit"}
                className={"edit-button todo-button-shared"}
                onClick={handleEdit}
                disabledClass={'disabled'}
                id={id}
                disableTrigger={disableTrigger}

                />
            )}
            

           
            <Span
                value={"Delete"}
                id={id}
                onClick={deleteTodo}
                disabledClass={"disabled"}
                className={"delete-button todo-button-shared"}
                disableTrigger={disableTrigger}
            />    
            <br/>
            </li>
            )
          })}
        </ul>
        </div>
    )
}


export default TodoView
