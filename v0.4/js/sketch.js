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

  // JQuery function that reads in a json file and populates the shapes array with the data
  $.getJSON("data/v0.4.json", function(data) {
    if (data != null) {
      for (var i = 0; i < data.length; i++) {
        // A new TriangleFan is created for each object that is within the json file
        // Parameters to be passed _xLoc, _yLoc, _noOfVertices, _rotateDir, _radius
        shapes[i] = new TriangleFan(data[i].xLoc, data[i].yLoc, data[i].noOfVertices, data[i].rotateDir, data[i].radius, data[i].colour);
      }
    }
  });
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
// If the user presses the 'j' key, the data within the shapes array is converted and saved as a json file
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, 'v0.4', 'png');
  if (key == 'j' || key == 'J') saveDesign(JSON.stringify(shapes), "v0.4")
}

function mouseReleased() {
  // _xLoc, _yLoc, _noOfVertices, _rotateDir, _radius, _opacity, _colour
  // Passing the mouseX & mouseY values as the x/y location for the shape
  // The number of points, rotate direction and radius are all random
  var shape = new TriangleFan(mouseX, mouseY, floor(random(10, 100)), random(-0.005, 0.005), floor(random(10, 200)), random(1), random(1));
  shapes.push(shape);
}

// A function that creates a HTML element to the page(an anchor tag)
// The element is creates a download of the desired data
function saveDesign(data, filename) {
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(data));
  a.setAttribute('download', filename + ".json");
  a.click();
}
