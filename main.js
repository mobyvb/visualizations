var canvas = document.getElementById('maincanvas');
var width = window.innerWidth - 50;
var height = window.innerHeight - 50;
canvas.width  = width;
canvas.height = height;
var ctx = canvas.getContext('2d');

var circleResolution = 50;
var innerCircle = {
  radius: 50,
  points: []
};
var outerCircle = {
  radius: 300,
  points: []
};
var minRadius = 50;
var maxRadius = 300;

var innerSpeed = 50; // secs per rotation
var outerSpeed = -30; // secs per rotation
var sizeChangeSpeed = 100; // secs per full expansion/retraction
var innerOffset = 0;
var outerOffset = 0;
var goingOut = true;
var now = Date.now();
window.requestAnimationFrame(frame);
function frame() {
  var then = now;
  now = Date.now();
  dt = (now - then) / 1000;

  innerOffset += (2*Math.PI / innerSpeed) * dt;
  outerOffset += (2*Math.PI / outerSpeed) * dt;
  if (innerOffset > 2 * Math.PI) {
    innerOffset -= 2 * Math.PI;
  }
  if (innerOffset < -2*Math.PI) {
    innerOffset += 2*Math.PI;
  }
  if (outerOffset > 2 * Math.PI) {
    outerOffset -= 2 * Math.PI;
  }
  if (outerOffset < -2*Math.PI) {
    outerOffset += 2*Math.PI;
  }

  if (goingOut) {
    radiusDifference = maxRadius - minRadius;
    innerCircle.radius += (radiusDifference / sizeChangeSpeed) * dt;
    outerCircle.radius -= (radiusDifference / sizeChangeSpeed) * dt;
    if (innerCircle.radius > maxRadius) {
      goingOut = false;
    }
  } else {
    radiusDifference = maxRadius - minRadius;
    outerCircle.radius += (radiusDifference / sizeChangeSpeed) * dt;
    innerCircle.radius -= (radiusDifference / sizeChangeSpeed) * dt;
    if (outerCircle.radius > maxRadius) {
      goingOut = true;
    }
  }
  drawCircles(innerOffset, outerOffset);
  window.requestAnimationFrame(frame);
}



function drawCircles(offsetInner, offsetOuter) {
  ctx.clearRect(0, 0, width, height);
  for (var i=0; i<circleResolution; i++) {
    var center = {
      x: width / 2,
      y: height / 2
    };
    var currPercentage = i / circleResolution;
    var currAngleInner = 2 * Math.PI * currPercentage + offsetInner;
    var currAngleOuter = 2 * Math.PI * currPercentage + offsetOuter;
    var nextInnerPoint = {
      x: center.x + Math.cos(currAngleInner) * innerCircle.radius,
      y: center.y + Math.sin(currAngleInner) * innerCircle.radius
    };
    var nextOuterPoint = {
      x: center.x + Math.cos(currAngleOuter) * outerCircle.radius,
      y: center.y + Math.sin(currAngleOuter) * outerCircle.radius
    }
    ctx.beginPath();
    ctx.moveTo(nextInnerPoint.x, nextInnerPoint.y);
    ctx.lineTo(nextOuterPoint.x, nextOuterPoint.y);
    ctx.stroke();
  }
}
