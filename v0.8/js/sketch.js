/*
Creative Coding
Author: Cillian Tighe
Student No: N00152737
CA 1
*/

// Array for holding all shapes drawn on the canvas
var shapes = [];

// Variables to hold values for the opacity and radius of each shape
var shapeOpacity = 0;
var shapeRadius = 0;
var pause = true;

// Variables for holding opacity and size for the shape to be drawn
var shapeOpacity = 0;
var shapeRadius = 0;

// Variables for holding title text and font type
var txtSize = 170;
var bookTitle1 = ["G", "E", "N", "E", "R", "A", "T", "I", "V", "E"];
var bookTitle2 = ["D", "E", "S", "I", "G", "N"];
var titleFont1 = "";

// The 'setup' function is only called once. Everything within the function is executed once
function setup() {

  // Creates the canvas for the animation to be displayed on
  var canvas = createCanvas(1240, 1748);

  // Setting the colour mode of the canvas
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // JQuery function that reads in a json file and populates the shapes array with the data
  $.getJSON("data/v0.8.json", function(data) {
    if (data != null) {
      for (var i = 0; i < data.length; i++) {
        // A new TriangleFan is created for each object that is within the json file
        // Parameters to be passed _xLoc, _yLoc, _noOfVertices, _rotateDir, _radius
        shapes[i] = new TriangleFan(data[i].xLoc, data[i].yLoc, data[i].noOfVertices, data[i].rotateDir, data[i].radius, data[i].opacity, data[i].colour);
      }
    }
  });
}

// A p5 function that loads in data before the sketch starts
function preload() {

  // Loading the desired font for the project
  titleFont1 = loadFont('font/RobotoCondensed-Regular.ttf');
}

// The 'draw' function is called in a loop. Everything that is in the function is executed continuously
function draw() {

  // White background
  background(0, 0, 100);

  // Checking to see whether the array is populated
  // Draws each shape within the array
  if (shapes.length != 0) {
    for (var i = 0; i < shapes.length; i++) {
      // Checking whether the user has paused the rotation of the shapes
      if (pause === true) {
        shapes[i].pause();
      } else if (pause === false) {
        shapes[i].unPause();
      }
      shapes[i].draw();
    }
  }

  // For loops to draw each letter from the array
  for (var i = 0; i < bookTitle1.length; i++) {
    // Using different blend modes to add effects between the shapes and text
    blendMode(BURN);
    fill(0, 7, 6);
    textFont(titleFont1);
    textSize(txtSize);
    textAlign(CENTER);
    text(bookTitle1[i], txtSize * 2, txtSize * i + txtSize);
  }
  for (var i = 0; i < bookTitle2.length; i++) {
    fill(345, 80, 100);
    textSize(txtSize);
    textAlign(CENTER);
    text(bookTitle2[i], txtSize * i + txtSize, txtSize * 4);
  }
  // Reseting the blendMode
  blendMode(BLEND);
}

// Using the built-in function 'keyPressed' to check whether the user presses a key
// If the user presses the 's' key, the script will export an image of the canvas
// If the user presses the 'j' key, the data within the shapes array is converted and saved as a json file
// If the user presses the 'u' key, it will unpause the rotation of the shapes
// If the user presses the 'p' key, it will pause the rotation of the shapes
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(canvas, 'v0.8', 'png');
  if (key == 'j' || key == 'J') {
    // The value for each shape's rotation must be reset before it's exported as a json
    for (var i = 0; i < shapes.length; i++) {
      shapes[i].unPause();
    }
    saveDesign(JSON.stringify(shapes), "v0.8");

  }
  if (key == 'p' || key == 'P') pause = true;
  if (key == 'u' || key == 'U') pause = false;
}

// Changed to 'mouseDragged'
function mouseDragged() {

  // Calculating the opacity and size of the shape to be drawn based on the position of the mouse
  shapeRadius = map(constrain(mouseX, 0, width), 0, width, 1000, 10);
  shapeOpacity = map(constrain(mouseY, 0, height), 0, height, 0.2, 0.5);
  // Passing the mouseX & mouseY values as the x/y location for the shape
  var shape = new TriangleFan(mouseX, mouseY, floor(random(10, 100)), random(-0.005, 0.005), shapeRadius, shapeOpacity, random(1));
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
