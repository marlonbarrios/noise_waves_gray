let canvas;
let p;
let button;

let dragging = false;
let minFrequency = 0.5;
let maxFrequency = 2;
let minAmplitude = 0.05;
let maxAmplitude = 0.5;
let amplitude;
let frequency;
let bgColor;

// Included in index.html
// This is an alternative to p5.js builtin 'noise' function,
// It provides 4D noise and returns a value between -1 and 1
const simplex = new SimplexNoise();



function setup() {

  mouseX = width /2;
  mouseY = height /2;
 
  //template for canvas while printing and exporting/exhition on web/minimal
  canvas = createCanvas(1024, 1024); // will export as 512x512
  canvas.style("margin", "auto");
  canvas.style("margin-top", "5%");
  canvas.style("display", "flex");
  canvas.style("justify-content", "center");
  canvas.style("align-items", "center");
  canvas.style("border-radius", "10px");
  canvas.style("position", "relative");
  canvas.style("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
  canvas.style("zoom", "0.5");
  canvas.style('dpi', '300');
  canvas.style('bleed', '1/8');
  //noCursor();

//credits
  createP("'I have waves...'");
  createP("Move the cursor on the canvas to change the frequency and the amplitude of the waves" );
  createP("Press 's' to save a png image");
  var link =createA("https://marlonbarrios.github.io/", "Programmed by Marlon Barrios Solano");

  createElement('title', 'I have waves...')

  var allPs = selectAll("p")
  for (var i = 0; i < allPs.length; i++) {
    allPs[i].style("font-family", "Helvetica");
    allPs[i].style("justify-content", "center");
    allPs[i].style("align-items", "center");
    allPs[i].style("position", "relative");
    allPs[i].style("text-align", "center");
    allPs[i].style("display", "flex");
    allPs[i].style("font-size", "15px");
  }

  link.style("font-family", "Helvetica");
  link.style("justify-content", "center");
  link.style("align-items", "center");
  link.style("position", "relative");
  link.style("text-align", "center");
  link.style("display", "flex");
  link.style("font-size", "15px");
  link.style("color", "black");
  link.style("text-decoration", "none");




  
}



function draw() {
  //clear();
  background(255);

  const frequency = lerp(minFrequency, maxFrequency, mouseX/width );
  const amplitude = lerp(minAmplitude, maxAmplitude, mouseY/height);
  
  const dim = Math.min(width, height);
  
noFill();
stroke(0);
strokeWeight(dim * 0.0095);
  
  const time = millis()/1000;
  const rows = 10;

  // Draw each line
  for (let y = 0; y < rows; y++) {
    // Determine the Y position of the line
    const v = rows <= 1 ? 0.5 : y / (rows - 1);
    const py = v * height;
    drawNoiseLine({
      v,
      start: [ 0, py ],
      end: [ width, py ],
      amplitude: amplitude * height,
      frequency,
      time: time * 0.5,
      steps: 150
    });
  }
}


function drawNoiseLine (opt = {}) {
  const {
    v,
    start,
    end,
    steps = 10,
    frequency = 1,
    time = 0,
    amplitude = 1
  } = opt;
  
  const [ xStart, yStart ] = start;
  const [ xEnd, yEnd ] = end;

  // Create a line by walking N steps and interpolating
  // from start to end point at each interval
  beginShape();
  for (let i = 0; i < steps; i++) {
    // Get interpolation factor between 0..1
    const t = steps <= 1 ? 0.5 : i / (steps - 1);

    // Interpolate X position
    const x = lerp(xStart, xEnd, t);
    
    // Interpolate Y position
    let y = lerp(yStart, yEnd, t);
    
    // Offset Y position by noise
    y += (simplex.noise3D(t * frequency + time, v * frequency, time)) * amplitude;
    
    // Place vertex
    vertex(x, y);
  }
  endShape();
}



function windowResized() {
  const windowWidth = window.innerWidth;
  if (windowWidth < 900) {
    resizeCanvas(windowWidth * 0.85, windowWidth* 0.85);
    canvas.style("margin", "auto");
    canvas.style("margin-top", "10%");
  
  } else {
      resizeCanvas(windowWidth, windowWidth);
  }
  
}

function keyPressed() {
  let m = month();
  let d = day();
  let y = year();
  let t = hour() + ':' + minute();
  if (key == 'S' || key == 's') 
    saveCanvas(canvas, 'canvas' + m + d + y + t , 'png');
}
  
    

