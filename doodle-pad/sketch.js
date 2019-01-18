/* Hi guys, in this (Doodle Pad) program you can draw whatever you want!!
Hope you enjoy! ✨*/

// Variables
let strokeColor;
let sWS;
let doodle;
let rectmode;
let rectstartx;
let rectstarty;

function setup() {

  noCursor();

  strokeColor = color(0, 0, 0);
  rectmode = false;
  strokeWeight(1);

  let cnv = createCanvas(windowWidth/2, 600);

  doodle = createGraphics(windowWidth/2, 600);

  //Buttons
  let buttons = document.querySelectorAll('button');
  for (let btn of buttons) {
    btn.onclick = function(e) {
      if (this.id == "eraseall") {
        doodle.fill("white");
        doodle.stroke(255);
        doodle.rect(0, 0, windowWidth/2, 600);
      } else {
          strokeColor = this.id;
      }
    }
    btn.style = "Background: " + btn.id
  }

    //Toggles
    let tgl = document.getElementById('rect');
    tgl.onclick = function () {
      if (tgl.checked) {
        rectmode = true;
      } else {
        rectmode = false;
      }
    }
}

// Drawing
function draw() {

  sWS = Number(document.getElementById('sWS').value);
  document.getElementById('sw').textContent = "Width:" + sWS;

  background(255);
  doodle.stroke(strokeColor);

  if (!rectmode && mouseIsPressed) {
    doodle.strokeWeight(sWS);
    doodle.line(mouseX, mouseY, pmouseX, pmouseY);
  }

  image(doodle, 0, 0);

  // Cursor
  fill(strokeColor);
  if (rectmode) {
    rect(mouseX-sWS/2, mouseY-sWS/2, sWS, sWS);
  } else {
      ellipse(mouseX, mouseY, sWS);
  }
}

function mousePressed() {

  if (rectmode) {

    rectstartx = mouseX;
    rectstarty = mouseY;

  }

}

function mouseReleased() {


  if (rectmode) {
    doodle.fill(strokeColor);
    doodle.rect(rectstartx, rectstarty, mouseX - rectstartx, mouseY - rectstarty);
  }

}
