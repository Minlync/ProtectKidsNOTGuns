let greybgcolor;
let coverOneImage, page2Aim, roseforpg2, Bullet, Victims, img;
let currentScene;
const PARTICLE_SIZE = 5;
const RESOLUTION = 4;
const MAX_FORCE = 10;
const MIN_FORCE = 0;
let storyText = [];
let particles = [];
let shoot,protectkids,autoText,pg6Img;

function preload() {
  coverOneImage = loadImage("image/cover.jpg");
  page2Aim = loadImage("image/aim2.png");
  heartforpg2 = loadImage("image/heart.png");
  Bullet = loadImage("image/bulle.png");
  Victims = loadImage("image/victims.jpg");
  img = loadImage('image/victims.jpg');
  storyText = loadStrings('texas_shooting.txt');
  shoot = loadSound('sound/gunshot.ogg');
  protectkids = loadImage ('image/page5.jpeg');
  autoText = loadStrings ('page6.txt');
  pg6Img = loadImage('image/newspaper.png')
}

function setup() {
  createCanvas(800, 600);
  greybgcolor = color(20, 20, 20);
  currentScene = new CoverOne(coverOneImage);
  spawnParticles(); // Initialize particles
}

function draw() {
  background(greybgcolor);
  currentScene.display();
  if (currentScene instanceof PageFive) {
    currentScene.update();
  }
}

function spawnParticles() {
  for (let i = 0; i < img.width; i += RESOLUTION) {
    for (let j = 0; j < img.height; j += RESOLUTION) {
      let x = (i / img.width) * width;
      let y = (j / img.height) * height;
      let col = img.get(i, j);
      particles.push(new Particle(x, y, col));
    }
  }
}

class CoverOne {
  constructor(img) {
    this.img = img;
    this.buttonColor = color(191, 63, 63);
    this.buttonHoverColor = color(242, 184, 184);
    this.button = { x: width / 2 - 50, y: height - 80, w: 100, h: 40 };
  }

  display() {
    // let x = (width - 600) / 2;
    // let y = (height - 480 - 100) / 2;
    let x = 0;
    let y = 0;
    image(this.img, x, y, 800, 600);
    fill(this.buttonColor);
    noStroke();
    rect(this.button.x, this.button.y, this.button.w, this.button.h);
    fill(255);
    textSize(25);
    text("START", this.button.x + 10, this.button.y + 28);
  }

  mousePressed() {
    if (mouseX > this.button.x && mouseX < this.button.x + this.button.w &&
      mouseY > this.button.y && mouseY < this.button.y + this.button.h) {
      currentScene = new PageTwo();
    }
  }
}

class PageTwo {
  constructor() {
    this.aim = page2Aim;
    this.heart = heartforpg2;
    this.bullet = Bullet;
    // to replace my mouse
  }

  display() {
    fill(255);
    textSize(45);
    // text("Welcome to Page two", 150, 450);
    for (let i = 0; i < 3; i++) {
      let offsetX = i * 180; // spacing
      let scaledRoseWidth = 180; // orginal size
      let scaledRoseHeight = 180; // orginal size

      // hover effect
      if (mouseX >= 100 + offsetX && mouseX <= 100 + offsetX + scaledRoseWidth &&
        mouseY >= 200 && mouseY <= 200 + scaledRoseHeight) {
        scaledRoseWidth = 220; // Increase the width
        scaledRoseHeight = 220; // Increase the height
        this.roseHovered = true;  // mouse is hover rose
      } else {
        this.roseHovered = false; // Mouse is not over the rose
      }
      image(this.heart, 100 + offsetX, 200, scaledRoseWidth, scaledRoseHeight); // Adjust size
    }
    let constrainedMouseX = constrain(mouseX - 150, 0, 600);
    let constrainedMouseY = constrain(mouseY - 150, 0, 600);
    image(this.aim, constrainedMouseX, constrainedMouseY, 300, 300);
    for (let i = 0; i < 3; i++) {
      let offsetX = i * 80;
      image(this.bullet, 550 + offsetX, 40, 60, 30);
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
    let totalForce = createVector(0, 0);

    let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
    let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);

    let distanceToTarget = fromParticleToTarget.mag();
    let distanceToMouse = fromMouseToParticle.mag();

    if (distanceToMouse < 150) {
      let repulsionForce = map(distanceToMouse, 0, 200, MAX_FORCE, MIN_FORCE);
      fromMouseToParticle.setMag(repulsionForce);
      totalForce.add(fromMouseToParticle);
    }

    if (distanceToMouse > 250) {
      let attractionForce = map(distanceToTarget, 10, 200, MIN_FORCE, MAX_FORCE);
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

class PageThree {
  constructor() {
    this.particles = particles;
  }

  display() {
    background(0);
    fill(255);
    // txtFont('storyfont');
    textSize(20);
    for (let i = 0; i < storyText.length; i++) {
      text(storyText[i], 80, height / 2 + i * 100, width - 150);
    }
    this.particles.forEach((particle) => {

      particle.update();
      particle.draw();

    });
  }
}

//back into shooting agian
class PageFour {

  constructor() {
    this.aim = page2Aim;
    this.heart = heartforpg2;
    this.bullet = Bullet;
    // to replace my mouse
  }

  display() {
    fill(255);
    textSize(45);
    // text("Welcome to Page two", 150, 450);
    for (let i = 0; i < 2; i++) {
      let offsetX = i * 180; // spacing
      let scaledRoseWidth = 180; // orginal size
      let scaledRoseHeight = 180; // orginal size

      // hover effect
      if (mouseX >= 100 + offsetX && mouseX <= 100 + offsetX + scaledRoseWidth &&
        mouseY >= 200 && mouseY <= 200 + scaledRoseHeight) {
        scaledRoseWidth = 220; // Increase the width
        scaledRoseHeight = 220; // Increase the height
        this.roseHovered = true;  // mouse is hover rose
      } else {
        this.roseHovered = false; // Mouse is not over the rose
      }
      image(this.heart, 200 + offsetX, 200, scaledRoseWidth, scaledRoseHeight); // Adjust size
    }
    let constrainedMouseX = constrain(mouseX - 150, 0, 600);
    let constrainedMouseY = constrain(mouseY - 150, 0, 600);
    image(this.aim, constrainedMouseX, constrainedMouseY, 300, 300);
    //bullets
    for (let i = 0; i < 2; i++) {
      let offsetX = i * 80;
      image(this.bullet, 600 + offsetX, 40, 60, 30);
    }
  }

}

// data support source: National Center for Education Statistics

class PageFive {
  constructor() {
    this.textx = 50;
    this.texty = 50;
    this.datax = 120;
    this.rectColor = 255;
    this.rectWidth1 = 0;
    this.rectWidth2 = 0;
    this.rectWidth3 = 0;
    this.rectWidth4 = 100;
    this.rectWidth5 = 100;
    this.rectWidth6 = 100;
    this.rectWidth7 = 100;
    this.rectWidth8 = 100;
    this.rectWidth9 = 100;
    this.rectWidth10 = 0;
    this.rectWidth11 = 0;
    this.rectWidth12 = 0;
    this.rectHeight = 25;
    this.animationSpeed = 1;
    this.startAnimation = true;
    this.background = protectkids;
  }

  display() {

    // here is the data of gunshoots in schools

    fill(this.rectColor);
    image(this.background, 0,0, 800, 600);
    noStroke();
    textSize(18);
    text("There have been 783 shootings with deaths or injuries at elementary and cecondary schools since 2010", this.textx, 20, 600);
    
    fill(this.rectColor);
    textSize(18);
    text("2010-11", this.datax - 80, 100);
    rect(this.datax, 80, this.rectWidth1, this.rectHeight);

    textSize(18);
    text("2011-12", this.datax - 80, 115 + this.rectHeight);
    rect(this.datax, 80 + 40, this.rectWidth2, this.rectHeight);

    fill(this.rectColor);
    textSize(18);
    text("2012-13", this.datax - 80, 155 + this.rectHeight);
    rect(this.datax, 80 * 2, this.rectWidth3, this.rectHeight);

    fill(this.rectColor);
    textSize(18);
    text("2013-14", this.datax - 80, 195 + this.rectHeight);
    rect(this.datax, 80 * 2 + 40, this.rectWidth4, this.rectHeight);

    //rect 5 data
    textSize(18);
    text("2014-15", this.datax - 80, 235 + this.rectHeight);
    rect(this.datax, 80 * 2 + 80, this.rectWidth5, this.rectHeight);

    //rect 6 data
    textSize(18);
    text("2015-16", this.datax - 80, 275 + this.rectHeight);
    rect(this.datax, 80 * 2 + 120, this.rectWidth6, this.rectHeight);

    //rect 7 data
    textSize(18);
    text("2016-17", this.datax - 80, 315 + this.rectHeight);
    rect(this.datax, 80 * 2 + 160, this.rectWidth7, this.rectHeight);
    //rect 8 data

    textSize(18);
    text("2017-18", this.datax - 80, 353 + this.rectHeight);
    rect(this.datax, 80 * 2 + 200, this.rectWidth8, this.rectHeight);

    //rect 9 data

    textSize(18);
    text("2018-19", this.datax - 80, 393 + this.rectHeight);
    rect(this.datax, 80 * 2 + 200 + 40, this.rectWidth9, this.rectHeight);

    //rect 10 data

    textSize(18);
    text("2019-20", this.datax - 80, 433 + this.rectHeight);
    rect(this.datax, 80 * 2 + 200 + 80, this.rectWidth10, this.rectHeight);

    //rect 11 data

    textSize(18);
    text("2020-21", this.datax - 80, 473 + this.rectHeight);
    rect(this.datax, 80 * 2 + 200 + 80 + 40, this.rectWidth11, this.rectHeight);

    fill(255, 0, 232);
    textSize(18);
    text("2021-23", this.datax - 80, 510 + this.rectHeight);
    rect(this.datax, 80 + 200 + 80 + 160, this.rectWidth12, this.rectHeight);
   

    
  }

  update() {
    if (this.startAnimation) {
      // animate the rectangle width
      if (this.rectWidth1 < 100) {
        this.rectWidth1 += this.animationSpeed;
      } else {
        this.rectWidth1 = 105;
      }


      if (this.rectWidth2 < 50) {
        this.rectWidth2 += this.animationSpeed;
      } else {
        this.rectWidth2 = 55;
      }


      if (this.rectWidth3 < 80) {
        this.rectWidth3 += this.animationSpeed;
      } else {
        this.rectWidth3 = 85;
      }


      if (this.rectWidth4 < 110) {
        this.rectWidth4 += this.animationSpeed;
      } else {
        this.rectWidth4 = 115;
      }

      if (this.rectWidth5 < 160) {
        this.rectWidth5 += this.animationSpeed;

      } else {
        this.rectWidth5 = 165;
      }

      if (this.rectWidth6 < 177) {
        this.rectWidth6 += this.animationSpeed;
      } else {
        this.rectWidth6 = 187;
      }

      if (this.rectWidth7 < 105) {
        this.rectWidth7 += this.animationSpeed;
      } else {
        this.rectWidth7 = 110;
      }

      if (this.rectWidth8 < 140) {
        this.rectWidth8 += this.animationSpeed;
      } else {
        this.rectWidth = 145;
      }


    } if (this.rectWidth9 < 245) {
      this.rectWidth9 += this.animationSpeed;
    } else {
      this.rectWidth = 255;
    }

    if (this.rectWidth10 < 345) {
      this.rectWidth10 += this.animationSpeed;
    } else {
      this.rectWidth10 = 355;
    }

    if (this.rectWidth11 < 385) {
      this.rectWidth10 += this.animationSpeed;
    } else {
      this.rectWidth10 = 390;
    }

    if (this.rectWidth11 < 440) {
      this.rectWidth11 += this.animationSpeed;
    } else {
      this.rectWidth11 = 441;
    }

    if (this.rectWidth12 < 555) {
      this.rectWidth12 += this.animationSpeed;
    } else {
      this.rectWidth12 = 556;
    }
  }

}

// auto typing script for story telling
//resouce:https://everytownresearch.org/maps/gunfire-on-school-grounds/
class PageSix {
  constructor() { 

  this.new1 = pg6Img;
  this.string = 'When it comes to how American children are exposed to gun violence, gunfire at schools is just the tip of the iceberg every year, nearly 4,000 children and teens are shot and killed and 15,000 more are shot and injured. An estimated 3 million children in the US are exposed to shootings per year' ;
  
  //  this.string = autoText;

  this.currentCharacter = 0;
 

  }

  display() {


    let currentString = this.string.substring(0, this.currentCharacter);
    let fade;
    
    push();
    fill(255);
    noStroke();
    textSize(18);

    text(currentString, 50, 400, 700);
    pop();
    
    
    // make it draw
    this.currentCharacter += 0.2;

    if (this.currentCharacter > this.string.length) {
      this.currentCharacter = this.string.length;
    }

    // newspape fadein fadeout
    image(this.new1, 0, 0, img.width, img.heigh);
  }
}



// switch

function mousePressed() {
  if (currentScene instanceof CoverOne) {
    currentScene.mousePressed();
  } else if (currentScene instanceof PageTwo) {
    shoot.play();
    currentScene = new PageThree();
  } else if (currentScene instanceof PageThree) {
    currentScene = new PageFour();
  } else if (currentScene instanceof PageFour) {
    shoot.play();
    currentScene = new PageFive();
  }else if (currentScene instanceof PageFive) {
    currentScene = new PageSix();
    currentScene.startAnimation = true;

  }
}