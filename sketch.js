
var trex ,trex_running;
var trexcollide ,trexcollideImg;
var ground1 ,groundimage ,invisibleground;

var clouds ,cloudsImg;
var cloudgroup;

var obstacle ,obstacle1 ,obstacle2 ,obstacle3 ,obstacle4 ,obstacle5  ,obstacle6;
var obstaclesgroup;

var JOGAR = 1;
var FINAL = 0;
var estado = JOGAR;

var gameover ,gameoverImg;
var restart ,restartImg;

var score = 0;

var checkpoint;

var die;

var jump;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  groundimage = loadImage("ground2.png");

  cloudsImg = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameoverImg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");

  trexcollideImg = loadAnimation("trex_collided.png");

  checkpoint = loadSound("checkpoint.mp3");

  die = loadSound("die.mp3");

  jump = loadSound("jump.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  trex = createSprite(50,height-70,20,50);  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trexcollideImg);
  trex.setCollider("circle", 0,0,40);
  trex.scale = 0.5;
  //create a trex sprite  

  ground1 = createSprite(60,height-26,200,20);
  ground1.addImage(groundimage);  
  invisibleground = createSprite(60,height-17,200,20);
  invisibleground.visible = false;

  cloudgroup = new Group();
  obstaclesgroup = new Group();

  gameover = createSprite(width/2,height/2);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.9;
  restart = createSprite(width/2,height-250);
  restart.addImage(restartImg);
  restart.scale = 0.6

  var mensage = "cometário";
  
}

function draw(){

  background(600);

  text("Score:" + score, width-90,50);

 if(estado === JOGAR){

  score = score +1;

  ground1.velocityX = -(4 + score / 100);

  if (touches.lenght > 0 || keyDown("space") && trex.y >= height/1.10){

   trex.velocityY = -10;

   jump.play();

   touches = []
  }
 
  if(ground1.x <0){
    ground1.x = ground1.width/2;
   }
  
  trex.velocityY = trex.velocityY + 0.5;
  
  obstacles();
  createcloud();
   
   if(obstaclesgroup.isTouching(trex)){
     estado = FINAL;
     die.play();
   }

   gameover.visible = false;
   restart.visible = false;


   if(score % 100 === 0){
    checkpoint.play();
    
   }
 }
 
 else if(estado === FINAL){

  ground1.velocityX = 0;
  
  obstaclesgroup.setVelocityXEach(0);

  cloudgroup.setVelocityXEach(0);

  cloudgroup.setLifetimeEach(-1);

  obstaclesgroup.setLifetimeEach(-1);

  gameover.visible = true;
  restart.visible = true;

  trex.velocityY = 0;

  trex.changeAnimation("collide");

  if(mousePressedOver(restart)){
   reset()

  }

 }



  trex.collide(invisibleground);

  drawSprites();
}

function createcloud(){
 if (frameCount % 120 === 0){
  clouds = createSprite(windowWidth,100,40,10);
  clouds.addImage(cloudsImg);
  clouds.scale = 0.7;
  clouds.velocityX = -(3 + score / 100);
  clouds.lifetime = 300;

  clouds.depth = trex.depth;
  trex.depth = trex.depth +1;

  clouds.y = Math.round(random(height-100 ,height-400));

  cloudgroup.add(clouds);
 }
}

function obstacles(){
 if (frameCount % 60 === 0){
    obstacle = createSprite(windowWidth,height-44,6,20);
    obstacle.velocityX = -(7 + score / 100);
    var rand = Math.round(random(1 ,6));

  switch(rand){
    case 1 : obstacle.addImage(obstacle1);
    break;
    case 2 : obstacle.addImage(obstacle2);
    break;
    case 3 : obstacle.addImage(obstacle3);
    break;
    case 4 : obstacle.addImage(obstacle4);
    break;
    case 5 : obstacle.addImage(obstacle5);
    break;
    case 6 : obstacle.addImage(obstacle6);
    break;

    default : break;
  }

   obstacle.scale = 0.5;
   obstacle.lifetime = 280;

   obstaclesgroup.add(obstacle);

 }
}

function reset(){
 obstaclesgroup.destroyEach();
 cloudgroup.destroyEach();
 gameover.visible = false;
 restart.visible = false;
 estado = JOGAR;
 trex.changeAnimation("running");
 score = 0;
 
 
}