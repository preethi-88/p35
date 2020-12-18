//Create variables here
var dog,happydog;
var database;
var foodS,foodStock;


function preload()
{
  //load images here
  dog=loadImage("images/dogimg.png");
   happydog=loadImage("images/dogimg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(800, 700);

  doggie=createSprite(250,300,150,150);
  doggie.addImage(dog);
  doggie.scale=0.15;
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    doggie.addImage(happydog);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}
