/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
CA 1
*/

// xSP refers to the x start point of the shape
// ySP refers to the y start point of the shape
var xSP = 0;
var ySP = 0;

// rotateAngle is the variable that controls the speed/direction in which the shape rotates
var rotateAngle = 0;
var rotateAngle2 = 0;
var rotateAngle3 = 0;

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(1240, 1748);

  // Setting the colour mode of the canvas
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  // White background with a low alpha value
  // Having a low alpha value will create a bleed effect with colour
  background(0, 0, 100, 0.001);

  // push() saves the current drawing style settings and transformations
  // pop() restores to the previous settings

  //---------- SHAPE ONE ----------//
  push();
  // numberOfSteps = How many slices the shape will be divided into
  // angleIncrement = This is determined by dividing 360(full circle) by the desired amount of slices
  // radius = The radius is calculated by the current location of mouseX
  var numberOfSteps = 10;
  var angleIncrement = round(360 / numberOfSteps);
  var radius = map(constrain(mouseX, 0, width), 0, width, 5, 1000);

  // Moving the (0, 0) points of x/y to the center of the canvas
  // Rotating the grid
  translate(width / 2, height / 2);
  rotate(rotateAngle);
  rotateAngle = rotateAngle + 0.01;

  // Setting the shape to be drawn to 'TRIANGLE_FAN' this is a key word in p5
  // The first vertex is the center of the shape
  // The following vertices are the surrounding points
  beginShape(TRIANGLE_FAN);
  vertex(xSP, ySP);
  // An loop for creating multiple points to create a circle shape
  for (var angle = 0; angle <= 360; angle += angleIncrement) {
    // Why do I use cos & sin?
    var vx = radius * cos(radians(angle)) + xSP;
    var vy = radius * sin(radians(angle)) + ySP;
    vertex(vx, vy);
    // Low alpha value for a bleed effect
    fill(angle, height, width, 0.1);
  }
  endShape();
  pop();

  //---------- SHAPE TWO ----------//
  push();
  var numberOfSteps = 5;
  var angleIncrement = round(360 / numberOfSteps);
  var radius = map(constrain(mouseX, 0, width), 0, width, 5, 1000);

  translate(width / 2, height / 2);
  rotate(rotateAngle2);
  rotateAngle2 = rotateAngle2 - 0.01;

  beginShape(TRIANGLE_FAN);
  vertex(xSP, ySP);
  for (var angle = 0; angle <= 360; angle += angleIncrement) {
    var vx = radius * cos(radians(angle)) + xSP;
    var vy = radius * sin(radians(angle)) + ySP;
    vertex(vx, vy);
    fill(angle, height, width, 0.3);
  }
  endShape();
  pop();

  //---------- SHAPE THREE ----------//
  push();
  var numberOfSteps = 20;
  var angleIncrement = round(360 / numberOfSteps);
  var radius = map(constrain(mouseX, 0, width), 0, width, 5, 1000);

  translate(width / 2, height / 2);
  rotate(rotateAngle3);
  rotateAngle3 = rotateAngle3 + 0.05;

  beginShape(TRIANGLE_FAN);
  vertex(xSP, ySP);
  for (var angle = 0; angle <= 360; angle += angleIncrement) {
    var vx = radius * cos(radians(angle)) + xSP;
    var vy = radius * sin(radians(angle)) + ySP;
    vertex(vx, vy);
    fill(angle, height, width, 0.3);
  }
  endShape();

  pop()
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, 'v0.1', 'png');
}
