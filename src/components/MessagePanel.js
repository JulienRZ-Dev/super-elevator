import React from 'react'

function MessagePanel(props) {
    return(
        <div id="message-panel-container">
            <p className={"message " +  props.messageType}>{props.messageContent}</p>
        </div>
    );
}

export default MessagePanel;