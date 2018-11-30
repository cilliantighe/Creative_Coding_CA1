// Creating a class that will produce multiple shapes
class TriangleFan {

  // Constructor function for building the shape
  constructor(_xLoc, _yLoc, _noOfVertices, _rotateDir, _radius, _opacity, _colour) {
    this.xLoc = _xLoc;
    this.yLoc = _yLoc;
    this.noOfVertices = _noOfVertices;
    this.vertexAngle = 360 / this.noOfVertices;
    this.rotateDir = _rotateDir;
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

    beginShape(TRIANGLE_FAN);
    vertex(0, 0);
    // The counter is used to determine which slice will be transparent
    var counter = 1;
    for (var angle = 0; angle <= 360; angle = angle + this.vertexAngle) {
      var vx = this.radius * cos(radians(angle)) + 0;
      var vy = this.radius * sin(radians(angle)) + 0;
      vertex(vx, vy);
      // This if statement makes every second slice of the shape transparent
      // This creates the fan effect
      // Adding probability control to determine the colour of the shape
      if (counter % 2 == 0) {
        stroke(345, 80, 100, 0);
        fill(345, 80, 100, 0);
      } else if (this.colour < .1) {
        stroke(345, 80, 100, this.opacity);
        fill(345, 80, 100, this.opacity);
      } else if (this.colour < .5) {
        stroke(0, 7, 6, this.opacity);
        fill(0, 7, 6, 0);
      } else {
        stroke(0, 7, 6, this.opacity);
        fill(0, 7, 6, this.opacity);
      }
      counter++;
    }
    endShape();
    pop();
  }
}
