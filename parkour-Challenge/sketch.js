// setup variables
let width;
let height;

// player variables
let gravity = .3;
let x;
let y;
let xv = 0;
let yv = 0;
let radius = 25;
let jump = false;
let touch = false;

// game variables
let platforms;
let coins;
let coinCount;

function setup() {

  width = windowWidth;
  height = windowHeight;
  x = width/2;
  y = height - radius;
  coinColor = (255, 255, 255);

  platforms = [
    // ground
    {x: 0, y: height, width: width, height: 20},
    // platforms middle
    {x: 850, y: height/2 + 300, width: 200, height: 20},
    {x: 850, y: height/2 + 100, width: 200, height: 20},
    {x: 850, y: height/2 - 330, width: 200, height: 20},
    // platforms left
    {x: 300, y: height/2 + 180, width: 200, height: 20},
    {x: 10, y: height/2, width: 200, height: 20},
    {x: 170, y: height/2 - 200, width: 200, height: 20},
    // platforms right
    {x: 1400, y: height/2, width: 200, height: 20},
    {x: 1400, y: height/2 - 200, width: 200, height: 20}
  ];

  coins = [
    // coin middle
    {x: 950, y: height/2 + 75, width: 50, height: 50},
    {x: 950, y: height/2 - 355, width: 50, height: 50},
    // coin left
    {x: 270, y: height/2 - 225, width: 50, height: 50}
  ];

  createCanvas(width, height);
}

function draw() {

  drawObjects();
  detectCoins();

  // jumping
  if (touch && keyIsPressed && keyCode == UP_ARROW) {
    jump = true;
    touch = false;
    yv = -12;
  }

  if (jump) {
    jump = false;
  } else {
    touch = detectPlatforms();
  }

  // stay on sides
  if (x > width - radius) {
    x = width - radius;
    xv = 0;
  } else if (x < 0 + radius) {
    x = 0 + radius;
    xv = 0;
  }

  // gravity
  yv = yv + gravity;
  y = y + yv;

  // update x position
  x = x + xv;
}
// draws the objects
function drawObjects() {

  noStroke();
  // clear background
  background(0, 195, 255);
  fill(255, 236, 0);
  ellipse(100, 100, 120, 120);

  // draw player
  fill(255, 255, 255);
  rect(x - radius, y - radius, radius * 2, radius * 2, 15);
  fill(0, 0, 0);

  // draw platforms
  platforms.forEach(function(platform) {
    rect(platform.x, platform.y, platform.width, platform.height, 5);
  });

  // coins
  fill(coinColor);
  coins.forEach(function(coin) {
    fill(218,165,32);
    ellipse(coin.x, coin.y, coin.width, coin.height);
  });
}

// collison detection
function detectPlatforms() {
  for (let platform of platforms) {
    if (x >= platform.x - radius && x <= platform.x + platform.width + radius
        && y >= platform.y - radius && y <= platform.y + platform.height + radius) {

          if (yv > 0 && y > platform.y - radius) {
            y = platform.y - radius;
            yv = 0;
            return gravity > 0;
          } else if (yv < 0 && y > platform.height + radius) {
            y = platform.y + platform.height + radius;
            yv = 0;
            return gravity < 0;
          }
          return true;
        }
  }
  return false;
}

// coin detection W.I.P
function detectCoins() {
  for (let coin of coins) {

  }
}

// key events
function keyPressed() {

  if (keyCode == RIGHT_ARROW) {
    xv = 4.5
  } else if (keyCode == LEFT_ARROW) {
    xv = -4.5
  }
}

function keyReleased() {

  if (keyCode == RIGHT_ARROW) {
    xv = 0
  } else if (keyCode == LEFT_ARROW) {
    xv = 0
  }
}
