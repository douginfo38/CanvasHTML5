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
var posix = 800;
var posiy = 50;
var passo = 2;
var flag = true;
var i = j = k = 0;
var pxg = 800;
var pyg = 800;
var recx = 0;
var recy = 0;
var contquad = contquady = 0;
var total = Math.pow(9,(passo - 1));
var a = ln = 0;
var contite = 0;
var lin = col = 0;
var coluna = 0;
var linha = 1;
var col2 = 5;
var col3 = 8; 

if (passo >= 3){
total = (total - 9);
}
var auxk = 27;
var totquad = 0;
var linha = 0;


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
    
    if(passo === 1){
        cnv.fillStyle = "yellow";
    }
    cnv.fillStyle = "yellow";
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
  
  
  if(passo === 0){
  quadrado = new Square(800,50,390);
  quadrado.render();
  colecao.push(quadrado);  
  }
  
  if(passo === 1){
          var lin = 0;
      var col = 0;
   for(i=0;i<=8;i++){   
      if(i !== 4){
          quadrado = new Square(posix+tamanhotapete[passo]*(col),posiy+tamanhotapete[passo]*(lin),tamanhotapete[passo]);
          quadrado.render();
          colecao.push(quadrado); 
      }
       
       col += 1;
       
       if (i === 2 || i === 5 || i === 8 ){
           lin += 1; 
           col = 0;
       }
       
     }
 } //end passo 1

     
   
     if (passo >= 2){
         //TapeteSierpinski(0);
         Tapete(0);
     }
     

  
  
   /*quadrado = new Square(200,50,130);
  quadrado.render();
  colecao.push(quadrado); 
  
   quadrado = new Square(200,50,45);
  quadrado.render();
  colecao.push(quadrado); */
  
  
};

function Tapete(loop){
    
    if(passo === 2){
        coluna += 1;
   }
 
   // if(linha !== 5){
for(i=0;i<=8;i++){   
    cnv.fillStyle = "yellow"; 

      if(i !== 4){    
          
        quadrado = new Square(posix+tamanhotapete[passo]*(col),posiy+tamanhotapete[passo]*(lin),tamanhotapete[passo]);
        quadrado.render();
        colecao.push(quadrado); 
        totquad += 1;     
      }
       
       col += 1;
 
       if (i === 2 || i === 5 || i === 8 ){ //2 5 8
           lin += 1; 
           col = 0;
           
           
       }
       
       /*if(i === 8){
           lin=0;
           col=0;
           
           col1 = 11;
           col2 = 14;
           col3 = 17;
           posix = 930;
       }*/
       
     }
     
  //  }
     
     if(linha === 1 && coluna === 2){
        posix = 930;
        posiy = 50;
        lin = 0;
        col= 0;
       }
       
       if(linha === 1 && coluna === 6){
        posix = 1060;
        posiy = 50;
        lin = 0;
        col= 0;
        linha += 1;
       }
      
     if(iteracao <= 0){
         iteracao+=1;
        Tapete(1);  
        
        
     }
 };

function TapeteSierpinski(loop){
    console.log("Total = "+total);
     if (passo >= 2 ){ 
         
   //   if (loop !== 5){   
     for(k=0;k<600;k++){  //1458
         
        //Linha 
        if (j === 0 || j  === 3 || j === 6){
           pxg = 0; 
        }         
       
         
        if(j === 1  ||  j === 4 || j === 7){
           pxg = (tamanhotapete[passo]*3);
        }
        
        if(j === 2 ||  j === 5 || j === 8) {
           pxg = (tamanhotapete[passo]*6);
        }
        
       
        
        //Coluna
        if(j <= 2){
           pyg = 0;
        }
        
        if(j >= 3 && j <= 5){
           pyg = (tamanhotapete[passo]*3);
        }
        
        if(j >= 6){
           pyg = (tamanhotapete[passo]*6);
        }
        
   //if (k < 500){
     if (j !== 4){     
      var lin = 0;
      var col = 0;
      
     
   
   for(i=0;i<=8;i++){   
    cnv.fillStyle = "yellow"; 

      if(i !== 4){    
          
        quadrado = new Square(pxg+posix+tamanhotapete[passo]*(col),recy+pyg+posiy+tamanhotapete[passo]*(lin),tamanhotapete[passo]);
        quadrado.render();
        colecao.push(quadrado); 
        totquad += 1;     
      }
       
       col += 1;
 
       if (i === 2 || i === 5 || i === 8 ){
           lin += 1; 
           col = 0;
       }
       
     }
   }else{
    //totquad += 64;
   }
       //
//end j != 4
   //}
      j += 1;
      
      /*Troca de coluna
      if (k !== 81){
      if (k % 9 === 0 && k > 0){ //81
          j = 0;
          console.log(k);
          pxg = 0;
          pyg = 0;
          
          if (contquad === 0){        
         
           posix = 800 + tamanhotapete[passo-2];
           contquad = 1;
          
            console.log(posix);
          }else{
            if (contquad === 1){
             posix = 800 + (tamanhotapete[passo-2]*2);
             contquad = 0;             
           }
          }
        
      }//end troca de coluna
  }
      //Troca de coluna
      if (k % 81 === 0 && k > 0){ //81
          posix = 800 + tamanhotapete[passo-2];
        
      }//end troca de coluna
      
      
      if(k % auxk === 0 && k > 0){ //243
          posix = 800;
          auxk = 45;
          
          if (contquady === 0){
           posiy = 50 + tamanhotapete[passo-2];
           contquady = 1;   
          // j = 0;
          }else{
            if (contquady === 1){
             posiy = 50 + (tamanhotapete[passo-2]*2);
             contquady = 0;  
           //  j = 0;
           }
          }          
  
      }*/
      
      //passo 3 = 192 e 320;
      
      if ((totquad % 192 === 0 || totquad % 320 === 0) && totquad <= 320){
         
          //if (passo === 3){ 
          
          if (a === 0){
            posix = 800;
           
          }else{
            if (a === 1){  
             posix = 930;
           }else{
              posix = 1060; 
           }
          }
            
            posiy = posiy + tamanhotapete[passo-2];
            j = 0;        
            linha += 1;
            console.log(totquad);
        //  }
          
        //  if (passo === 4){
        //    posiy = posiy + tamanhotapete[passo-2];  
        //    posix = 800+43.3;  
        //  }
          
          
          
          // }
      }else{
        if (totquad % 64 === 0){ //passo 3 = 64 passo 4 = 512
            
          if (linha === 1){  
            posix = posix + (tamanhotapete[passo-2]*2);  
           // alert(posix);
            linha = 2;
            ln = 2;
          }else{
            posix = posix + tamanhotapete[passo-2];
          }
          
          if (j !== 4){
            j = 0;
          }         
          
      }//if 64            
            
       } //else
          
      
      if (totquad === 512){
              totquad = 0;
              posiy = 50;
              linha = 0;
              a += 1;
              
              if (a === 3){
                  a = 0;
                  posix = 800;
                  posiy = posiy+130;
                  ln = 1;
              }
          }
          
          if(k % 72 === 0 && k >0){
            
                if(ln === 0){
                posix = 930;
                ln=1;
            }else{
               // posix = 1060;
            }
            
            
          }
   
     } //end for k
    } 
   //  }
    
    
    
    
    
    /*
    
    if (loop === 0 || loop  === 3 || loop === 6){
        recx = 0;
        //recx = tamanhotapete[passo-1]*3;
    }
    
    if(loop === 1  ||  loop === 4 || loop === 7){
        recx = tamanhotapete[passo-1]*3;
    }
    
    if(loop === 2  ||  loop === 5 || loop === 8){
        recx = tamanhotapete[passo-1]*6;
    }
    
    
    
    
    if (loop <= 2){
        recy = 0;
    }
    
    if (loop >= 3 && loop <= 5){
        recy = tamanhotapete[passo-1]*3;
    }
    
    if (loop >= 6 && loop <= 9){
        recy = tamanhotapete[passo-1]*6;
    }
    
    loop += 1;
   
    
   // if (loop < 54){
  //      TapeteSierpinski(loop);
   //     console.log(loop);
   // }
    */
    console.log("total Quadrados "+totquad); 
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
    cnv.fillStyle = "gray";
   cnv.fillRect(0,0,1400,300);
   
   cnv.fillStyle = "lime";
   cnv.fillRect(0,250,1400,200);
  //Desenha o background de fundo
  //cnv.drawImage(background,0,0,background.width,background.height);

  //Iteracao 0
  cnv.fillStyle = "yellow"; 
  cnv.fillRect(200,50,390,390);
  
  cnv.strokeStyle = "black";
  cnv.strokeRect(800,50,390,390);
  
  
  //iteracao 1  
  //cnv.fillStyle = "white"; 
  cnv.clearRect(200+tamanhotapete[1],50+tamanhotapete[1],tamanhotapete[1],tamanhotapete[1]);

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

   //Iteracao 0
  /*if (passo === 0 || passo === 2){  
    cnv.fillStyle = "yellow"; 
    cnv.fillRect(800,50,390,390);
  }*/

 ///renderiza todas as chuvas
  for(var c in colecao){
    var auxchu = colecao[c];         
      //cnv.fillStyle = "white";  
      auxchu.render();
      

  }
    
 
  
  /*iteracao 1  
  //cnv.fillStyle = "white"; 
  if (passo === 1){ 
      var lin = 0;
      var col = 0;
   for(i=0;i<=8;i++){   
    cnv.fillStyle = "yellow"; 
    cnv.strokeStyle = "black";
      if(i !== 4){
       cnv.fillRect(posix+tamanhotapete[passo]*(col),posiy+tamanhotapete[passo]*(lin),tamanhotapete[passo],tamanhotapete[passo]);
       cnv.strokeRect(posix+tamanhotapete[passo]*(col),posiy+tamanhotapete[passo]*(lin),tamanhotapete[passo],tamanhotapete[passo]);
   
       }
       
       col += 1;
       
       if (i === 2 || i === 5 || i === 8 ){
           lin += 1; 
           col = 0;
       }
       
     }
   }//end passo 1
   
    if (passo === 2){ 
     for(j=0;j<=8;j++){   
        if(j === 1 && flag === true){
           posix = posix + (tamanhotapete[passo]*3);
           flag = false;
 
        }
        
      var lin = 0;
      var col = 0;
      console.log("j - "+j);
   for(i=0;i<=8;i++){   
    cnv.fillStyle = "yellow"; 
     cnv.strokeStyle = "black";
      if(i !== 4){
       cnv.fillRect(posix+tamanhotapete[passo]*(col),posiy+tamanhotapete[passo]*(lin),tamanhotapete[passo],tamanhotapete[passo]);
       cnv.strokeRect(posix+tamanhotapete[passo]*(col),posiy+tamanhotapete[passo]*(lin),tamanhotapete[passo],tamanhotapete[passo]);
     
      }
       
       col += 1;
       
       if (i === 2 || i === 5 || i === 8 ){
           lin += 1; 
           col = 0;
       }
       
     }
   }
   
    }*/
 //   cnv.save();
 //cnv.fillStyle = "green";   
 //cnv.fillRect(800+130,50,130,130);
 //cnv.restore();
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