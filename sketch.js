var hypnoticBall, database;
var position;


function setup(){
  // creating database for code
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
  //creating sprite for ball
  hypnoticBall = createSprite(250,250,10,10);
  //changing ball color to red
  hypnoticBall.shapeColor = "red";

  //giving ball position in database
  var hypnoticBallPosition = database.ref('ball/position');
  //holding values to use 
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  // making background color white
  background("white");
    //giving movement to ball while pressing left arrow
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    //giving movement to ball while pressing right arrow
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    //giving movement to ball while pressing up arrow
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    //giving movement to ball while pressing down arrow
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    //displaying sprites
    drawSprites();
  
}

function writePosition(x,y){
  //getting values from database
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}
//giving values to ball
function readPosition(data){
  //displaying position for ball
  position = data.val();
  console.log(position.x);
  //making ball have x and y values
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}
//console.log is used to print values
function showError(){
  console.log("Error in writing to the database");
}
