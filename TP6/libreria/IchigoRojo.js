/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Phaser, mongoles, mongol */

function IchigoRojo(game, posx, posy, key, tipo) {
    //Movimientos.call(this,game, posx, posy, key, 0,target);


    this.sprite = game.add.sprite(posx, posy, key)
    this.game = game;
    this.tipo=tipo;
    this.target=null;
    
    /*
     * agrega sprite al juego
     */
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);


    /**
     *  Variables utiles para el comportamiento 
     */
    this.max_vel = 300;
    this.max_force = 80;
    
    this.esp_speed = 0;
    this.max_speed = 10.5;
    this.min_speed = 0;
    this.min_distance = 0;
    this.max_distance = 0;
    
    this.nopelea=1;
    
    this.sprite.body.collideWorldBounds = true;

    this.game.physics.arcade.enable(this.sprite);
    
    this.sprite.animations.add('right', [1], 7, true);
    this.sprite.animations.add('left', [0], 7, true);
    
    return this;
}
//Behavior_Cursor.prototype= Object.create(Behavior.prototype);//Degfino que es sub clase de Sprite.
IchigoRojo.prototype.constructor = IchigoRojo;

// Para que al frenar quede hacia donde iba.
var ultimo = 'right';
var ultimoA = 'left';
var sem=0;
var i=0;
var point1r= new Phaser.Point(1088,821);
    var point2r= new Phaser.Point(1071,389);
    var point3r= new Phaser.Point(936,346);

var seguir=false;

var arr=[];
    var disMin;
    var posMongol=0;
    var seDetuvo=false;

IchigoRojo.prototype.update = function () {

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    if(Phaser.Math.distance(point1r.x,point1r.y,this.sprite.body.x,this.sprite.body.y)>100 && i===0){
    this.seek(point1r,false);
    }
    else{
        i++;
        if(Phaser.Math.distance(point2r.x,point2r.y,this.sprite.body.x,this.sprite.body.y)>10 && i===1){
        this.seek(point2r,false);
    }
    else{
        i++;
        if(Phaser.Math.distance(point3r.x,point3r.y,this.sprite.body.x,this.sprite.body.y)>1 && i>2 && score[this.tipo] <= 25 && seguir===false){
     this.seek(point3r,false);
     }
     else{
         seguir=true;
         this.sprite.body.velocity.x=0;
         this.sprite.body.velocity.y=0;
         if(score[this.tipo]>25){
             this.target=princes;
             this.seek(princes.sprite.body.position,false);
         }
         else{
         this.calcularMongolCercano();
if(posMongol<200 && mongoles[posMongol].sprite.body.position.y>180 && Phaser.Math.distance(princes.sprite.body.position.x,princes.sprite.body.position.y,this.sprite.body.x,this.sprite.body.y)<400){
       this.seek(mongoles[posMongol].sprite.body.position,false);
   }
   else{
       this.seek(point3r,false);
   }
     }
     }
    }
         
    }
    
   
    if(this.sprite.body.velocity.x > 0)
        this.sprite.animations.play('right');
    else
        this.sprite.animations.play('left');



}

IchigoRojo.prototype.seDetuvo= function (){
    var t=0;
    var pos=this.sprite.body.position;
    for(t=0;t<1000000;t++){
    }
    if(pos===this.sprite.body.position){
        seDetuvo=true;
    }
    
}


IchigoRojo.prototype.calcularMongolCercano= function (){
    var arr=[];
    var j=0;
    var k=0;
    var posX;
    var posY;
    while (j<mongoles.length && mongoles[j].nopeleo === 1 ){ 
        posX=mongoles[j].sprite.body.position.x;
        posY=mongoles[j].sprite.body.position.y;
        arr[k]=Phaser.Math.distance(posX,posY,this.sprite.body.x,this.sprite.body.y);
        j++;
        k++;
    }
    k=0;
    disMin=arr[k];
    for(k=0;k<=(arr.length)-1;k++){
        if(arr[k]<disMin){
            disMin=arr[k];
            posMongol=k;
        }
    }
};


// Seek que dependiendo del valor de la bandera (2º parametro) huye (flee) o busca (seek) el objetivo (1º parametro)
IchigoRojo.prototype.seek = function (futuro,flee) {

    // VELOCIDAD DESEADA --> normalize(target - position) * max_velocity
    if(flee)
        var velDeseada = Phaser.Point.subtract(this.sprite.position, futuro); //Flee
    else
        var velDeseada = Phaser.Point.subtract(futuro, this.sprite.position); // Seek
    
    // Se normaliza la velocidad deseada
    velDeseada.normalize();
    
    // Multiplica por maxima velocidad.
    velDeseada.multiply(this.max_vel, this.max_vel);    

    //steering = desired_velocity - velocity
    var vecSteering = Phaser.Point.subtract(velDeseada, this.sprite.body.velocity);
    
    // Verifico que no supere la fuerza máxima --> steering = truncate (steering, max_force)    
    if (vecSteering.getMagnitudeSq() > (this.max_force*this.max_force)){ // sin multiplicar no anduvo
        vecSteering.setMagnitude(this.max_force);
    }
    
    // No tomamos en cuenta la masa. steering = steering / mass
        
    // velocity = truncate (velocity + steering , max_speed)
    this.sprite.body.velocity.add(vecSteering.x, vecSteering.y); // hace la suma: velocity + steering
    
    // luego si, verifica que no supere la velocidad maxima
    if (this.sprite.body.velocity.getMagnitudeSq() > (this.max_vel * this.max_vel)) {
        this.sprite.body.velocity.setMagnitude(this.max_vel);
    }
}
;
