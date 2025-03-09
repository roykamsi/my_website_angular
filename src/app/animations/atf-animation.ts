/* eslint-disable */

function setup() {
  createCanvas(windowWidth + 40, windowHeight ).parent('#canvas');
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let x = mouseX;
  let y = mouseY;
  let ix = width - mouseX; // Inverse X
  let iy = height - mouseY; // Inverse Y
  background("#0D1731");
  fill("#D29700");
  ellipse(x, height / 2, y, y);
  fill("#17254A");
  ellipse(ix, height / 2, iy, iy);
}
