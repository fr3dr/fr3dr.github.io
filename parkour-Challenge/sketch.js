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
let coinCount = 0;

// timer variables
let minutes = 0;
let seconds = 0;
let centiSeconds = 0;

function setup() {

  width = windowWidth;
  height = windowHeight;
  x = width/2;
  y = height - radius;

  setInterval(timeSeconds, 1000);
  setInterval(timeCentiSeconds, 10);

  platforms = [
    // ground
    {x: 0, y: height, width: width, height: 20},
    // platforms middle
    {x: 855, y: height/2 + 300, width: 200, height: 20},
    {x: 855, y: height/2 + 100, width: 200, height: 20},
    {x: 855, y: height/2 - 330, width: 200, height: 20},
    // platforms left
    {x: 305, y: height/2 + 180, width: 200, height: 20},
    {x: 15, y: height/2, width: 200, height: 20},
    {x: 175, y: height/2 - 200, width: 200, height: 20},
    // platforms right
    {x: 1405, y: height/2, width: 200, height: 20},
    {x: 1405, y: height/2 - 200, width: 200, height: 20}
  ];

  coins = [
    // coin middle
    {x: 955, y: height/2 + 75, width: 50, height: 50},
    {x: 955, y: height/2 - 355, width: 50, height: 50},
    // coin left
    {x: 275, y: height/2 - 225, width: 50, height: 50}
  ];

  createCanvas(width, height);
};

// called every frame by p5.js
function draw() {

  // calling all functions that need to be called
  drawObjects();
  detectCoins();
  timeMinutes();

  // coin counter text
  fill(0, 0, 0);
  textSize(16);
  text("coins: " + coinCount + "/3", 3, 15);

  // timer text
    text(minutes + ":" + seconds + ":" + centiSeconds, 3, 30);

  // jumping
  if (touch && keyIsPressed && keyCode == UP_ARROW) {
    jump = true;
    touch = false;
    yv = -12;
  };

  if (jump) {
    jump = false;
  } else {
    touch = detectPlatforms();
  };

  // stay on sides and top
  if (x > width - radius) {
    x = width - radius;
    xv = 0;
  } else if (x < 0 + radius) {
    x = 0 + radius;
    xv = 0;
  } else if (y < 0 + radius) {
    y = 0 + radius;
    yv = 0;
  };

  // gravity
  yv = yv + gravity;
  y = y + yv;

  // update x position
  x = x + xv;
};

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

  // draw coins
  coins.forEach(function(coin) {
    fill(218,165,32);
    ellipse(coin.x, coin.y, coin.width, coin.height);
  });
};

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
          };
          return true;
        };
  };
  return false;
};

// coin detection
function detectCoins() {
  for (let coin of coins) {
    if (x >= coin.x - coin.width/2 - radius && x <= coin.x + coin.width/2 + radius
        && y >= coin.y - coin.height/2 - radius && y <= coin.y + coin.height/2 + radius) {

          coin.x = 10000;
          coin.y = 10000;
          coinCount ++;
        };
  };
};

// timer
function timeMinutes() {
  if (seconds == 60) {
    minutes = 1;
    seconds = 0;
  };
};

function timeSeconds() {
  if (coinCount < 3) {
    seconds ++;
    centiSeconds = 0;
  };
};

function timeCentiSeconds() {
  if (coinCount < 3) {
    centiSeconds ++;
  };
};

// key events
function keyPressed() {

  if (keyCode == RIGHT_ARROW) {
    xv = 4.5;
  } else if (keyCode == LEFT_ARROW) {
    xv = -4.5;
  };
};

function keyReleased() {

  if (keyCode == RIGHT_ARROW) {
    xv = 0;
  } else if (keyCode == LEFT_ARROW) {
    xv = 0;
  };
};
