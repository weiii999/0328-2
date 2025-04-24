let seaweed = [];
const seaweedThickness = 30; // 增加水草的粗細
let bgColor; // 用於儲存背景顏色

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(random(255), random(255), random(255)); // 初始化隨機背景顏色

  // Initialize seaweed positions
  for (let i = 0; i < 200; i++) { // 增加水草數量到 200
    seaweed.push({
      x: random(width), // 隨機水平位置
      height: random(100, 300), // 隨機高度
      offset: random(1000), // Perlin noise 偏移量
      color: color(random(50, 255), random(50, 255), random(50, 255)), // 隨機繽紛顏色
    });
  }

  // Create an iframe in the center of the window
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw');
  iframe.style('border', 'none');
  iframe.size(windowWidth * 0.8, windowHeight * 0.8);
  iframe.position(windowWidth * 0.1, windowHeight * 0.1); // Center the iframe
}

function draw() {
  // 隨機改變背景顏色
  if (frameCount % 60 === 0) { // 每秒改變一次
    bgColor = color(random(255), random(255), random(255));
  }
  background(bgColor); // 設定背景顏色

  // Draw seaweed
  noStroke();
  for (let i = 0; i < seaweed.length; i++) {
    let sw = seaweed[i];
    fill(sw.color); // 使用每個水草的隨機顏色
    beginShape();
    for (let y = 0; y < sw.height; y += 10) {
      let xOffset = map(noise(sw.offset + y * 0.01, frameCount * 0.01), 0, 1, -seaweedThickness, seaweedThickness);
      vertex(sw.x + xOffset, height - y);
    }
    vertex(sw.x, height); // Bottom anchor point
    endShape(CLOSE);
  }

  // Update Perlin noise offset for animation
  for (let i = 0; i < seaweed.length; i++) {
    seaweed[i].offset += 0.01;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

