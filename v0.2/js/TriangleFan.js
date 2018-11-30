// Creating a class that will produce multiple shapes
class TriangleFan {

  // Constructor function for building the shape
  constructor(_xLoc, _yLoc, _noOfVertices, _rotateDir, _radius) {
    this.xLoc = _xLoc;
    this.yLoc = _yLoc;
    this.noOfVertices = _noOfVertices;
    this.vertexAngle = 360 / this.noOfVertices;
    this.rotateDir = _rotateDir;
    this.rotate = 0;
    this.radius = _radius;
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
      if (counter % 2 == 0) {
        stroke(angle, 100, 100, 0);
        fill(angle, 100, 100, 0);
      } else {
        stroke(angle, 100, 100, 1);
        fill(angle, 100, 100, 1);
      }
      counter++;
    }
    endShape();
    pop();
  }
}
