//MARS rover KATA 
// Final exercise JavaScript (IronHack - prework)
// Luna Fidalgo
// 22/02/2018 - v1.0


// rover Object Goes Here
// ======================
var rover = {
  direction: "N", // Default direction -> North (N); possible directions: N, S, E, W
  r: 0, // row
  c: 0, // column
  travelLog : [],
  id: 1

};

// second rover for two players
var rover2 = {
  direction: "N",
  r: 2, 
  c: 2, 
  travelLog : [], 
  id: 2
}

// global variable => grid [numberOfRows][numberOfColumns] with obstacles
var grid = [];
var numberOfRows;
var numberOfColumns;
var numbObstacles;
var numberOfRovers = 1;
// ======================

function initialization(numbObstacles_play, numberOfRows_play, numberOfColumns_play, numberOfRovers_play){

  /*This function is the "constructor". It should be called at the beginning of the game. 
  The user can specify: 
  - numbObstacles => number of obstacles 
  - numberOfRows_play => number of rows of the grid 
  - numberOfColumns_play => number of columns of the grid
  - numberOfRovers_play => number of rovers on the grid (max: 2). 
    */
  numberOfRows = numberOfRows_play;
  numberOfColumns = numberOfColumns_play;
  numbObstacles = numbObstacles_play;
  numberOfRovers = numberOfRovers_play;

  //grid => where the obstacles are. (If there is an obstacle => true). 
  for(var i=0 ; i<numberOfRows; i++){
    grid[i] = [];
    for(var j=0; j<numberOfColumns; j++){
      grid[i][j]= false;
    }
  }
 
  for (var i=0; i<numbObstacles; i++){
   grid[parseInt(Math.random()*numberOfRows)][parseInt(Math.random()*numberOfColumns)] = true;
  }

  grid[rover.r][rover.c] = true; // in this position is where the rover is. 
  if(numberOfRovers > 2){
    console.log("Sorry, we only allow 2 rovers max.");
    numberOfRovers = 2;
    numberOfRovers_play = 2;
  }else{ 

    rover2.r = numberOfRows - 1;
    rover2.c = numberOfColumns - 1;
    grid[rover2.r][rover2.c] = true; // in this position is where the rover2 is. 

    // we initialize the travelLog with the initial position of both rovers. 
    rover.travelLog.push("0-0");
    rover2.travelLog.push(numberOfRows + "-" + numberOfColumns);

}

  console.log("The initialization was ok. You are playing in a grid of [" + numberOfRows_play +" - "+ numberOfColumns_play +"] with "+ numbObstacles_play + " obstacles and " + numberOfRovers_play + " rovers.");

 // console.log(grid.join('\n') + '\n\n');
}


/*The "moveTheRover" function is the main function. The user communicates with the game with it.: 
 - f => he wants to move the rover forward.
 - r => he wants to turn the rover to the right . 
 - l => he wants to turn the rover to the left. 
 - b => he wants to move the rover backwards. 
*/
function moveTheRover(commands, rover_play) {

  if(rover_play.id === 2 && numberOfRovers === 1){
    console.log("You only have one rover on the grid");
    return;
  }else{

  for (var i = 0; i < commands.length; i++) {
    switch (commands[i]) {
      case "f":
        moveForward(rover_play);
        break;

      case "r":
        turnRight(rover_play);
        break;

      case "l":
        turnLeft(rover_play);
        break;

      case "b":
        moveBackwards(rover_play);
        break;
      default: 
      console.log("Wrong command. Nothing happens...");
       return;
    }
  }
  console.log("Look where I have been!!: " + rover_play.travelLog);
}
}

//this function changes the direction towards which the rover is oriented. N => W => S => E => N
function turnLeft(rover_play) {
  console.log("turnLeft was called!");
  switch (rover_play.direction) {
    case "N":
    rover_play.direction = "W";
      console.log("Rover is now facing:  " + rover_play.direction);
      break;

    case "W":
    rover_play.direction = "S";
      console.log("Rover is now facing:  " + rover_play.direction);
      break;

    case "S":
    rover_play.direction = "E";
      console.log("Rover is now facing:  " + rover_play.direction);
      break;

    case "E":
    rover_play.direction = "N";
      console.log("Rover is now facing:  " + rover_play.direction);
      break;

  }
  whereTheRoverIs(rover_play);
}

//this function changes the direction towards which the rover is oriented. N=> E => S => W => N
function turnRight(rover_play) {
  console.log("turnRight was called!");

  switch (rover_play.direction) {
    case "N":
      rover_play.direction = "E";
      console.log("Rover is now facing:  " + rover_play.direction);
      break;

    case "W":
      rover_play.direction = "N";
      console.log("Rover is now facing:  " + rover_play.direction);
      break;

    case "S":
      rover_play.direction = "W";
      console.log("Rover is now facing:  " + rover_play.direction);
      break;

    case "E":
      rover_play.direction = "S";
      console.log("Rover is now facing:  " + rover_play.direction);
      break;

  }
  whereTheRoverIs(rover_play);
}

//Based on the direction of the rover, the rover will move forward. 
function moveForward(rover_play) {

  console.log("moveForward was called");

  console.log("Rover is facing:  " + rover_play.direction);

  switch (rover_play.direction) {
    case "N":
    //check if the rover is trying to go outside the grid
    if (rover_play.r - 1 >= 0) {
      //check if there is an obstacle in the square the rover is trying to go
        if(grid[rover_play.r-1][rover_play.c]){
          console.log("There is an obstacle in : " + rover_play.r+", "+ rover_play.c);
        }else{
          rover_play.r = rover_play.r - 1;
                // we update the current rover position as true (it is not an obstacle anymore)
      grid[rover_play.r][rover_play.c] = false;
        }
        
      } else {
        console.log(
          "Ups!! You are making an invalid movement. Your rover is in: " +
            rover_play.r,
          rover_play.c
        );
        return;
      }
      break;

    case "W":
      if (rover_play.c - 1 >= 0) {
        if (grid[rover_play.r][rover_play.c-1]){
          console.log("There is an obstacle in : " + rover_play.r+", "+ rover_play.c);
        }else{
      // we update the current rover position as true (it is not an obstacle anymore)
      grid[rover_play.r][rover_play.c] = false;
        rover_play.c = rover_play.c - 1;
        }
      } else {
        console.log(
          "Ups!! You are making an invalid movement. Your rover is in: " +
            rover_play.r,
          rover_play.c
        );
        return;
      }
      break;

    case "S":
      if (rover_play.r + 1 < numberOfRows) {
        if(grid[rover_play.r+1][rover_play.c]){
          console.log("There is an obstacle in : " + rover_play.r+", "+ rover_play.c);
        }else{
                // we update the current rover position as true (it is not an obstacle anymore)
      grid[rover_play.r][rover_play.c] = false;
        rover_play.r = rover_play.r + 1;
        }
      } else {
        console.log(
          "Ups!! You are making an invalid movement. Your rover is in: " +
            rover_play.r,
          rover_play.c
        );
        return;
      }
      break;

    case "E":
      if (rover_play.c + 1 < numberOfColumns) {
        if(grid[rover_play.r][rover_play.c+1]){
          console.log("There is an obstacle in : " + rover_play.r+", "+ rover_play.c);
          
        }else{
                // we update the current rover position as true (it is not an obstacle anymore)
      grid[rover_play.r][rover_play.c] = false;
          rover_play.c = rover_play.c + 1;
        }
      } else {
        console.log(
          "Ups!! You are making an invalid movement. Your rover is in: " +
            rover_play.r,
          rover_play.c
        );
        return;
      }
      break;
  }
  whereTheRoverIs(rover_play);
  rover_play.travelLog.push(rover_play.r + "-" +rover_play.c);
  // we update the rover position as an obstacle 
  grid[rover_play.r][rover_play.c] = true;
}


function moveBackwards(rover_play){
  console.log("moveBackwards was called");

  console.log("Rover is facing:  " + rover_play.direction);

  switch(rover_play.direction){
    case "N":

    if (rover_play.r + 1 < numberOfRows) {
      if (grid[rover_play.r +1][rover_play.c]){
        console.log("There is an obstacle in : " + rover_play.r+", "+ rover_play.c);
      }else{
      // we update the current rover position as true (it is not an obstacle anymore)
      grid[rover_play.r][rover_play.c] = false;
      rover_play.r = rover_play.r + 1;
      }
    } else {
      console.log(
        "Ups!! You are making an invalid movement. Your rover is in: " +
          rover_play.r,
        rover_play.c
      );
      return;
    }
    break;

    case "E":
    if (rover_play.c - 1 >= 0) {
      if(grid[rover_play.r][rover_play.c-1]){
        console.log("There is an obstacle in : " + rover_play.r+", "+ rover_play.c);
      }else{     
              // we update the current rover position as true (it is not an obstacle anymore)
      grid[rover_play.r][rover_play.c] = false;
        rover_play.c = rover_play.c - 1;
      }
    } else {
      console.log(
        "Ups!! You are making an invalid movement. Your rover is in: " +
          rover_play.r,
        rover_play.c
      );
      return;
    }
    break;

    case "W":
    if (rover_play.c + 1 < numberOfColumns) {
      if(grid[rover_play.r][rover_play.c+1]){
            // we update the current rover position as true (it is not an obstacle anymore)
            grid[rover_play.r][rover_play.c] = false;
      rover_play.c = rover_play.c + 1;
      }else{
        console.log("There is an obstacle in : " + rover_play.r+", "+ rover_play.c);
      }
    } else {
      console.log(
        "Ups!! You are making an invalid movement. Your rover is in: " +
          rover_play.r,
        rover_play.c
      );
      return;
    }
    break;

    case "S":
    if (rover_play.r - 1 >= 0) {
      if(grid[rover_play.r-1][rover_play.c]){
        console.log("There is an obstacle in : " + rover_play.r+", "+ rover_play.c);
      }else{
      // we update the current rover position as true (it is not an obstacle anymore)
      grid[rover_play.r][rover_play.c] = false;
      rover_play.r = rover_play.r - 1;
      }
    } else {
      console.log(
        "Ups!! You are making an invalid movement. Your rover is in: " +
          rover_play.r,
        rover_play.c);
        return;
    }
    break;

  }

  whereTheRoverIs(rover_play);
  rover.travelLog.push(rover_play.r + "-" +rover_play.c);
    // we update the rover position as an obstacle 
    grid[rover_play.r][rover_play.c] = true;
}



//This function show the grid with obstacles and the position of the rover that is moving (the other rover is just another obstacle).
function whereTheRoverIs(rover_play){
var matrix=[];
  for(var i=0 ; i<numberOfRows; i++){
    matrix[i] = [];
    for(var j=0; j<numberOfColumns; j++){
      if(grid[i][j]){
        // there is an obstacle (true)
        matrix[i][j]="o";
      }else{
        matrix[i][j]="-";
      }
    }
  }

  matrix[rover_play.r][rover_play.c] = "X";

  console.log(matrix.join('\n') + '\n\n');
}

//end