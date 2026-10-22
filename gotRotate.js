function gotRotate(){
    for(let i = 0;i < stone.vertices.length;i++){
    let x = stone.vertices[i].values[0];
    let y = stone.vertices[i].values[1];
    let z = stone.vertices[i].values[2];
    let y1 = y*Math.cos(angleY) - z*Math.sin(angleY);
    let y2 = x*Math.sin(angleZ) + y1*Math.cos(angleZ);
    if(y2 > lowestY){
      lowestY = y2;
    }
  }
}
