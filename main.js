//Definir pincel
var canvas =document.getElementById("canvas");
var ctx=canvas.getContext("2d");
//PRUEBA////ctx.fillRect(20,20,300,300)



//Variables Constantes

var instru=document.getElementById("titulo");
var interval;
var interval2;
var frames=0;
var frames2=0;
var images=
    {
        fondo:"./imagenes/sin_luz.png",
        nubesita:"./imagenes/nubesita.png",
        arbolito_1:"./imagenes/Arbol_grande.png",
        avion:"./imagenes/avioncito.png",
        semilla1:"./imagenes/semilla.png"
    }
var num_sem=-1;
var num_sem2=-1;
var arboles=[]
var arboles2=[]
var posx=0;
var posx2=0
var posy=0;
var posy2=0;
var niv_conta=100;
var niv_conta2=100;
var tiempo=1;
var tiempo2=1;
//var comienzo=0;
//var tiempo_real=0;
var jugador1=0;




//Funciones

//ctx.fillText("PRIMER JUGADOR OPRIME A ENTER PARA COMENZAR",300,400)


class back
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = images.fondo;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }

    draw()
    {
        this.x--;
        if(this.x === -this.width) this.x = 0;
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
        //ctx.fillStyle = "white";
        //ctx.font = '50px Avenir';
        //ctx.fillText(Math.floor(frames / 60), this.width -100, 50 )
    }
}



class avion
{
    constructor()
    {
        this.width=100;
        this.height=75;
        this.x=768-this.width;
        this.y=70;
        
        this.der=+30;
        this.izq=-30;
        this.dispara=[]
        this.image=new Image();
        this.image.src=images.avion;
        this.image.onload=function()
        {
            this.draw();
        }.bind(this)
    }

    avionDer()
    {
        
        this.x+=this.der;
    }
    avionIzq()
    {
        //console.log("casi")
        this.x+=this.izq;
       
    }

    draw()
        {

            ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        }
    
}




class semilla
{
    constructor(as)
    {
        
        this.width=35;
        this.height=50;
        this.x=as.x+as.width/2-this.width;
        this.y=as.y+this.height;
        this.der=+20;
        this.izq=-20
        this.image=new Image();
        this.vY=+2;
        this.image.src=images.semilla1;
        this.image.onload=function()
        {
            this.draw();
        }.bind(this);
    }
    
    semiDer()
    {
        
        this.x+=this.der;
    }
    semiIzq()
    {
        //console.log("casi")
        this.x+=this.izq;
       
    }

    draw()
    {
        if(this.y>=765)
        {
            //console.log("ja")
            num_sem=0;
            num_sem2=0;
            //console.log(num_sem);
            posx=this.x;
            posy=this.y;
            if(jugador1==true)
            {
                generar_arbolito();
            }
            else
            {
                generar_arbolito2();
            }
            
            avioncito.dispara.pop();
        }
        else
        {             
            this.y+=this.vY;
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
            num_sem=+1;
            num_sem2=+1;
            //console.log(num_sem);
            //console.log(this.y);
        }
    }
}



class suelo
{
    constructor()
    {
        this.x=0;
        this.y=765;
        this.width=canvas.width;
        this.height=canvas.height;
    }
    
    draw()
    {
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}

class arbolito_1
{
    constructor()
    {
        this.width=150;
        this.height=175;
        //this.x=os.x+os.width/2-this.width;
        //this.y=os.y+this.height;
        this.x=posx-75;
        this.y=posy-150;
        this.image=new Image();
        this.image.src=images.arbolito_1;
        this.image.onload=function()
        {
            this.draw();
        }.bind(this);
    }

    draw()
    {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}



class Texto
{
    constructor()
    {
        this.x=900;
        this.y=50;
    }

    draw()
    {
        
        ctx.font="50px Arial";
        ctx.fillText("Contaminacion al "+niv_conta+" %",this.x,this.y)
    }
}

class Texto2
{
    constructor()
    {
        this.x=900;
        this.y=50;
    }

    draw()
    {
        
        ctx.font="50px Arial";
        ctx.fillText("Contaminacion al "+niv_conta2+" %",this.x,this.y)
    }
}

class Texto_tiempo
{
    constructor()
    {
        this.x=50;
        this.y=50;
    }
    
    
    draw()
    {
        tiempo=Math.floor(frames/60);
        //console.log(tiempo)
        //tiempo_real=tiempo_real-tiempo;
       // console.log(tiempo_real)
        ctx.font="50px Arial";
        ctx.fillText((7-tiempo)+" s",this.x,this.y)
        console.log(tiempo)
    }

}

class Texto_tiempo2
{
    constructor()
    {
        this.x=50;
        this.y=50;
    }
    
    
    draw()
    {
        tiempo2=Math.floor(frames2/60);
        //console.log(tiempo)
        //tiempo_real=tiempo_real-tiempo;
       // console.log(tiempo_real)
        ctx.font="50px Arial";
        ctx.fillText((7-tiempo2)+" s",this.x,this.y)
    }

}


//instancias


var fondito=new back();
var avioncito=new avion();
//var semillita=new semilla();
var suelecito=new suelo();
var textito=new Texto();
var textito2=new Texto2();
var textito_tiempo=new Texto_tiempo();
var textito2_tiempo=new Texto_tiempo2();



//Mains


function update()
    {
        frames++;
        //console.log(frames);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        fondito.draw();
        avioncito.draw();
       // niv_conta++;
        //semillita.draw();
        drawSemi();
        suelecito.draw();
        drawArbol();
        textito.draw();
        //console.log(tiempo);
        textito_tiempo.draw();
        checarTiempo();
        //console.log(niv_conta)
    }

function start()
    {
        num_sem=0
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(interval) return;
        interval = setInterval(update, 1000/60);
       // ctx.arbolito_1;
    }

    function update2()
    {
        frames2++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        fondito.draw();
        avioncito.draw();
        textito2_tiempo.draw();
        textito2.draw();
        suelecito.draw();
        drawSemi2();
        drawArbol2();
        checarTiempo2();
        //console.log(niv_conta2)
    }

function start2()
    {
        num_sem2=0;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(interval2) return;
        interval2 = setInterval(update2, 1000/60);
        
       
    }   




    //Funciones auxiliares



    function generarSemilla()
{
    var semi=new semilla(avioncito)
    avioncito.dispara.push(semi);
    
}

function drawSemi()
{
    avioncito.dispara.forEach(function(b) {
    b.draw();
});
    
}

function generarSemilla2()
{
    var semi2=new semilla(avioncito)
    avioncito.dispara.push(semi2);
    
}

function drawSemi2()
{
    avioncito.dispara.forEach(function(b) {
    b.draw();
});
    
}

function generar_arbolito()
{
    var arbolito=new arbolito_1();
    arboles.push(arbolito);
    niv_conta=niv_conta-10;
}

function drawArbol()
{
    arboles.forEach(function(b){
        b.draw();
    })
}

function generar_arbolito2()
{
    var arbolito2=new arbolito_1();
    arboles2.push(arbolito2);
    niv_conta2=niv_conta2-10;
}

function drawArbol2()
{
    arboles2.forEach(function(b){
        b.draw();
    })
}

function checarTiempo()
{
    if(tiempo==7)
    {
        document.getElementById("titulo").innerHTML="Segundo Jugador presiona 2 para comenzar";
        
            //this.innerHTML = "presina"
            
            
            //console.log(instru.id)
            jugador1=2;
            
            
       
        //start2();
        clearInterval(interval);        
    }
  // if((tiempo/90)==)
  //console.log(tiempo);
}


function checarTiempo2()
{
    if(tiempo2==7)
    {
        checarGanador();
        clearInterval(interval2);
    }
}

function checarGanador()
{
    if(niv_conta<niv_conta2)
    {
        
        document.getElementById("titulo").innerHTML="GANO EL JUGADOR UNO";
        //instru.id = "seTermino";
    }
    if(niv_conta2<niv_conta)
    {
        
        document.getElementById("titulo").innerHTML="GANO EL JUGADOR DOS";
        //instru.id = "seTermino";
    }
    if(niv_conta==niv_conta2)
    {
        
        document.getElementById("titulo").innerHTML="HAN QUEDADO EMPATE";
        //instru.id = "seTermino";
    }
}




//escuchadores







addEventListener("keydown",function(e)
{
    //console.log("jajajajaj")
    if(e.keyCode===37)
    {
        if(jugador1==1)
        {
            if(num_sem==0)
            {
                //console.log("izq");
                avioncito.avionIzq();
            }
            else
            {
                //console.log("pu")
                //semilla.semi.semiIzq();
                avioncito.dispara.forEach(function(b) {
                    b.semiIzq();});

            }    
        }
        else
        {

            if(num_sem2==0)
            {
                //console.log("izq");
                avioncito.avionIzq();
            }
            else
            {
                //console.log("pu")
                //semilla.semi.semiIzq();
                avioncito.dispara.forEach(function(b) {
                    b.semiIzq();});

            }  
        }    
    }
    if(e.keyCode===39)
    {
        /*
        if(num_sem==-1)
        {
            num_sem=0;
        }
        if(num_sem2==-1)
        {
            num_sem2=0
        }
        */
        if(jugador1==1)
        {
            if(num_sem==0)
            {
                //console.log("sider");
                avioncito.avionDer();
            }
            else
            {
                //avioncito.dispara.semiDer();
                avioncito.dispara.forEach(function(b) {
                    b.semiDer();});
            }
        }
        else
        {
            if(num_sem2==0)
            {
                //console.log("sider");
                avioncito.avionDer();
            }
            else
            {
                //avioncito.dispara.semiDer();
                avioncito.dispara.forEach(function(b) {
                    b.semiDer();});
            }
        }
    }
    if(e.keyCode===32)
    {
        if(jugador1==1)
        {
            if(num_sem==0)
            {
                generarSemilla();
                //semillita.draw();
                //var semillita=new semilla(avioncito);
                
                
            }
            else
            {
                return;
            }
        }
        else
        {
            if(num_sem2==0)
            {
                generarSemilla2();
                //semillita.draw();
                //var semillita=new semilla(avioncito);
                
                
            }
            else
            {
                return;
            }
        }
    }

    if(e.keyCode===49 || e.keyCode===97)
    {
        if(jugador1==0)
        {
            console.log("ja")
            jugador1=1;
            
                document.getElementById("titulo").innerHTML = "ESTA JUGANDO EL JUGADOR 1"
                start();
                //instru.id = "yaNo";
                //console.log(instru.id)
        }
                
              
       
    }

    if(e.keyCode===50 || e.keyCode===98)
    {
        if(jugador1==2)
        {
            console.log("este no")
            document.getElementById("titulo").innerHTML = "ESTA JUGANDO EL JUGADOR 2"
            start2();
        }
        
    }
});

/*document.getElementById('titulo').addEventListener('click', function(){
    this.innerHTML = "ESTA JUGANDO EL JUGADOR 1"
    //instru.id = "yaNo";
    //console.log(instru.id)
    start();
    });
//start();*/