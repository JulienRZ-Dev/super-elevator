import React from 'react'
import FloorIndicator from './FloorIndicator';

function FloorPane(props) {

  return (  
    <div id="floor-pane-container">
      
      {/* Let's reverse the array for a nicer display and render all floors */}
      { [...props.floors].reverse().map((floorLabel) => {
        return(
          <FloorIndicator key={floorLabel} active={props.current == floorLabel} floorLabel={floorLabel} />
        )
      })}
    </div>
  );
}

export default FloorPane;