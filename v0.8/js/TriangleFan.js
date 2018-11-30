// Creating a class that will produce multiple shapes
class TriangleFan {

  // Constructor function for building the shape
  constructor(_xLoc, _yLoc, _noOfVertices, _rotateDir, _radius, _opacity, _colour) {
    this.xLoc = _xLoc;
    this.yLoc = _yLoc;
    this.noOfVertices = _noOfVertices;
    this.vertexAngle = 360 / this.noOfVertices;
    this.rotateDir = _rotateDir;
    this.rotateDirC = this.rotateDir;
    this.rotate = 0;
    this.radius = _radius;
    this.opacity = _opacity;
    this.colour = _colour;
  }

  // Draw function that creates the shape on the canvas
  draw() {
    push();
    translate(this.xLoc, this.yLoc);
    rotate(this.rotate);
    this.rotate = this.rotate + this.rotateDir;

    var counter = 1;
    // Using the opacity value to determine the completion of the shape
    // If the shape has a low opacity it will draw a small arc
    for (var angle = 0; angle <= map(this.opacity, 0, 1, 0, 360); angle = angle + this.vertexAngle) {
      // Instead of drawing each vertex together to form the shape, they are now drawn independently
      // The size of each slice increases in radius
      beginShape(TRIANGLE_FAN);
      vertex(0, 0);
      var vx = (this.radius*counter) * cos(radians(angle)) + 0;
      var vy = (this.radius*counter) * sin(radians(angle)) + 0;
      var vx2 = (this.radius*counter) * cos(radians(angle + this.vertexAngle)) + 0;
      var vy2 = (this.radius*counter) * sin(radians(angle + this.vertexAngle)) + 0;
      vertex(vx, vy);
      vertex(vx2, vy2);
      if (counter % 2 == 0) {
        stroke(300, 0, 80, 0);
        fill(300, 0, 80, 0);
      } else if (this.colour < .1) {
        stroke(345, 80, 100, this.opacity);
        fill(345, 80, 100, this.opacity);
      } else if (this.colour < .8) {
        stroke(0, 7, 6, this.opacity);
        fill(0, 7, 6, 0);
      } else {
        stroke(0, 7, 6, this.opacity);
        fill(0, 7, 6, this.opacity);
      }
      counter++;
      endShape(CLOSE);
    }
    pop();
  }
  // Function to pause shape rotation
  pause() {
    this.rotateDir = 0;
  }
  // Function to unpause shape rotation
  unPause() {
    this.rotateDir = this.rotateDirC;
  }
}
