const res = 400;
const cellSize = 20;
const dim = res / cellSize;
const cells = [];

function setup() {
  createCanvas(res, res);
  frameRate(10);

  for (let i = 0; i < dim * dim; i++) {
    cells.push({
      alive: false,
    });
  }

  cells[188].alive = true;
  cells[189].alive = true;
  cells[190].alive = true;
  cells[170].alive = true;
  cells[149].alive = true;
}

function draw() {
  background(200);
  let updates = [];
  for (let y = 0; y < dim; y++) {
    for (let x = 0; x < dim; x++) {
      let cell = getCell(x, y);
      drawCell(cell, x, y);
      let cellUpdate = updateCell(cell, x, y);
      if (cellUpdate) {
        updates.push(cellUpdate);
      }
    }
  }

  updates.forEach((u) => {
    getCell(u.x, u.y).alive = u.status;
  });
}

function mouseClicked() {
  wakeCell(mouseX, mouseY);
}

function wakeCell(mouseX, mouseY) {
  if (mouseX > res || mouseY > res) return;
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  let cell = getCell(x, y);
  cell.alive = !cell.alive;
}

function getIndex(x, y) {
  return x + y * dim;
}

function getCell(x, y) {
  return cells[x + y * dim];
}

function drawCell(cell, x, y) {
  noStroke();
  if (cell.alive) {
    fill(255);
  } else {
    noFill();
  }
  rect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function updateCell(cell, x, y) {
  let originalStatus = cell.alive;
  neighbors = [
    getCell(x - 1, y - 1),
    getCell(x, y - 1),
    getCell(x + 1, y - 1),
    getCell(x - 1, y),
    //		getCell(x    , y    ),
    getCell(x + 1, y),
    getCell(x - 1, y + 1),
    getCell(x, y + 1),
    getCell(x + 1, y + 1),
  ];

  let neighborsAlive = neighbors.filter((n) => n && n.alive).length;

  /*   if (!cell.alive && neighborsAlive == 3) {
    cell.alive = true;
  } else if (cell.alive && neighborsAlive < 2) {
    cell.alive = false;
  } else if (cell.alive && neighborsAlive > 3) {
    cell.alive = false;
  } else if (cell.alive && (neighborsAlive == 2 || neighborsAlive == 3)) {
    cell.alive = true;
  } */
  let status = false;

  if (!cell.alive && neighborsAlive == 3) {
    status = true;
  } else if (cell.alive && neighborsAlive < 2) {
    status = false;
  } else if (cell.alive && neighborsAlive >= 4) {
    status = false;
  } else if (cell.alive && (neighborsAlive == 2 || neighborsAlive == 3)) {
    status = true;
  }

  if (originalStatus != status) {
    return { x, y, status };
  }
}
