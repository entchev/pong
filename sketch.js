var pX, pY, pW, pH, pV
var bX, bY, bD, vX, vY, vMax
var maxAngle
var cX, cY, cV
var botLevel
var pScore, cScore
var freeze

function setup() {
  createCanvas(600, 400);
  restart()
  
  maxAngle = 75 / 180 * PI
  botLevel = 0.1
  
  pScore = 0
  cScore = 0
}

function restart() {
  pW = 20
  pH = 100
  pX = 0
  pY = height/2
  pV = 0 //paddle's velocity
  
  cX = width - pW
  cY = height / 2
  cV = 0
  
  bX = width/2
  bY = height/2
  bD = height/20  //ball's diameter
  
  vMax = 6
  vX = 0
  vY = 0
  
  freeze = true
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
  
  //  computer movement
  cV = botLevel * (bY - cY)
  
  //  should not move faster than player
  if(cV < -4) {
    cV = -4
  }  
  if(cV > 4) {
    cV = 4
  }
  
  //  update computer paddle's position
  cY = cY + cV
  
  //  limit paddle's position
  if(cY<pH/2) {
    cY=pH/2
  }  
  
  if(cY>height - pH/2) {
    cY=height - pH/2
  }
  
  // player, fill area with white color
  fill(255)
  //   draw a rectangle, x,y,width,height
  
  rect(cX, cY-pH/2, pW, pH)
  
  //  update ball's position
  bX = bX + vX
  bY = bY + vY
  
  //  update ball to paddle collision
  if(bX - bD/2 <= pX + pW && 
    bY >= pY - pH/2 &&
    bY <= pY + pH/2) {
    var range = (bY - pY) / (pH / 2)
    var angle = range * maxAngle
    
  //  update ball's velocity after collision
  vX = vMax * cos(angle)
  vY = vMax * sin(angle)
  }  
  
  //  update ball to paddle collision (computer)
  if(bX + bD/2 >= width - pW && 
    bY >= cY - pH/2 &&
    bY <= cY + pH/2) {
    var range = (bY - cY) / (pH / 2)
    var angle = range * maxAngle
    
  //  update ball's velocity after collision
  vX = -vMax * cos(angle)
  vY = vMax * sin(angle)
  }
  
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
    //  pc score increases
    cScore++
    restart()
  }  
  
  if(bX + bD/2 >= width) {
    //  player score increases
    pScore++
    restart()
  }
  
  
  //  draw a ball
  ellipse(bX, bY, bD, bD)
  
  //  change the text size
  textSize(24)
  text(pScore, 0.25*width, 0.25*height)
  text(cScore, 0.75*width, 0.25*height)
}

function keyPressed() {
  if(freeze == true) {
    vX = -vMax
    vY = vMax
    freeze = false
  }
  if(key == 'w') {
    pV = -4
  }  
  if(key == 's') {
    pV = 4
  }  
  
  if(key == 'i') {
    cV = -4
  }  
  if(key == 'k') {
    cV = 4
  }
}