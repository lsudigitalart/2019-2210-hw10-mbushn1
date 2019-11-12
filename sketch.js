
var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums =400;
var noiseScale = 10000;
let shape;

function preload() {
  shape = loadModel('model.obj');
}

function setup(){
	frameRate(60);
	createCanvas(windowWidth, windowHeight, WEBGL);
	//perspective(PI / 3.0, width / height, 0.1, 500);
	noStroke();
	translate(0,0,5000);
	background(75,225);
	
	for(var i = 0; i < nums; i++){
		particles_a[i] = new Particle(random(0, windowWidth),random(0,windowHeight),random(0,360));
		particles_b[i] = new Particle(random(0, windowWidth),random(0,windowHeight),random(0,360));
		particles_c[i] = new Particle(random(0, windowWidth),random(0,windowHeight),random(0,360));
	
		
	}
}

function draw(){
	
	directionalLight(300, 225, 500, windowWidth/2, windowHeight/2, 5);
	//smooth();
		for(var i = 0; i < nums; i++){
		var radius = map(i,0,nums,1,2);
		var alpha = map(i,0,nums,0,250);

		fill(random(0,225),random(0,225),random(0,225));
		particles_a[i].move();
		particles_a[i].display(radius);
		particles_a[i].display1(radius);
		particles_a[i].checkEdge();

		fill(random(0,225),random(0,225),random(0,225));
		particles_b[i].move();
		particles_b[i].display(radius);
		particles_b[i].display1(radius);
		particles_b[i].checkEdge();
	
		fill(random(0,225),random(0,225),random(0,225));
		particles_c[i].move();
		particles_c[i].display(radius);
		particles_c[i].display1(radius);
		particles_c[i].checkEdge();
	
	} 
  
}



function Particle(x, y, z){
	this.dir = createVector(0, 0, 0);
	this.vel = createVector(0, 0, 0);
	this.pos = createVector(x, y, z);
	this.speed = .025;

	this.move = function(){
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale, this.pos.z/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.dir.z = tan(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	this.checkEdge = function(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0 || this.pos.z > height || this.pos.z < 0) {
			this.pos.x = random(0, 360);
			this.pos.y = random(0, 360);
			this.pos.z = random(0, 360);
    
		}
	}

	this.display = function(r){
		
		
		translate(this.pos.x, this.pos.y,this.pos.z);
		rotateX(this.pos.x);
		rotateY(this.pos.y);
		rotateZ(this.pos.z);
      	torus(30,10,25);
		
	}
	this.display1 = function(r){
		
		translate(this.pos.x, this.pos.y,this.pos.z);
		rotateX(this.pos.x);
		rotateY(this.pos.y);
		rotateZ(this.pos.z);
		scale(3);
		model(shape);
	}
}

