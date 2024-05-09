const PARTICLE_SIZE = 5;
const RESOLUTION = 4;
const MAX_FORCE = 10;
const MIN_FORCE = 0;
let storyText = [];
let img;
let particles = [];

function preload() {
  img = loadImage('victims.jpg');
  storyText = loadStrings('texas_shooting.txt');
}

function setup() {
  createCanvas(img.width, img.height);
  spawnParticles();
}

function draw() {
  background(0);
  fill(255);
  textSize(40);
  textAlign(LEFT, TOP);
  for (let i = 0; i < storyText.length; i++) {
    text(storyText[i], 20, 20 + i * 100, width - 70);
  }

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
}

function spawnParticles() {
  for (let i = 0; i < img.width; i += RESOLUTION) { // Use img.width instead of width
    for (let j = 0; j < img.height; j += RESOLUTION) { // Use img.height instead of height
      let x = (i / img.width) * width;
      let y = (j / img.height) * height;

      const color = img.get(i, j);
      particles.push(new Particle(x, y, color)); // Pass x, y instead of i, j
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;

    this.color = color;
  }

  update() {
    let mouseVector = createVector(mouseX, mouseY);
    let currentVector = createVector(this.x, this.y);
    let targetVector = createVector(this.targetX, this.targetY);
    //make it return back

    let totalForce = createVector(0, 0); // Initialize totalForce

    let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
    let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);

    let distanceToTarget = fromParticleToTarget.mag();
    let distanceToMouse = fromMouseToParticle.mag();



    if (distanceToMouse < 100) {
      let repulsionForce = map(distanceToMouse, 0, 100, MAX_FORCE, MIN_FORCE);
      fromMouseToParticle.setMag(repulsionForce);
      totalForce.add(fromMouseToParticle);
    }

    if (distanceToMouse > 100) {
      let attractionForce = map(distanceToTarget, 0, 100, MIN_FORCE, MAX_FORCE);
      fromParticleToTarget.setMag(attractionForce);
      totalForce.add(fromParticleToTarget);
    }



    this.x += totalForce.x;
    this.y += totalForce.y;
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, PARTICLE_SIZE);
  }
}
