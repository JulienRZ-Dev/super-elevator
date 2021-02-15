import React from 'react'

function Button(props) {
    return(
        <button className="action-btn" onClick={props.onClick}>
            {props.label}
        </button>
    );
}

export default Button;