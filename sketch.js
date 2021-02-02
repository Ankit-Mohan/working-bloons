var bloon, database;
var position;
function preload(){
   bloonim = loadImage("Hot Air Ballon-02.png")
   backgroundImg = loadImage("Hot Air Ballon-01.png");
}
function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1400,1200);
  //createSprite(400, 200, 50, 50);
  bloon = createSprite(1000,900,10,10);
  bloon.addImage(bloonim)
  bloon.scale = 0.75
  var bloonPosition = database.ref('bloon/position');
  bloonPosition.on("value", readPosition, showError);

}

function draw() {
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)){
    writePosition(-3,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(3,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-3);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+3);
  }

  drawSprites();
}



function writePosition(x,y){
  database.ref('bloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}



function readPosition(data){
  position = data.val();
  console.log(position.x);
  bloon.x = position.x;
  bloon.y = position.y;
}
function showError(){
  console.log("Error in writing to the database");
}
