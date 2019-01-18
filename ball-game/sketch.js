
let width = 1536;
let height = 750;
let gravity = .3;

// player variables (model)
let x = width/2;
let y = 743;
let vx = 0;
let vy = 0;
let radius = 20;
let jump = false;
let touch = false;

var platforms = [
  {x: width/2 - 70, y: height/2 - 10, width: 140, height: 20},
  {x: width/4 - 70, y: height * 3/4 - 10, width: 140, height: 20},
  {x: width * 3/4 - 70, y: height/4 - 10, width: 140, height: 20},
  // ground:
  {x: 0, y: height, width: width, height: 20},
  // ceiling (because gavity can shift)
  {x: 0, y: -20, width: width, height: 20}
]

// called by processing (p5.js) when page is loaded, once
function setup() {
  createCanvas(width, height);
}

// called by processing for every frame (in animation loop)
function draw() {

   drawObjects();

   // jump whenever we touch the ground and up/down _is_ pressed
   if (touch && keyIsPressed) {
     if (keyCode == UP_ARROW) {
       jump = true;
       touch = false;
       vy = -12;
     } else if (keyCode == DOWN_ARROW) {
       jump = true;
       touch = false;
       vy = 12;
     }
   }

   if (jump) {
     jump = false;
   } else {
     touch = detectPlatforms();
   }
   ///// screen boundary detection and update of velocity and position

   // stay on sides
   if (x > width - radius) {
     x = width - radius
     vx = 0
   }

   if (x < 0 + radius) {
     x = 0 + radius
     vx = 0
   }

   // gravity
   // if (!touch && !jump) {
     vy = vy + gravity;
     y = y + vy;
   // }

   // new x position
   x = x + vx;
}

// actually draws stuff
function drawObjects() {
    noStroke();
    // clear background
    background(160, 200, 200);
    fill(220, 0, 0);
    // draw player rectangle
    rect(x - radius, y - radius, radius * 2, radius * 2, 10);
    // draw obstacles
    fill(0, 0, 0);
    // draw platforms
    platforms.forEach(function(platform) {
       rect(platform.x, platform.y, platform.width, platform.height, 5);
    });
    text("touch: " + touch + ", jump: " + jump, 5, 15)
}

// stay on platforms (collison detection)
// returns true if collision was detected, otherwise false
function detectPlatforms() {
  for (let platform of platforms) {
    if (x >= platform.x - radius && x <= platform.x + platform.width + radius
        && y >= platform.y - radius && y <= platform.y + platform.height + radius) {

        // workaround to set back y position to touch platform (in case it already went into it)
        if (vy > 0 && y > platform.y - radius) {
           y = platform.y - radius;
           vy = vy * -1/2;
           return gravity > 0;
        } else if (vy < 0 && y < platform.y + platform.height + radius) {
           y = platform.y + platform.height + radius;
           vy = vy * -1/2;
           return gravity < 0;
        }
        return true;
    }
  }
  return false;
}

//// key events

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    vx = 5;
  } else if (keyCode == LEFT_ARROW) {
    vx = - 5;
  }
}

function keyReleased() {

  if (keyCode == RIGHT_ARROW) {
    vx = 0
  } else if (keyCode == LEFT_ARROW) {
    vx = 0
  } else if (keyCode == SHIFT) {
    gravity = gravity * -1
  }
}
