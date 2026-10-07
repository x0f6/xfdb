let mot = 'xfdb';
let cells = [];
let radius = 150, lift = 100;
let holder;
let bgCol, fgCol;

function readColors() {
  const s = getComputedStyle(document.documentElement);
  bgCol = s.getPropertyValue('--bg').trim();
  fgCol = s.getPropertyValue('--fg').trim();
}

function setup() {
  readColors();
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', readColors);
  holder = document.getElementById('holder');
  let cnv = createCanvas(holder.offsetWidth, holder.offsetHeight);
  cnv.parent(holder);
  textSize(16);
  textFont('abc areal mono');
  buildGrid();
}

function buildGrid() {
  cells = [];
  let stepX = textWidth(mot) + 10;
  let stepY = textSize() * 1.2;
  for (let y = 10; y < height; y += stepY) {
    for (let x = 0; x < width; x += stepX) {
      cells.push({ x, y, v: 0 });
    }
  }
}

function draw() {
  background(bgCol);
  fill(fgCol);

  for (let c of cells) {
    let d = dist(mouseX, mouseY, c.x, c.y);
    let target = constrain(1 - d / radius, 0, 1);
    c.v = lerp(c.v, target, 0.15);
    text(mot, c.x, c.y - lift * c.v);
  }
}

function windowResized() {
  resizeCanvas(holder.offsetWidth, holder.offsetHeight);
  buildGrid();
}