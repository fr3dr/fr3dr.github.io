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
let platforms2;
let platforms3;
let coins;
let coins2;
let coins3;
let coinCount = 0;
let level = 1;

// timer variables
let ms;
let sc;
let mn;
let msEnd;
let scEnd;
let mnEnd;

let stopTimerCall;

function setup() {

  width = windowWidth;
  height = windowHeight;
  x = width/2;
  y = height - radius;

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

  platforms2 = [

    // ground
    {x: 0, y: height, width: width, height: 20},

    // platforms middle
    {x: 855, y: height/2 + 300, width: 200, height: 20},
    {x: 855, y: height/2 + 180, width: 200, height: 20},
    {x: 855, y: height/2 - 40, width: 200, height: 20},

    // platforms left
    {x: 265, y: height/2 - 80, width: 200, height: 20},
    {x: 265, y: height/2 - 200, width: 200, height: 20},
    {x: 5, y: height/2 - 320, width: 200, height: 20},

    // platforms right
    {x: 1405, y: height/2 - 160, width: 200, height: 20},
    {x: 1405, y: height/2 - 80, width: 200, height: 20}
  ];

  platforms3 = [

    // ground
    {x: 0, y: height, width: width, height: 20},

    // platforms middle
    {x: 855, y: height/2 + 200, width: 200, height: 20},
    {x: 855, y: height/2 + 100, width: 200, height: 20},
    {x: 855, y: height/2 - 220, width: 200, height: 20},
    {x: 855, y: height/2 - 320, width: 200, height: 20},

    // platforms left
    {x: 235, y: height/2, width: 200, height: 20},
    {x: 235, y: height/2 - 100, width: 200, height: 20},

    // platforms right
    {x: 1385, y: height/2 - 60, width: 200, height: 20},
    {x: 1715, y: height/2 - 305, width: 200, height: 20}

  ];

  coins = [

    // coins middle
    {x: 955, y: height/2 + 75, width: 50, height: 50},
    {x: 955, y: height/2 - 355, width: 50, height: 50},

    // coins left
    {x: 275, y: height/2 - 225, width: 50, height: 50}
  ];

  coins2 = [

    // coins middle
    {x: 955, y: height/2 - 65, width: 50, height: 50},

    // coins left
    {x: 105, y: height/2 - 345, width: 50, height: 50},

    // coins right
    {x: 1505, y: height/2 - 105, width: 50, height: 50}
  ];

  coins3 = [

    // coins left
    {x: 335, y: height/2 - 125, width: 50, height: 50},

    // coins right
    {x: 1815, y: height/2 - 330, width: 50, height: 50},

    // coins middle
    {x: 955, y: height/2 - 345, width: 50, height: 50}
  ];

  createCanvas(width, height);
};

// called every frame by p5.js
function draw() {

  // calling all functions that need to be called
  drawObjects();
  detectCoins();

  // coin counter text
  fill(0, 0, 0);
  textSize(16);
  text("coins: " + coinCount, 3, 30);

  // timer stuff
  if (coinCount == 9 && !stopTimerCall) {
    stopTimer();
  } else if (coinCount == 9) {
    text(nf(mnEnd, 2, 0) + ":" + nf(scEnd, 2, 0) + ":" + nf(msEnd, 3, 0), 3, 45);
  };

  // reset x position after each level and changing level to ++
    if (coinCount == 0 && level == 0) {
      y = height - radius;
      x = 955;
      level ++;
    } else if (coinCount == 3 && level == 1) {
      y = height - radius;
      x = 955;
      level ++;
    } else if (coinCount == 6 && level == 2) {
      y = height - radius;
      x = 955;
      level ++;
    };

  // level text
    text("level: " + level, 3, 15);

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

  // draw platforms and coins
  fill(0);
  if (level == 1){

  // draw platforms for level 1
    platforms.forEach(function(platform) {
      rect(platform.x, platform.y, platform.width, platform.height, 5);
    });

  // draw coins for level 1
    coins.forEach(function(coin) {
      fill(218,165,32);
      ellipse(coin.x, coin.y, coin.width, coin.height);
    });
  } else if (level == 2) {

    // draw platforms for level 2
    platforms2.forEach(function(platform2) {
      rect(platform2.x, platform2.y, platform2.width, platform2.height, 5);
    });

    // draw coins for level 2
    coins2.forEach(function(coin2) {
      fill(218,165,32);
      ellipse(coin2.x, coin2.y, coin2.width, coin2.height);
    });
  } else if (level == 3) {

    // draw platforms for level 3
    platforms3.forEach(function(platform3) {
      rect(platform3.x, platform3.y, platform3.width, platform3.height, 5);
    });

    // draw coins for level 3
    coins3.forEach(function(coin3) {
      fill(218,165,32);
      ellipse(coin3.x, coin3.y, coin3.width, coin3.height);
    });
  };
};

// collison detection
function detectPlatforms() {
  if (level == 1) {

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
  } else if (level == 2) {

    for (let platform2 of platforms2) {

      if (x >= platform2.x - radius && x <= platform2.x + platform2.width + radius
          && y >= platform2.y - radius && y <= platform2.y + platform2.height + radius) {

            if (yv > 0 && y > platform2.y - radius) {

              y = platform2.y - radius;
              yv = 0;
              return gravity > 0;
            } else if (yv < 0 && y > platform2.height + radius) {

              y = platform2.y + platform2.height + radius;
              yv = 0;
              return gravity < 0;
            };
            return true;
      };
    };
      return false;
  } else if (level == 3) {

    for (let platform3 of platforms3) {

      if (x >= platform3.x - radius && x <= platform3.x + platform3.width + radius
        && y >= platform3.y - radius && y <= platform3.y + platform3.height + radius) {

          if (yv > 0 && y > platform3.y - radius) {

            y = platform3.y - radius;
            yv = 0;
            return gravity > 0;
          } else if (yv < 0 && y > platform3.height + radius) {

            y = platform3.y + platform3.height + radius;
            yv = 0;
            return gravity < 0;
          };
          return true;
      };
    };
  };
};

// coin detection
function detectCoins() {
  if (level == 1) {

    for (let coin of coins) {

      if (x >= coin.x - coin.width/2 - radius && x <= coin.x + coin.width/2 + radius
          && y >= coin.y - coin.height/2 - radius && y <= coin.y + coin.height/2 + radius) {
  
            coin.x = 10000;
            coin.y = 10000;
            coinCount ++;
      };
    };
  } else if (level == 2) {

    for (let coin2 of coins2) {

      if (x >= coin2.x - coin2.width/2 - radius && x <= coin2.x + coin2.width/2 + radius
          && y >= coin2.y - coin2.height/2 - radius && y <= coin2.y + coin2.height/2 + radius) {
  
            coin2.x = 10000;
            coin2.y = 10000;
            coinCount ++;
      };
    };
  } else if (level == 3) {

    for (let coin3 of coins3) {

      if (x >= coin3.x - coin3.width/2 - radius && x <= coin3.x + coin3.width/2 + radius
          && y >= coin3.y - coin3.height/2 - radius && y <= coin3.y + coin3.height/2 + radius) {
  
            coin3.x = 10000;
            coin3.y = 10000;
            coinCount ++;
      };
    };
  };
};

// stop timer
function stopTimer() {
  ms = millis();
  sc = ms / 1000;
  mn = sc / 60;
  stopTimerCall = true;
  mnEnd = int(mn);
  scEnd = (mn - mnEnd) * 60;
  msEnd = ms - (int(ms / 1000) * 1000);

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