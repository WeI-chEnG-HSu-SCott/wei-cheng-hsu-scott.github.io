function move() {
  let rotSpeed = PI/24;
  if (keyIsDown(UP_ARROW)) { // Up arrow key
    angleY += rotSpeed;
    if(player.reverse === true){
      player.stop();
      player.reverse = false;
      player.start();
    }
    distortion.distortion += 0.003;
    shaking += shaking_speed;
    stoneReSize += stoneReSize_speed;
    volumeChange += volumeChange_speed;
  }
  if (keyIsDown(DOWN_ARROW)) { // Down arrow key
    angleY -= rotSpeed;
    if(player.reverse === true){
      player.stop();
      player.reverse = false;
      player.start();
    }
    distortion.distortion -= 0.003;
    shaking += shaking_speed;
    stoneReSize += stoneReSize_speed;
    volumeChange += volumeChange_speed;
  }
  if (keyIsDown(LEFT_ARROW)) { // Left arrow key
    angleZ -= rotSpeed;
    panner.pan.rampTo(-1, panNum_speed);
  }
  if (keyIsDown(RIGHT_ARROW)) { // Right arrow key
    angleZ += rotSpeed;
    panner.pan.rampTo(1, panNum_speed);
  }

  //limit left right 
  angleZ = constrain(
    angleZ,
    -PI/3,
    PI/3
  );
}