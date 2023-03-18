let inputDirection = { x: 0, y: 0 }; //snake kis direction m move karha but for now it is not moving
const foodmusic = new Audio("audio/food.mp3");
const gameover = new Audio("audio/gameover.mp3");
const move = new Audio("audio/move.mp3");
const music = new Audio("audio/music.mp3");
let speed = 5;
let lastPaintTime = 0;
 snakeArr = [
  {
    x: 13,
    y: 17,
  }
];
 food = { x: 2, y: 4 };

let score=0;
//functions
function main(ctime) {
  window.requestAnimationFrame(main); //baar baar call krnek liye
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } //request ki speed kum krne k liye
  lastPaintTime = ctime;
  gameEngine(); //will run the game

function iscollided(snake){
//if you bumps into yourself
for(let i=1;i<snakeArr.length;i++){
if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
  return true;
} }//collided
if(snake[0].x >=18 ||snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0){
  return true
}
}




  function gameEngine() {
    //part-1 updating the snake array and food // collapse hoga toh kya karna  ..khana kha liya toh kya karna haiiii.. 
if(iscollided(snakeArr)){
    gameover.play();
    music.pause();
    inputDirection={x:0,y:0};
    alert("gameover...press anyy key to play agin")
    snakeArr=[{x:13,y:15}];
    music.play();
    score=0;
}

//if snake has eaten the foood...incrementing the score and regenerate the food;
if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){ 
  foodmusic.play();
  score+= 1;
  if(score>highscoreval){
    highscoreval=score;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
  highhscorebox.innerHTML="highscore:" + highscoreval;
  }
  scorebox.innerHTML="score:" +score; //jab snake and food will milenge
  snakeArr.unshift({x:snakeArr[0].x+inputDirection.x,y:snakeArr[0].y+inputDirection.y}); //snake k elements ko direction ki trf shift krne k liye
  let a=2;
  let b=16
  food={x:Math.round(a+ (b-a)*Math.random()),y:Math.round(a+ (b-a)*Math.random())} //food ko random jgh p rkhne k liye
}
//moving the snake
for(let i=snakeArr.length-2;i>=0;i--){

  snakeArr[i+1]={...snakeArr[i]}
}
snakeArr[0].x +=inputDirection.x
snakeArr[0].y +=inputDirection.y

    //part-1 display the snake and food

    //displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
      snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      
      if (index === 0) {
        snakeElement.classList.add("head");
      }else{
        snakeElement.classList.add("head");
      }
     
      board.appendChild(snakeElement);
    });
    //displaying the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
  }
}

//logic
let highscore=localStorage.getItem("highscore");
if(highscore===null){
  highscoreval=0;
  localStorage.setItem("highscore",JSON.stringify(highscoreval))
}else{
  highscoreval=JSON.parse(highscore)
  highhscorebox.innerHTML="highscore:" + highscore;
}
window.requestAnimationFrame(main); // baar baar krne k liye
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 };
  move.play();
  switch (e.key) {
    case "ArrowUp":           //keys press krne p upr neeche hoga app
      console.log("arrowup");
      inputDirection.x=0;
      inputDirection.y=-1;
            break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDirection.x=0;
      inputDirection.y=1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDirection.x=-1;
      inputDirection.y=0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDirection.x=1;
      inputDirection.y=0;
      break;
    default:
      break;
  }
});
