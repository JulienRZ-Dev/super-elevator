var currentFloorIndex = 0;
var isStable = true;
var isBroken = false;
var floors = null;
var min_floor = null;
var max_floor = null;

const errors = [
    "MOVEMENT_INVALID", // code 0
    "ELEVATOR_IS_MOVING", // code 1
    "TOP_IS_REACHED", // code 2
    "BOTTOM_IS_REACHED", // code 3
    "ELECTRONICAL BREAKDOWN" // code 4
];


// Inititialize the backend variables to ensure a stable state when the application is launched and set the elevator floors
export function init(initFloors, callback) {
    floors = initFloors;
    min_floor = initFloors[0];
    max_floor = initFloors[initFloors.length - 1];
    callback(currentFloorIndex);
}


// Check if the movement requested is possible and call the "hardware" corresponding function function
export function control(movement, callbackUp, callbackDown, errorHandler) {

    // The elevator can't move if it's broken (Am I captain Obvious ?)
    if (!isBroken) {

        // The elevator must be stopped to accept an order
        if (isStable) {

            // If the top is reached, goUp() is not possible
            if (movement == "up" && floors[currentFloorIndex] == max_floor) {
                errorHandler(errors[2], "You already reached the top");

                // If the bottom is reached, goDown() is not possible
            } else if (movement == "down" && floors[currentFloorIndex] == min_floor) {
                console.log(currentFloorIndex, min_floor);
                errorHandler(errors[3], "You already reached the bottom");

                // Else the movement is possible
            } else {

                // The elevator is about to move, new request must be blocked
                isStable = false;

                if (movement == "up") {
                    callbackUp();
                } else {
                    callbackDown();
                }
            }
        } else {

            // The elevator is closed to new requests when moving
            errorHandler(errors[1], "You must wait the elevator to stop");
        }
    } else {
        
        // The elevator is closed to new requests when broken
        errorHandler(errors[4], "The elevator is out of service, a technician is required"); 
    }
}

// Update the elevator state in the backend, save it to the database, and then update the user interface
// The interface update could have been performed directly in the front-end, but we suppose that such a front-end
// doesn't exist and is just here for a demonstration purpose to simulate the hardware.   
export function notifySensorReached(floorIndex, callback) {
    
    // Little trick here, because if the elevator breaks down it's not supposed to reached the sensor
    if(!isBroken) {

        currentFloorIndex = floorIndex;
        isStable = true;
        callback(currentFloorIndex);
    }    
}


// This function allows to reset the elevator state in the backend AND
// in the database. Usefull after changing the building structure or to simulate a maintenance 
export function reset(callback) {
    isBroken = false;
    currentFloorIndex = 0;
    isStable = true;
    callback(currentFloorIndex);
}


export function handleBreakdown(errorHandler) {
    isBroken = true;
    errorHandler(errors[4], "Fatal breakdown, a technician is required...");
}