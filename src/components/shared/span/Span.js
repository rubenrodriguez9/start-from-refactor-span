import React from 'react'

 const Span = ({ onClick, value, id,  disableTrigger, className, disabledClass}) => {

    let spanDisableDeleteButton = disableTrigger ? disabledClass : className
    let spanOnClick = !onClick ? () => {} : onClick

    return (
        <span
        onClick={() => spanOnClick(id)}
        id={id}
        className={`${spanDisableDeleteButton}`}
        >
            {value}
        </span>
    )
}

export default Span