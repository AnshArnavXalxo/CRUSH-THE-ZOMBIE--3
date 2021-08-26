const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground;
var leftWall;
var rightWall;
var bridge;
var jointPoint;
var rightWallcon;
var stones=[];
var backgroundImg;
var button;
var zombie;
var zombieImg;
var zombieImgSad;

function preload(){
backgroundImg= loadImage("assets/background.png");
zombieImg = loadImage("assets/zombie1.png");
zombieImgSad = loadImage("assets/sad_zombie.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

ground = new Base(0,690,windowWidth+1500,60);
leftWall= new Base(-50,400,500,400);
rightWall= new Base(1500,400,500,400);
bridge= new Bridge(6,{x:120,y:250});
jointPoint= new Base(1300,250,40,20);
rightWallcon= new Link(bridge,jointPoint);
button= createImg("assets/axe.png");
button.position(1200,310);
button.size(50,50);
button.mouseClicked(drop);
zombie = createSprite(500,580,100,150);
  zombie.addImage(zombieImg);
  zombie.scale=0.15;

  zombie.addImage('Sad',zombieImgSad);
}

function draw() {
  background(51);
  Engine.update(engine);

  image(backgroundImg,0, 0,1400,660);

  if(Collide(stone,zombie)){
    zombie.changeImage("Sad")
    }

  ground.show();
  fill("black");

  bridge.show();
  showStones();
  drawSprites();


}
function showStones(){
  if(stones.length>0){
    if(stones.length<8 && stones[stones.length-1].body.position.x<width-200){
    var pos=[-90,-120,-100,-80];
    var ypos=random(pos)
    var stone= new Stone(width-800,height-620,40,ypos)
    stones.push(stone);
      }
      for(var i=0;i<stones.length;i++){
        stones[i].display();
      }
  }
  else{
    var stone= new Stone(width-1000,height-620,40,-80)
    stones.push(stone);
  }
}
function drop(){
  bridge.break();
  rightWallcon.detach();
  rightWallcon=null;
}

function Collide(bodyA,bodyB){
  if(bodyA!=null){
  var distance = dist(bodyA.position.x,bodyA.position.y,bodyB.position.x,bodyB.position.y)
  if(distance<=80){
    return true;
  }
  else{
    return false;
  }
  }
  }
