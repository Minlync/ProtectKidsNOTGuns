export class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.color = color;
  }

  update(mouseX, mouseY, MAX_FORCE, MIN_FORCE) {
    let mouseVector = createVector(mouseX, mouseY);
    let currentVector = createVector(this.x, this.y);
    let targetVector = createVector(this.targetX, this.targetY);

    let totalForce = createVector(0, 0);

    let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
    let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);

    let distanceToMouse = fromMouseToParticle.mag();
    let distanceToTarget = fromParticleToTarget.mag();

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

  draw(PARTICLE_SIZE) {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, PARTICLE_SIZE);
  }
}
