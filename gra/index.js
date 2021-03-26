const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

// player img
let img = document.createElement('img');

let spriteW = 68;
let spriteH = 94;

img.src = 'player.png';

const playerMove = () => {   
   let cycle = 0;
   setInterval(() => {
      ctx.clearRect(0, 0, spriteW, spriteH);
      ctx.drawImage(
         img, 
         cycle * spriteW, 0, spriteW, spriteH,
         0, 0, spriteW, spriteH);
         cycle = (cycle + 1) % 6;
   }, 120);
};

img.addEventListener('load', playerMove);

// gameplane
let gamePlane = {
   canvas: document.createElement('canvas'),
   start: function() {
      this.canvas.width = 50;
      this.canvas.height = 250;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGamePlane, 20);
      this.frameNo = 0;
      function everyinterval(n) {
         if ((gamePlane.frameNo / n) % 1 == 0) {return true;}
         return false;
     }
 
   },
   clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
   },
   stop: function() {
      clearInterval(this.interval);
   }
   
   
};

// player 
function component (width, height, color, x, y) {
   this.width = width;
   this.height = height;
   this.x = x;
   this.y = y;
   ctx = gamePlane.context;
   ctx.fillStyle = color; 
   ctx.fillRect(this.x, this.y, this.width, this.height);
   this.update = function () {
      ctx = gamePlane.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
   };
   this.speedX = 0;
   this.speedY = 0;
   this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
   };
   this.jumpH = 100;
   this.newPos = function() {
      bottom = gamePlane.canvas.height - this.height;
      if(this.y < bottom - this.jumpH) {
         this.speedY = 2;
      }
      if(this.speedY == 2 && this.y == bottom) {
         this.speedY = 0;
      }
      this.y += this.speedY;
      if(this.y == bottom) {
         this.jumping = 0;
      }
   };
   this.jumping = 0;
   this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
       crash = false;
      }
      return crash;
    }
  
}

// aktualizacja
function updateGamePlane () {
   
   gamePlane.clear();
   player.update();
   player.speedX = 0;
   if(gamePlane.key && gamePlane.key === 39) {
      player.speedX = player.speedX + 1;
   };
   if(gamePlane.key && gamePlane.key === 38) {
      player.speedY = player.speedY - 2;
   };
   if(player.jumping == 0) {
      player.speedY = player.speedY - 2;
      player.jumping = 1;
   };
   przeszkoda.update();
   if (player.crashWith(przeszkoda)) {
      gamePlane.stop();
     } else {
      // tutaj cała reszta
   }
   przeszkoda.x += -1;

}

// start game
let player;
let przeszkoda = [];

function startGame () {
   gamePlane.start();
   player = new component(30, 30, 'red', 10, 120);
   przeszkoda = new component(10, 200, 'green', 300, 120);
}

const body = document.querySelector('body');

window.addEventListener('load', startGame);
window.addEventListener(keydown, function(event) {
   gamePlane.key = event.keyCode;
})
window.addEventListener(keyup, function(event) {
   gamePlane.key = false;
})