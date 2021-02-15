import './App.css'

import { useEffect, useState } from 'react'
import { init, control, notifySensorReached, reset, handleBreakdown } from './backend/elevatorControl';

import Button from './components/Button'
import FloorPane from './components/FloorPane'
import MessagePanel from './components/MessagePanel'


// YOU CAN CHANGE THE FOLLOWING CONSTS

// implemented this way, floors can be also strings, fell free to change floor names 
// You must click Reset if you want to change the building structure before using goUp and goDown
// Long floor names will be poorly displayed
// const floors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const floors = ["P", "RDC", "1", "2", "3", "4"];

// delay between two floors (ms)
const floorDelay = 2000; 



function App() {

  /* store and update the message to display */
  const [message, setMessage] = useState({
    type: init,
    content: 'initilization'
  });

  /* store and update the current floor index */
  const [currentFloorIndex, setCurrentFloorIndex] = useState(null);



  /* this function triggers when App is mounted in the browser. 
  We must check the elevator status in the database */
  useEffect(() => {
    init(floors, handleInitSuccess);
  }, [])

  /* handle succedfull init */
  function handleInitSuccess(controlCurrentFloorIndex) {
    setMessage({ type: "info", content: "ready !" });
    setCurrentFloorIndex(controlCurrentFloorIndex);
  }

  /* Reset the elevator state */
  function resetElevator() {
    reset(handleReset, handleError);
  }

  function handleReset(index) {
    setCurrentFloorIndex(index);
    setMessage({ type: "info", content: "The elevator have been successfully reset, ready to go !" })
  }


  /* Simulate an electronical breakdown. The elevator is then blocked until a maintenance */
  function simulateBreakdown() {
    handleBreakdown(handleError);
  }

  /* Request to go up or down (1 floor) */
  function requestControl(direction) {
    control(direction, goUp, goDown, handleError);
  }

  /* "hardware" function goUp */
  function goUp() {

    /* Notify the user */
    setMessage({ type: "info", content: "The elevator is moving, please wait..." });

    /* Simulate the elevator movement */
    setTimeout(function () {
      notifySensorReached(currentFloorIndex + 1, updateElevatorstatus, handleError); // Simulate a sensor reach

    }, floorDelay);
    clearTimeout();
  }

  /* "hardware" function goDown */
  function goDown() {

    /* Notify the user */
    setMessage({ type: "info", content: "The elevator is moving, please wait..." });

    /* Simulate the elevator movement */
    setTimeout(function () {
      notifySensorReached(currentFloorIndex - 1, updateElevatorstatus, handleError); // Simulate a sensor reach
    }, floorDelay);
    clearTimeout();
  }

  /* update the elevator status when the a new floor is reached and validate in the backend */
  function updateElevatorstatus(floorIndex) {
    setCurrentFloorIndex(floorIndex);
    setMessage({ type: "info", content: "ready" });
  }

  /* handle request errors */
  function handleError(errorCode, error) {
    setMessage({ type: "error", content: errorCode + " : " + error });
  }


  return (
    <div id="App">
      <h1 id="title">Super Elevator Demo</h1>

      {/* Contains control buttons */}
      <div id="control-pane-container">
      
        {/* Request to go up */}
        <Button label="UP" onClick={() => requestControl("up")} />
        {/* Simulate a electronical breakdown */}
        <Button label="SIMULATE BREAKDOWN" onClick={() => simulateBreakdown()} />
        {/* Request to go down */}
        <Button label="DOWN" onClick={() => requestControl("down")} />
        {/* Immediatly reset the elevator state (usefull to simulate a maintenance or after changing the building structure) */}
        <Button label="RESET" onClick={() => resetElevator()} />

      </div>

      {/* Contains usefull infos about the elevator state, display errors */}
      <MessagePanel messageType={message.type} messageContent={message.content} />

      {/* Elevator floor Indicators */}
      <FloorPane floors={floors} current={floors ? floors[currentFloorIndex] : null} />
    </div>
  );
}

export default App;
