let greybgcolor;
let coverOneImage, page2Aim, roseforpg2, Bullet, Victims, img;
let currentScene;
const PARTICLE_SIZE = 5;
const RESOLUTION = 4;
const MAX_FORCE = 10;
const MIN_FORCE = 0;
let storyText = [];
let particles = [];

function preload() {
    coverOneImage = loadImage("image/gunandrose.png"); 
    page2Aim = loadImage("image/aim.png");
    roseforpg2 = loadImage("image/rose2.png");
    Bullet = loadImage("image/bulle.png");
    Victims = loadImage("victims.jpg");
    img = loadImage('victims.jpg');
    storyText = loadStrings('texas_shooting.txt');
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
    if (currentScene instanceof PageFour) {
        currentScene.update();
    }
}

function mousePressed() {
    if (currentScene instanceof CoverOne) {
        currentScene.mousePressed();  
    } else if (currentScene instanceof PageTwo) {
        currentScene = new PageThree();
    } else if (currentScene instanceof PageThree){
        currentScene = new PageFour(); 
    } else if (currentScene instanceof PageFour){
        currentScene = new PageFive(); 
        currentScene.startAnimation = true; 
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
        this.button = {x: width / 2 - 50, y: height - 80, w: 100, h: 40};
    }

    display() {
        let x = (width - 600) / 2;
        let y = (height - 480 - 100) / 2;
        image(this.img, x, y, 600, 480); 
        fill(this.buttonColor);
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
        this.rose = roseforpg2;
        this.bullet = Bullet;
    }

    display() {
        fill(255);
        textSize(45);
        text("Welcome to Page two", 150, 450);
        for (let i = 0; i < 3; i++) { 
            let offsetX = i * 200; 
            image(this.rose, 200 + offsetX, 200, 200, 200);
        }
        let constrainedMouseX = constrain(mouseX, 0, 800 - 350);
        let constrainedMouseY = constrain(mouseY, 0, 600 - 450);
        image(this.aim, constrainedMouseX, constrainedMouseY, 650, 500);
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

class PageThree {
    constructor() {
        this.particles = particles;
    }

    display() {
        background(0);
       fill(255);
  textSize(40);
  
  for (let i = 0; i < storyText.length; i++ ){
  text(storyText[i], 20, 20 + i *100,width-70);
  }
        this.particles.forEach((particle) => {
          
            particle.update();
            particle.draw();
         
        });
    }
}

class PageFour {
    constructor() {
        this.textx = 50;
        this.texty = 50;
        this.datax = 120;
        this.rectColor = 255;
        this.rectWidth1 = 1;
        // Initialize other rectWidths
        this.startAnimation = false;
    }

    display() {
        // Display data
    }

    update() {
        if (this.startAnimation) {
            // Animate data visualization
        }
    }
}

class PageFive {
    constructor() {}

    display() {
        fill(255);
        noStroke();
        textSize(18);
        text("Page5", 20, 20, 700);
    }
}
   


// switch

