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
let levels = [];
let coinCount = 0;
let level = 0;

// timer variables
let time = 0;
let stopped = false;

function setup() {

  width = windowWidth;
  height = windowHeight;
  x = width/2;
  y = height - radius;

  levels[0] = {
    platforms: [

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
      {x: 1355, y: height/2, width: 200, height: 20},
      {x: 1355, y: height/2 - 200, width: 200, height: 20}
    ],
    coins: [

      // coins middle
      {x: 955, y: height/2 + 75, width: 50, height: 50},
      {x: 955, y: height/2 - 355, width: 50, height: 50},

      // coins left
      {x: 275, y: height/2 - 225, width: 50, height: 50}
    ]
  };

  levels[1] = {
    platforms: [

      // ground
      {x: 0, y: height, width: width, height: 20},

      // platforms middle
      {x: 855, y: height/2 + 300, width: 200, height: 20},
      {x: 855, y: height/2 + 180, width: 200, height: 20},
      {x: 855, y: height/2 - 40, width: 200, height: 20},

      // platforms left
      {x: 355, y: height/2 - 140, width: 200, height: 20},
      {x: 355, y: height/2 - 260, width: 200, height: 20},
      {x: 5, y: height/2 - 400, width: 200, height: 20},

      // platforms right
      {x: 1405, y: height/2 - 200, width: 200, height: 20},
      {x: 1405, y: height/2 - 80, width: 200, height: 20}
    ],
    coins: [

      // coins middle
      {x: 955, y: height/2 - 65, width: 50, height: 50},

      // coins left
      {x: 105, y: height/2 - 425, width: 50, height: 50},

      // coins right
      {x: 1505, y: height/2 - 225, width: 50, height: 50}
    ]
  };

  levels[2] = {
    platforms: [

      // ground
      {x: 0, y: height, width: width, height: 20},

      // platforms middle
      {x: 855, y: height/2 + 260, width: 200, height: 20},
      {x: 855, y: height/2 + 150, width: 200, height: 20},
      {x: 855, y: height/2 - 270, width: 200, height: 20},
      {x: 855, y: height/2 - 370, width: 200, height: 20},

      // platforms left
      {x: 305, y: height/2, width: 200, height: 20},
      {x: 305, y: height/2 - 110, width: 200, height: 20},

      // platforms right
      {x: 1305, y: height/2 - 60, width: 200, height: 20},
      {x: 1715, y: height/2 - 280, width: 200, height: 20}
    ],
    coins: [

      // coins left
      {x: 405, y: height/2 - 135, width: 50, height: 50},

      // coins right
      {x: 1815, y: height/2 - 305, width: 50, height: 50},

      // coins middle
      {x: 955, y: height/2 - 395, width: 50, height: 50}
    ]
  };

  createCanvas(width, height);
};

// called every frame by p5.js
function draw() {

  drawObjects();
  detectCoins();
  keyEvents();

  // coin counter text
  fill(0, 0, 0);
  textSize(16);
  text("coins: " + coinCount, 3, 30);

  // updating timer
  if (!stopped) {
    time = millis();
  }
  drawTime();

  // all coins of level collected
  if (levels[level].coins.length == 0) {
    if (levels.length == level+1) {
      // stop timer
      stopped = true;
    } else {
      // reset x and y position and increment level
      y = height - radius;
      x = 955;
      level++;
    }
  }

  // level text
  text("level: " + (level+1), 3, 15);

  // jumping
  if (touch && keyIsDown(UP_ARROW)) {
    jump = true;
    touch = false;
    yv = -12;
  }

  if (jump) {
    jump = false;
  } else {
    touch = detectPlatforms();
  }

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
  background(100);
  fill(255, 236, 0);

  // draw player
  fill(255, 255, 255);
  rect(x - radius, y - radius, radius * 2, radius * 2, 15);
  fill(0, 0, 0);

  // draw platforms and coins
  fill(0);

  // draw platforms for level
  levels[level].platforms.forEach(function(platform) {
    rect(platform.x, platform.y, platform.width, platform.height, 5);
  });

  // draw coins for level
  levels[level].coins.forEach(function(coin) {
    fill(218,165,32);
    ellipse(coin.x, coin.y, coin.width, coin.height);
  });
};

// the function for drawing the timer text
function drawTime() {

  sec = time / 1000;
  min = int(sec / 60);
  sec = sec % 60;

  text(nf(min, 2, 0) + ":" + nf(sec, 2, 2), 3, 45);
}

// collison detection
// returns true if on touching ground or platform (on top) and false if not
function detectPlatforms() {

  for (let platform of levels[level].platforms) {

    if (x >= platform.x - radius && x <= platform.x + platform.width + radius
        && y >= platform.y - radius && y <= platform.y + platform.height + radius) {

          let dytop = y + radius - platform.y;
          let dxleft = x + radius - platform.x;
          let dybottom = platform.y + platform.height - (y - radius);
          let dxright = platform.x + platform.width - (x - radius);

          if (yv >= 0 && dxleft >= dytop && dxright >= dytop) {
            y = platform.y - radius;
            yv = 0;
            console.log("top")
            return true;
          } else if (yv <= 0 && dxleft >= dybottom && dxright >= dybottom) {
            y = platform.y + platform.height + radius;
            yv = 0;
            console.log("bottom")
            return false;
          } else if (xv >= 0 && dxleft < dxright) {
            x = platform.x - radius;
            console.log("left")
            xv = 0;
            return false;
          } else if (xv <= 0 && dxleft > dxright) {
            x = platform.x + platform.width + radius;
            xv = 0;
            console.log("right")
            return false;
          } else {
            // should NEVER happen
            console.log("no colllison!")
          }
    }
  }
  return false;
}

// coin detection
function detectCoins() {

  levels[level].coins.forEach(function(coin, index) {

    if (x >= coin.x - coin.width/2 - radius && x <= coin.x + coin.width/2 + radius
        && y >= coin.y - coin.height/2 - radius && y <= coin.y + coin.height/2 + radius) {

          // remove object from array
          levels[level].coins.splice(index, 1)
          coinCount ++;
    }
  })
}

// key events
function keyEvents() {

  if (keyIsDown(RIGHT_ARROW)) {
    xv = 4.5;
  } else if (keyIsDown(LEFT_ARROW)) {
    xv = -4.5;
  } else {
    xv = 0;
  }
}