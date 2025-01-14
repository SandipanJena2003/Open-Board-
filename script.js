const canvas = document.querySelector("#canvas");
const download = document.querySelector("#download");
const ctx = canvas.getContext("2d");
let points = [];
let redoPoints = [];
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  redraw();
});

ctx.lineWidth = 10;

let isPenDown = false;
canvas.addEventListener("mousedown", function (e) {
  let { top } = canvas.getBoundingClientRect();
  let x = e.clientX;
  let y = e.clientY - top;
  let point = {
    id: "md",
    x: x,
    y: y,
    color: ctx.strokeStyle,
    width: ctx.lineWidth,
  };
  points.push(point);
  ctx.beginPath();
  ctx.moveTo(x, y);
  isPenDown = true;

  socket.emit("md" , point);

});

canvas.addEventListener("mousemove", function (e) {
  if (isPenDown == true) {
    let { top } = canvas.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY - top;
    let point = {
      id: "mm",
      x: x,
      y: y,
      color: ctx.strokeStyle,
      width: ctx.lineWidth,
    };
    points.push(point);
    ctx.lineTo(x, y);
    ctx.stroke();
    socket.emit("mm" , point);
  }
});

canvas.addEventListener("mouseup", function (e) {
  isPenDown = false;
  ctx.closePath();
});

function redraw() {
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    ctx.lineWidth = point.width;
    ctx.strokeStyle = point.color;
    if (point.id == "md") {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }
}

function undoPoints() {
  let redoPoint = [];
  // 1. remove point from points
  if (points.length >= 2) {
    let idx = points.length - 1;
    while (points[idx].id != "md") {
      redoPoint.unshift(points.pop());
      idx--;
    }
    redoPoint.unshift(points.pop());
  }
  redoPoints.push(redoPoint);
  // 2. clear canvas
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // 3. redraw points
  redraw();
}

function redoLines() {
  if (redoPoints.length >= 1) {
    let redoPoint = redoPoints.pop();
    for (let i = 0; i < redoPoint.length; i++) {
      points.push(redoPoint[i]);
    }
    // 2. clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // 3. redraw points
    redraw();
  }
}
download.addEventListener("click", (e) => {

  let url = canvas.toDataURL();

  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
})

socket.on("beginPath", (data) => {
  //data-> data from server
  beginPath(data);
})

socket.on("drawStroke", (data) => {
  //data --> from the server
  drawStroke(data);
})

socket.on("undoRedoCanvas", (data) => {
  //data --> from the server
  undoRedoCanvas(data);
})
