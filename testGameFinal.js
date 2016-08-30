'use strict';

window.document.addEventListener('DOMContentLoaded', function() {

    window.requestAnimFrame =
    window.requestAnimationFrame || // La fonction d'origine que tous les navigateurs finiront par utiliser.
    window.webkitRequestAnimationFrame || // Pour Chrome et Safari.
    window.mozRequestAnimationFrame || // Pour Firefox.
    window.ORequestAnimationFrame || // Pour Opera.
    window.msRequestAnimationFrame // Pour Internet Explorer.
    ;



//******************************************PERSONNAGE*****************************************************
var shinobi = {
    nom:'shinobi',
    srcX:0,
    srcY:0,
    x:0,
    y:320,
    speed:40,
    left:false,
    right:false,
    up:false,
    rows:7,
    cols:7,
    curFrame:0,
    frameCount:6,
};

var majSpriteMouv = function(){
   shinobi.curFrame = ++shinobi.curFrame % shinobi.frameCount;
   shinobi.srcY = (shinobi.curFrame + 1) * height;
}

var majSpriteAttaque = function(){
 shinobi.curFrame = ++shinobi.curFrame % shinobi.frameCount;
 shinobi.srcY = shinobi.curFrame * height;

}


function majFrameMouv (){
    if (shinobi.left) { // Si le personnage regarde à gauche... //
        shinobi.srcX = 400;
        shinobi.x -= shinobi.speed; // j'enlève 3 pixels à sa position horizontale //
        majSpriteMouv();
    } 
    if (shinobi.right) { // Si le personnage regarde à droite //
        shinobi.srcX = 0;
         shinobi.x += shinobi.speed; // j'ajoute 3 pixels à sa position horizontale //
         majSpriteMouv();
     }
 };

 function majFrameAttaque (){
    if (shinobi.left) { // Si le personnage regarde à gauche... //
        shinobi.srcX = 1200;

    } 
    if (shinobi.right) { // Si le personnage regarde à droite //
        shinobi.srcX = 800;

    } 
};
function majFrameSautUp(){
 shinobi.curFrame = ++shinobi.curFrame % shinobi.frameCount;
 shinobi.srcY = shinobi.curFrame * height;
    if (shinobi.left) { // Si le personnage regarde à gauche... //
        shinobi.srcX = 2400;

    } 
    if (shinobi.right) { // Si le personnage regarde à droite //
        shinobi.srcX = 2000;
    }
    if (shinobi.y = shinobi.srcY) { 
        shinobi.y = 0;
    } 
};

/*1er cas, le joueur touche le sol.

Si le joueur appuie sur espace, dy = vy

Sinon, dy = 0.

2ème cas, le joueur est en l'air.

dy -= ay

Ensuite, tu fais simplement

x += dx;

y += dy; */


//******************************************PERSONNAGE*****************************************************
var spriteWidth = 2800;
var spriteHeight = 2800; 

// j'ai diviser la taille en H et W du sprite du personnage par le nombre de Cols et Rows pour obtenir la taille d'un seul mouvement
var width = spriteWidth/shinobi.cols;
var height = spriteHeight/shinobi.rows;

//******************************************ENNEMIS*****************************************************
var ConstructeurEnnemiDroite = function(ArguNom){
    this.nom = ArguNom;
    this.srcX = 400;
    this.srcY = 0;
    this.x = 850;
    this.y = 320;
    this.speed = 30;
    this.left = false;
    this.right = true;
    this.up = true;
    this.collisionMouv = false;
    this.collisionFight = false;
    this.rows = 7;
    this.cols = 6;
    this.curFrame = 0;
    this.frameCount = 6;
    this.spriteEnnemiW = 2000;
    this.spriteEnnemiH = 2800;
    this.mouvSprite = function(){
        if (this.collisionMouv == true) {
            this.curFrame = ++this.curFrame % this.frameCount;
            this.srcY = (this.curFrame + 1) * heightE;
        }
        if (this.left) { // Si le personnage court vers la gauche //
            this.x += this.speed; // j'enlève 3 pixels à sa position horizontale //
        }
        if (this.right) { // Si le personnage court vers la droite //
            this.x -= this.speed; // j'ajoute 3 pixels à sa position horizontale //
        }
    },

    this.spriteAttaqueEnnemi = function(){
        if (this.collisionFight == true) {

         this.curFrame = ++this.curFrame % this.frameCount;
         this.srcY = (this.curFrame) * heightE;

         if (this.left) { // Si le personnage regarde à gauche... //
            this.srcX = 800;
        } 
        if (this.right) { // Si le personnage regarde à droite //
            this.srcX = 1200;
        }
    }
    

}


};


//******************************************ENNEMIS*****************************************************

//******************************************ENNEMI 1*****************************************************
var ennemi1 = new ConstructeurEnnemiDroite('shreder');
var widthE = ennemi1.spriteEnnemiW/ennemi1.cols
var heightE = ennemi1.spriteEnnemiH/ennemi1.rows
console.log(ennemi1.collisionFight)



var collision = function(){

    if (ennemi1.x < shinobi.x + 50) {
        ennemi1.right = false;
        ennemi1.collisionMouv = false;
        ennemi1.collisionFight = true;
        ennemi1.srcY = 0;

        shinobi.x = shinobi.x  - 100;
        shinobi.srcY = 400;
        shinobi.srcX = 1600;

        console.log(ennemi1.collisionMouv)

    } 
}








//******************************************ENNEMI 1*****************************************************

//******************************************CANVAS*****************************************************
// le canvas
var canvas = document.getElementById('canvas');

//reglages de la taille du canvas
var canvasWidth = 1000; 
var canvasHeight = 720;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// context du canvas
var ctx = canvas.getContext('2d');

//creation du Fond
var backgroundImage = new Image();
backgroundImage.src = 'decomposition/fond3.jpg';

//creation de l'image du personnage
var personnage = new Image();
personnage.src = "sprite/sprite.png";

// creation ennemi1 
var ennemi01 = new Image();
ennemi01.src = "sprite/spriteEnnemi.png"

// affichage des elements dans le canvas
function draw(){
    ctx.drawImage(backgroundImage, 0, 100);
    ctx.drawImage(ennemi01,ennemi1.srcX,ennemi1.srcY,widthE,heightE,ennemi1.x,ennemi1.y,widthE,heightE);
    ctx.drawImage(personnage,shinobi.srcX,shinobi.srcY,width,height,shinobi.x,shinobi.y,width,height);
    
}
setInterval(draw,100);
//******************************************CANVAS*****************************************************

var start = null;
var startEnnemiToucher = null

var time = function(timestamp){
    var progress;
    var progressEnnemiToucher;





    if (!startEnnemiToucher && ennemi1.collisionFight) {
        startEnnemiToucher = timestamp;
    }
    progressEnnemiToucher = timestamp - startEnnemiToucher;
    if (progressEnnemiToucher >= 90 && progressEnnemiToucher != timestamp) {
        ennemi1.spriteAttaqueEnnemi()
    }

    



    if (!start) {
        start = timestamp;

    }
    progress = timestamp - start;
    if (progress >= 90) {

      ennemi1.mouvSprite();
      majFrameMouv();
      collision();




      start = timestamp;

  }
  window.requestAnimationFrame(time);

};

window.requestAnimationFrame(time);
//******************************************controleAttaque*****************************************************
window.onkeydown = function(event){
    var code = event.keyCode;
    switch(code){
            case 39: // Touche droite enfoncée
            shinobi.right = true;
            break;
            case 37: // Touche gauche enfoncée
            shinobi.left = true;
            break;
            case 38:
            shinobi.up = true;
            break;
            case 90: // touche z

            break;
        }
    };
    window.onkeyup = function(event){
        var code = event.keyCode;
        switch(code){
            case 39: // Touche droite relachée
            shinobi.right = false;
            shinobi.srcY = 0;
            break;
            case 37: // Touche gauche relachée
            shinobi.left = false
            shinobi.srcY = 0;
            break;
            case 38:
            shinobi.up = false;
            break;
            case 90: // touche z          
            break
        }
    };
//******************************************controleAttaque*****************************************************
});