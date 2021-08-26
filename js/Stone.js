class Stone 
{
  constructor(x, y,r) 
  {
    let options = {
     isStatic:false,
    };
    
    this.body = Bodies.circle(x, y, r, options);
    this.image = loadImage("assets/stone.png");

    this.r =r;
    World.add(world, this.body);
  }

  display() {
    let pos = this.body.position;
    push();
    noStroke();
    fill(148,127,146);
    imageMode(CENTER);
    image(this.image,pos.x,pos.y, this.r*2,this.r*2);
    pop();
  }
} 