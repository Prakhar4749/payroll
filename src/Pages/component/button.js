import React from 'react'

function button(props) {
    return (
        <button onClick={props.fu}>
            {props.btTxt}
        </button>
    )
}




export default button;