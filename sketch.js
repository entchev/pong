var pX, pY, pW, pH, pV
var bX, bY, bD, vX, vY, vMax

function setup() {
  createCanvas(600, 400);
  pW = 20
  pH = 100
  pX = 0
  pY = height/2
  pV = 0 //paddle's velocity
  
  bX = width/2
  bY = height/2
  bD = height/20  //ball's diameter
  
  vMax = 6
  vX = vMax
  vY = vMax
}

function draw() {
  background(65, 79, 105);
  
  //line color, weight & positioning
  stroke(255)
  strokeWeight(1)
  
  // line use - line(x1,x2,y1,y2)
  // line(width/2, 0, width/2, height)
  
  for(var i=0; i<height/10; i++) {
    line(width/2, height/10*i, width/2, height/20 + height/10*i)
  }
  
  //  update paddle's position
  pY = pY + pV
  //  limit paddle's position
  if(pY<pH/2) {
    pY=pH/2
  }  
  
  if(pY>height - pH/2) {
    pY=height - pH/2
  }
  
  // player, fill area with white color
  fill(255)
  //   draw a rectangle, x,y,width,height
  
  rect(pX, pY-pH/2, pW, pH)
  
  //  update ball's position
  bX = bX + vX
  bY = bY + vY
  
  //  bounce back when hitting the top and bottom wall
  if(bY + bD/2 >= height) {
    vY = vY * -1
    bY = height - bD/2
  }  
  
  if(bY - bD/2 <= 0) {
    vY = vY * -1
    bY = bD/2
  }  
  
    //  bounce back when hitting the left and right wall
  if(bX - bD/2 < 0) {
    vX = vX * -1
    bX = bD/2
  }  
  
  if(bX + bD/2 >= width) {
    vX = vX * -1
    bX = width - bD/2
  }
  
  
  
  //  draw a ball
  ellipse(bX, bY, bD, bD)
}

function keyPressed() {
  if(key == 'w') {
    pV = 4
  }  
  if(key == 's') {
    pV = 4
  }
}