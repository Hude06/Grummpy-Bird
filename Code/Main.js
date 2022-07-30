import { draw_player } from "./Player.js";
import { check_player } from "./Player.js";
import { draw_obstacle as draw_obstacle } from "./Obstacle.js";
import { CheckObstacle as CheckObstacle } from "./Obstacle.js";
import { CheckKeyboard } from "./Keyboard.js";
import { Setup_Keyboard } from "./Keyboard.js";
import { CheckTopWall } from "./Wall.js";
import { update_physics } from "./Physics.js";
import { Generate_Random_Num } from "./Random-Num-Gen.js";
import { draw_background } from "./Wall.js";
let Flap = new Audio('/Sound/jump.wav');
let Coin = new Audio('/Sound/Coin.wav');
let BirdDie = new Audio('/Sound/hit.wav');
let SoundPlay = false
let bird = {
  x: 20,
  y: 20,
  vy: 0.09,
  ay: 0.04,
  alive: true,
  jump_ready: false,
  keystate: {
    space: false,
    enter: false,
  },
  lives: 4
};
let obstacle = {
  x: 500,
  y: 0,
};
let PlayerScore = 0;
let livePlayerScore =0;
if(localStorage.getItem("Coin")) {
  PlayerScore = parseInt(localStorage.getItem('Coin'));
}

let bird_image = new Image()
let pipe_image = new Image()
let pipe_headless = new Image()
let GameOver = new Image()
let base = new Image()
let base_long = new Image()





bird_image.src = "./Grafics/bird2.png"
pipe_image.src = "./Grafics/pipe.png"
pipe_headless.src = "./Grafics/pip-headles.png"
GameOver.src = "./Grafics/gameover.png"
base.src = "./Grafics/base.png"
base_long.src = "./Grafics/base.png"







let ctx;
let scroll = true;

function scrollX(Coin,base) {
  if (scroll === true) {
    ctx.drawImage(base, 0, 450)
    ctx.drawImage(base_long, 200, 450)

    obstacle.x = obstacle.x - 1.5;
    if (PlayerScore < livePlayerScore) {
      PlayerScore += 1;

    }
    if (bird.x == obstacle.x) {
      livePlayerScore += 1;
            Coin.play();

    }
  }
}
function Die() {
  if (bird.alive === false) {
    ctx.font = "24pt sans-serif";
    ctx.drawImage(GameOver, 150,0)

    scroll = false;
    obstacle.x = 800;
    bird.vx = 0;
    bird.vy = 0;
    bird.y =8400;
    if (SoundPlay === false) {
      BirdDie.play();
      SoundPlay = true
    }
    if (SoundPlay === true) {
      return
    }

  }
}

const $ = (sel) => document.querySelector(sel);
function score(hj) {
  $("#Score").innerText = "Score:" + hj;
}
function Record(sc){
  $("#Record").innerText = "Record:" + sc;
}
function Lives(bird){
  $("#Lives").innerText = "Lives:" + bird.lives;
}
function drawframe() {
  draw_background(ctx, bird, obstacle);
  scrollX(Coin,base);
  Record(PlayerScore);
  CheckKeyboard(ctx, bird, obstacle);
  update_physics(ctx, bird, obstacle);
  draw_player(ctx, bird, bird_image);
  check_player(ctx, bird, obstacle);
  draw_obstacle(ctx, obstacle, pipe_image, pipe_headless);
  Die(ctx, bird, obstacle);
  CheckObstacle(ctx, obstacle, bird);
  CheckTopWall(ctx, bird, obstacle);
  Lives(bird);
  localStorage.setItem('Coin', PlayerScore);
  score(livePlayerScore);

  window.requestAnimationFrame(drawframe);
}
function StartGame() {
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  Generate_Random_Num(ctx, bird, obstacle);
  drawframe();
  Setup_Keyboard(ctx, bird, Flap);

}
StartGame();
