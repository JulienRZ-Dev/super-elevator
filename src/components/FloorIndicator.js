import React from 'react'

function FloorIndicator(props) {
    return(
        <div className={props.active ? "floor-indicator-container active" : "floor-indicator-container"}>
            <h3 className="floor-indicator-number">{props.floorLabel}</h3>
        </div>
    );
}

export default FloorIndicator;