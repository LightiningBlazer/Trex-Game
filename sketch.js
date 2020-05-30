var PLAY, END, gamestate;
var trex, trexRunning, trexCollided;
var ground, groundImage, invisibleGround;
var cloudsImage, cloudsGroup;
var Obstacle1, Obstacle2, Obstacle3, Obstacle4, Obstacle5, Obstacle6, obstaclesGroup;
var restartSprite, restartImage, endSprite, endImage;

function preload(){
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudsImage = loadImage("cloud.png");
  Obstacles1 = loadImage("obstacle1.png");
  Obstacles2 = loadImage("obstacle2.png");
  Obstacles3 = loadImage("obstacle3.png");
  Obstacles4 = loadImage("obstacle4.png");
  Obstacles5 = loadImage("obstacle5.png");
  Obstacles6 = loadImage("obstacle6.png");
  restartImage = loadImage("restart.png");
  endImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 180,20,50);
  trex.addAnimation("Running", trexRunning);
  trex.scale = 1/2;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("Ground", groundImage);
  
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  ground.x = ground.width/2
  ground.velocityX = -2;
  
  restartSprite = createSprite(300,120);
  restartSprite.addImage("Restart",restartImage);
  restartSprite.scale = 1/2;
  restartSprite.visible = false;
  
  endSprite = createSprite(300,100);
  endSprite.addImage("End", endImage);
  endSprite.scale = 1/2;
  endSprite.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  PLAY = 1;
  END = 0;
  
  gamestate = PLAY;
}


function draw() {
  background(180);
  console.log(trex.y);
  trex.collide(invisibleGround);
  
  if(gamestate === PLAY){
    
    if(keyDown("space") && trex.y >= 162 ){
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;

    if(ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnObstacles()

    spawnClouds();
    
    if(trex.isTouching(obstaclesGroup)){
      gamestate = END;
    }
    
  }else if(gamestate === END){
    
    trex.velocityY = 0;
    ground.velocityX = 0;
    restartSprite.visible = true;
    endSprite.visible = true;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
  }
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(Obstacles1);
        break;
      case 2: obstacle.addImage(Obstacles2);
        break;
      case 3: obstacle.addImage(Obstacles3);
        break;
      case 4: obstacle.addImage(Obstacles4);
        break;
      case 5: obstacle.addImage(Obstacles5);
        break;
      case 6: obstacle.addImage(Obstacles6);
        break;
      default: break
        
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    obstaclesGroup.add(obstacle); 
  }
}
  
function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudsImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}
