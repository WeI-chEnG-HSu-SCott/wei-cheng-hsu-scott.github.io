//rotate 3D
let groundRate = 0.05;
let lowestY = -Infinity;
let angleY;
let angleZ;
let retSpeedZ = 0.08;
let retSpeedY = 0.002;
let shaking = 0;
let shaking_speed = 0.1;
let stoneReSize = 0;
let stoneReSize_speed = 0.001;

//3D
let stone;
let mountain;
let groundTexture;

//sound
let player;
let distortion;
let panner;
let volume;
let volumeChange = 0;
let volumeChange_speed = 0.01;
let panNum = 0;
let panNum_speed = 3;


async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  stone = await loadModel("stone.obj", true);
  mountain = await loadModel("mountain.obj", true);
  groundTexture = await loadImage("ground.jpg");
  angleY = 0;
  angleZ = 0;

  //sound
  player = new Tone.Player({
    url: "sound.mp3",
    reverse: true,
    loop: true,
    autostart: false,
  });
  distortion = new Tone.Distortion({
    distortion: 0,
    wet: 1,
    oversample: "4x",
  })
  panner = new Tone.Panner(panNum);
  volume = new Tone.Volume(-20);
  player.connect(distortion);
  distortion.connect(panner);
  panner.connect(volume);
  volume.toDestination();
  await player.load("sound.mp3");
}

function draw() {
  //sound
  volume.volume.value = -20+volumeChange;
  
  lowestY = -Infinity;
  background(0);
  translate(0, 100);
  
  //move
  if(keyIsPressed == true){
    move();
  }
  if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
    angleY = lerp(angleY, 0, retSpeedY);
    distortion.distortion = lerp(distortion.distortion, 0, 0.005);
    shaking = lerp(shaking, 0, 0.01);
    stoneReSize = lerp(stoneReSize, 0, 0.01);
    volumeChange = lerp(volumeChange, 0, 0.01);
    if(player.reverse === false){
      player.stop();
      player.reverse = true;
      player.start();
    } 
  }
  if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    angleZ = lerp(angleZ, 0, retSpeedZ);
    panner.pan.rampTo(0, 3);
  }
  
  //stone
  gotRotate();
  push();
  scale(1+stoneReSize);
  translate(0, -lowestY);
  rotateZ(angleZ);
  rotateX(angleY);
  fill(0);
  strokeWeight(1);
  stroke('rgb(0, 204, 0)');
  model(stone);
  pop();


  //mountain
  push();
  texture(groundTexture);
  strokeWeight(1);
  stroke('rgb(0, 204, 0)');
  scale(30, -30);
  translate(0, 1, -900);
  model(mountain);
  pop();  

  //floor
  push();
  texture(groundTexture);
  strokeWeight(7);
  stroke('rgb(0, 204, 0)');
  translate(0, 1900, -600);
  rotateZ(-angleZ * groundRate);
  rotateX(-angleY * groundRate);
  sphere(2000);
  pop();

  //sky
  push();
  //fill(0);
  texture(groundTexture);
  strokeWeight(7);
  stroke('rgb(0, 204, 0)');
  translate(0+random(-shaking, shaking), 1900+random(-shaking, shaking), -600);
  rotateX(-angleY * groundRate);
  sphere(5000);
  pop();
}