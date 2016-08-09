/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Behavior_Ninja(game, posx, posy, key, tipo) {
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
    
    //  this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    //this.sprite.scale.setTo(0.1, 0.1);

    this.game.physics.arcade.enable(this.sprite);

    this.sprite.body.collideWorldBounds = true;

//    this.sprite.animations.add('right', [3, 4, 5], 7, true);
//    this.sprite.animations.add('left', [0, 1, 2], 7, true);
    
    this.sprite.animations.add('right', [1], 7, true);
    this.sprite.animations.add('left', [0], 7, true);
    
    return this;
}
//Behavior_Cursor.prototype= Object.create(Behavior.prototype);//Degfino que es sub clase de Sprite.
Behavior_Ninja.prototype.constructor = Behavior_Ninja;

// Para que al frenar quede hacia donde iba.
var ultimo = 'right';
var ultimoA = 'left';

Behavior_Ninja.prototype.update = function () {

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    // PERSECUCION
    var i=0;
    while (i<mongoles.length && mongoles[i].nopeleo === 0 )
        i++;

    if(i==mongoles.length || score[this.tipo] > 25){
        this.target=princes;
        console.log("Persiguiendo a la princesa.");   
        this.seek(princes.sprite.body.position,false);
    }
    else{
        this.target=mongoles[i];  
        console.log("Persiguiendo al mongol: "+i);
        this.seek(this.target.sprite.body.position,false);
    }
   
    if(this.sprite.body.velocity.x > 0)
        this.sprite.animations.play('right');
    else
        this.sprite.animations.play('left');



}

//Behavior_Ninja.prototype.terminar = function(){
//    
//    this.sprite.body.velocity=0;
//    if(ultimoA === 'right'){
//        // Cuando para "mira" .
//            this.sprite.animations.frame = 3;
//        }
//        else{
//            this.sprite.animations.frame = 0;
//        }
//}

// Seek que dependiendo del valor de la bandera (2º parametro) huye (flee) o busca (seek) el objetivo (1º parametro)
Behavior_Ninja.prototype.seek = function (futuro,flee) {

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