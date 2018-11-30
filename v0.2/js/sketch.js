/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
CA 1
*/

// Array for holding all shapes drawn on the canvas
var shapes = [];

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

  // White background
  background(0, 0, 100);

  // Checking to see whether the array is populated
  // Draws each shape within the array
  if (shapes.length != 0) {
    for (var i = 0; i < shapes.length; i++) {
      shapes[i].draw();
    }
  }
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, 'v0.2', 'png');
}

function mouseReleased() {
  // _xLoc, _yLoc, _noOfVertices, _rotateDir, _radius
  // Passing the mouseX & mouseY values as the x/y location for the shape
  // The number of points, rotate direction and radius are all random
  var shape = new TriangleFan(mouseX, mouseY, floor(random(10, 100)), random(-0.005, 0.005), floor(random(10, 200)));
  shapes.push(shape);
}
