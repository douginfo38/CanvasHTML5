(function(){
//variaveis globais
var ctx; //context
var cnv;  //canvas
var status = null;

//Fractal
var tamanho = 390;
var tamanhotapete = [390,130,43.3,14.4,4.8,1.6];
var i = 0;
var iteracao = 0;
var quadrado;
var colecao = [];


//Variaveis do controle do teclado
var upKey = 38;
var downKey = 40;
var leftKey = 37;
var rightKey = 39;
var TECLAW = 87;
var TECLAS = 83;

//keycode.info // site de teclas

var tecla = []; //vetor da teclas
var x = 0;
var y = 0;
var vh = 0;

//background do jogo
var background = new Image(); //Criar o objeto imagem

//Objeto Player 1
var player1 = {
  x: null,
  y: null,
  largura: 25,
  altura:150,
  póntos: null,
  img: new Image(),
  render: function(){
     cnv.drawImage(player1.img,player1.x,player1.y,player1.largura,player1.altura);
 },
 move:function(vel){
    this.y += vel;
  }
};

//objeto rain - pseudo-classe
 var Square = function(posx,posy,tamanho){
  this.x = posx,
  this.y = posy,
  this.largura = tamanho,
  this.altura = tamanho,         
  this.render = function(){

    cnv.fillRect(this.x,this.y,this.largura,this.altura);
  };     
};



//Objeto Bola
var bola = {
  x: null,
  y: null,
  velx: 1.5,
  vely: 1.5,
  raio: 30,
  direcao: 'right',
  sentido: 'down',
  render: function(){
     cnv.beginPath();
     
     //Colocar cor no preenchimento 
     cnv.fillStyle = 'lime';
     cnv.arc(this.x,this.y,this.raio,0,Math.PI*2,true);
     cnv.fill();
  },
  move:function(){
      
  }//end function
      
};

//chamada a função de inicialização do canvas
window.onload = init();

//funcção de inicialização do canvas
function init(){
   ctx = document.getElementById('mcanvas');

   if (ctx !== null){ 
    cnv = ctx.getContext('2d');
    status = 'start';
    start();
   }else{
    alert('Não foi possível carregar o canvas');
    status = 'erro';
   }
   
   // DOM - Adiciona eventos de leitura do teclado
   window.addEventListener("keydown", function (e) {tecla[e.keyCode] = true;}, false);
  // addEventListener("keyup", function (e) {tecla[e.keyCode] = false;}, false);
};

//============= start ================
function start(){
  

  
  //Background do tela do jogo  
  background.src = "img/fundo_tela.jpg"; //adicionando a imagem    
  background.onload = function(){
    cnv.drawImage(background,0,0,background.width,background.height); 
  };
  
  quadrado = new Square(200,50,390);
  quadrado.render();
  colecao.push(quadrado);  
  
   quadrado = new Square(200,50,130);
  quadrado.render();
  colecao.push(quadrado); 
  
   quadrado = new Square(200,50,45);
  quadrado.render();
  colecao.push(quadrado); 
  
  
};

function TapeteSierpinski(){
   cnv.fillStyle = "yellow";
 
 for(i=0;i<3;i++){
 
 if(i === 0){
   cnv.fillRect(200,50,tamanho,tamanho);  
 }
 
 if(i === 1){
   cnv.clearRect(200+tapetetamanho,50+tapetetamanho,tapetetamanho,tapetetamanho);
 }
 
 if(i >= 2){
  
 for(iteracao=0;iteracao<6;iteracao++){  
   if(iteracao === 0){  
    cnv.clearRect(200+tapetetamanho[i+2],50+tapetetamanho[i+2],tapetetamanho[i+2],tapetetamanho[i+2]);
   }
                    else{
                        
           cnv.clearRect((200+tapetetamanho[iteracao])*iteracao,(50+tapetetamanho[i])*iteracao,tapetetamanho[i],tapetetamanho[i]);
           console.log((200+tapetetamanho)*iteracao);
    }
 }
 }
 
 //tapetetamanho = tapetetamanho / 3;
 //console.log(tapetetamanho);
 
 
 }
    
    
    
};


//============= UPDATE ================
function update(){
    
 //=========== Movimentar Player 1 ======================
//Tecla para cima
if (TECLAW in tecla) { // Tecla A - Jogador1 vai para cima
   
   //Checar a parte de cima da tela
   if (player1.y >= 15){     
     player1.move(-5); 
   };   
   
   delete tecla[TECLAW];
};

//Tecla para baixo
if (TECLAS in tecla) { // Tecla A - Jogador1 vai para cima
  
  //Checar a parte de baixo da tela
  if (player1.y + player1.altura <= 435){     
     player1.move(5); 
   };
  
   delete tecla[TECLAS];
};    
    
    
//=========== Movimentar Player 2 ======================
//Tecla para cima
if (upKey in tecla) { // Tecla A - Jogador1 vai para cima
   
   
   
   delete tecla[upKey];
};

//Tecla para baixo
if (downKey in tecla) { // Tecla A - Jogador1 vai para cima
  
  
   delete tecla[downKey];
};

/*Tecla para esquerda
if (leftKey in tecla) { // Tecla A - Jogador1 vai para cima
  
   delete tecla[leftKey];
};

//Tecla para direita
if (rightKey in tecla) { // Tecla A - Jogador1 vai para cima

   delete tecla[rightKey];
};*/


 //Mover a bola
 bola.move();

//Chamar a tela de desenho;
 draw(); 
}


//========= Desenha os elementos na tela ===============
function draw(){
   
  //Desenha o background de fundo
  cnv.drawImage(background,0,0,background.width,background.height);

  //Iteracao 0
  cnv.fillStyle = "yellow"; 
  cnv.fillRect(200,50,390,390);
  
  
  //iteracao 1  
  cnv.fillStyle = "white"; 
  cnv.fillRect(200+tamanhotapete[1],50+tamanhotapete[1],tamanhotapete[1],tamanhotapete[1]);

//iteracao 2  
  cnv.fillStyle = "red"; 
  cnv.fillRect(200+tamanhotapete[2]*1,50+tamanhotapete[2]*1,tamanhotapete[2],tamanhotapete[2]);
  cnv.fillRect(200+tamanhotapete[2]*4,50+tamanhotapete[2]*1,tamanhotapete[2],tamanhotapete[2]);
  cnv.fillRect(200+tamanhotapete[2]*7,50+tamanhotapete[2]*1,tamanhotapete[2],tamanhotapete[2]);

  cnv.fillRect(200+tamanhotapete[2]*1,50+tamanhotapete[2]*4,tamanhotapete[2],tamanhotapete[2]);
  //cnv.fillRect(200+tamanhotapete[2]*4,50+tamanhotapete[2]*1,tamanhotapete[2],tamanhotapete[2]);
  cnv.fillRect(200+tamanhotapete[2]*7,50+tamanhotapete[2]*4,tamanhotapete[2],tamanhotapete[2]);

  cnv.fillRect(200+tamanhotapete[2]*1,50+tamanhotapete[2]*7,tamanhotapete[2],tamanhotapete[2]);
  cnv.fillRect(200+tamanhotapete[2]*4,50+tamanhotapete[2]*7,tamanhotapete[2],tamanhotapete[2]);
  cnv.fillRect(200+tamanhotapete[2]*7,50+tamanhotapete[2]*7,tamanhotapete[2],tamanhotapete[2]);


//iteracao 3  
  cnv.fillStyle = "green"; 
  cnv.fillRect(200+tamanhotapete[3]*1,50+tamanhotapete[3]*1,tamanhotapete[3],tamanhotapete[3]);
  cnv.fillRect(200+tamanhotapete[3]*4,50+tamanhotapete[3]*1,tamanhotapete[3],tamanhotapete[3]);
  cnv.fillRect(200+tamanhotapete[3]*7,50+tamanhotapete[3]*1,tamanhotapete[3],tamanhotapete[3]);

  cnv.fillRect(200+tamanhotapete[3]*1,50+tamanhotapete[3]*4,tamanhotapete[3],tamanhotapete[3]);
  //cnv.fillRect(200+tamanhotapete[2]*4,50+tamanhotapete[2]*1,tamanhotapete[2],tamanhotapete[2]);
  cnv.fillRect(200+tamanhotapete[3]*7,50+tamanhotapete[3]*4,tamanhotapete[3],tamanhotapete[3]);

  cnv.fillRect(200+tamanhotapete[3]*1,50+tamanhotapete[3]*7,tamanhotapete[3],tamanhotapete[3]);
  cnv.fillRect(200+tamanhotapete[3]*4,50+tamanhotapete[3]*7,tamanhotapete[3],tamanhotapete[3]);
  cnv.fillRect(200+tamanhotapete[3]*7,50+tamanhotapete[3]*7,tamanhotapete[3],tamanhotapete[3]);


//iteracao 4  
  cnv.fillStyle = "blue"; 
  cnv.fillRect(200+tamanhotapete[4]*1,50+tamanhotapete[4]*1,tamanhotapete[4],tamanhotapete[4]);
  cnv.fillRect(200+tamanhotapete[4]*4,50+tamanhotapete[4]*1,tamanhotapete[4],tamanhotapete[4]);
  cnv.fillRect(200+tamanhotapete[4]*7,50+tamanhotapete[4]*1,tamanhotapete[4],tamanhotapete[4]);

  cnv.fillRect(200+tamanhotapete[4]*1,50+tamanhotapete[4]*4,tamanhotapete[4],tamanhotapete[4]);
  //cnv.fillRect(200+tamanhotapete[2]*4,50+tamanhotapete[2]*1,tamanhotapete[2],tamanhotapete[2]);
  cnv.fillRect(200+tamanhotapete[4]*7,50+tamanhotapete[4]*4,tamanhotapete[4],tamanhotapete[4]);

  cnv.fillRect(200+tamanhotapete[4]*1,50+tamanhotapete[4]*7,tamanhotapete[4],tamanhotapete[4]);
  cnv.fillRect(200+tamanhotapete[4]*4,50+tamanhotapete[4]*7,tamanhotapete[4],tamanhotapete[4]);
  cnv.fillRect(200+tamanhotapete[4]*7,50+tamanhotapete[4]*7,tamanhotapete[4],tamanhotapete[4]);

//iteracao 5  
  cnv.fillStyle = "black"; 
  cnv.fillRect(200+tamanhotapete[5]*1,50+tamanhotapete[5]*1,tamanhotapete[5],tamanhotapete[5]);
  cnv.fillRect(200+tamanhotapete[5]*4,50+tamanhotapete[5]*1,tamanhotapete[5],tamanhotapete[5]);
  cnv.fillRect(200+tamanhotapete[5]*7,50+tamanhotapete[5]*1,tamanhotapete[5],tamanhotapete[5]);

  cnv.fillRect(200+tamanhotapete[5]*1,50+tamanhotapete[5]*4,tamanhotapete[5],tamanhotapete[5]);
  //cnv.fillRect(200+tamanhotapete[2]*4,50+tamanhotapete[2]*1,tamanhotapete[2],tamanhotapete[2]);
  cnv.fillRect(200+tamanhotapete[5]*7,50+tamanhotapete[5]*4,tamanhotapete[5],tamanhotapete[5]);

  cnv.fillRect(200+tamanhotapete[5]*1,50+tamanhotapete[5]*7,tamanhotapete[5],tamanhotapete[5]);
  cnv.fillRect(200+tamanhotapete[5]*4,50+tamanhotapete[5]*7,tamanhotapete[5],tamanhotapete[5]);
  cnv.fillRect(200+tamanhotapete[5]*7,50+tamanhotapete[5]*7,tamanhotapete[5],tamanhotapete[5]);



 /*/renderiza todas as chuvas
  for(var i in colecao){
    var auxchu = colecao[i];         
      cnv.fillStyle = "white";  
      auxchu.render();
      

  }*/


 
 };  
 
   
//============ Recursividade / loop ================
function loop(){
    update();
    draw();
    requestAnimationFrame(loop,ctx);  
  }  
   
   //Verifica se o jogo começou para iniciar o loop
   if (status === 'start'){
    loop();
   };
   

}());