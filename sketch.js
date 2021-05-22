var dog,sadDog,happyDog;
var feedB, addB;
var database;
var foodStock=0;
var gameState = 0;
var hour



function preload(){
  sadDog=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
  empty = loadImage("Milk.png");

  getTime();
}

function setup() {
  createCanvas(1000,400);
 
  database = firebase.database();
  
  food=new Food();
  food.getFoodStock();
  food.updateFoodStock(foodStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedB = createButton('Feed Dog');
  feedB.position(900,95);
  feedB.mousePressed(feedDog);

  addB = createButton('Add food');
  addB.position(970,95);
  addB.mousePressed(addFood);

}

function draw() {
  background(46,139,87);
  fill("red");
  textSize(15);
  food.getFoodStock();
  food.display();
  drawSprites();
  console.log(gameState);
  if(gameState===3){
    textSize(20);
    push();
    text("No Food",200,50);
    pop();
  }
  if(hour>=12){
    text("Last Fed: "+ hour%12 + " PM",350,50);
  }
  else if (hour===0){
    text("Last Fed: 12 AM",350,50);
  }
  else if(hour<=12){
    text("Last Fed: "+ hour + "AM",350,50);
  }
  text("Max",775,290);
}

function feedDog(){
  if(foodStock>0){
    dog.addImage(happyDog);
    foodStock -= 1
    food.updateFoodStock(foodStock);
    gameState=1
    food.updateLastFed(hour);
  }
  else{
    gameState=3
  }

}
function addFood(){
  foodStock = foodStock + 1;
  food.updateFoodStock(foodStock);
  dog.addImage(sadDog);
  gameState=0;
  //console.log("hello");
}

async function getTime(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata"); 
  var responseJSON = await response.json();
  console.log(responseJSON);

  var dayTime = responseJSON.datetime;
  hour = dayTime.slice(11,13);
  console.log(hour);
}

