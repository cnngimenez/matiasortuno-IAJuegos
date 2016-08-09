/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function SomblaNegla(game, posx, posy, key, tipo) {
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
    
    this.cercanos=[];
    
    this.nopelea=1;
    
    //  this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    //this.sprite.scale.setTo(0.1, 0.1);

    this.game.physics.arcade.enable(this.sprite);

    this.sprite.body.collideWorldBounds = true;
    
    this.listo=0;
    this.posclave=0;
    this.primerPaso=0;

    //    this.cuad1=new Phaser.Point(270, 367);
    //this.cuad2=new Phaser.Point(644, 367);
    //this.cuad3=new Phaser.Point(1096, 367);
    //this.cuad4=new Phaser.Point(1650, 367);
    //this.cuad5=new Phaser.Point(270, 920);
    //this.cuad6=new Phaser.Point(644, 920);
    //this.cuad7=new Phaser.Point(1096, 920);
    //this.cuad8=new Phaser.Point(1650, 920);
    
    this.sprite.animations.add('right', [1], 7, true);
    this.sprite.animations.add('left', [0], 7, true);
    
    return this;
}
//Behavior_Cursor.prototype= Object.create(Behavior.prototype);//Degfino que es sub clase de Sprite.
SomblaNegla.prototype.constructor = SomblaNegla;

// Para que al frenar quede hacia donde iba.
var ultimo = 'right';
var ultimoA = 'left';



SomblaNegla.prototype.update = function () {

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    
    //if(this.tipo)
        this.plan();
    /*else
    {
    
    // PERSECUCION
    if(score[this.tipo] > 25){
        this.target=princes;
        //console.log("Persiguiendo a la princesa." + princes.sprite.body.position);   
        this.seek(princes.sprite.body.position,false);
    }
    else{
        this.seek(this.masCercano().sprite.position,false);
        
    }
   
   
    if(this.sprite.body.velocity.x > 0)
        this.sprite.animations.play('right');
    else
        this.sprite.animations.play('left');
    }
*/

}

SomblaNegla.prototype.plan = function(){
    
    //console.log(this.sprite.body.position);
    var punt=score[this.tipo];
    
    if(punt>25)
        this.listo=1;
    
    if(this.primerPaso&&this.sprite.position.x<=940&&punt>25)
        this.posclave=1;
    
    if(this.sprite.position.y<=380&&this.listo)
        this.primerPaso=1;
        
    var mog=this.masCercano();
    if(!this.listo)
    {
        if(this.distanciaA(mog)<100)
        {
            this.seek(mog.sprite.position,false);
        }
        else
        {
            var irCuadrante=this.cuadrante();
            var miCuadra=this.miCuadrante();
            if(punt<=19)
            {
                              
                //console.log(this.puntoCuadrante(irCuadrante));
                
                if(irCuadrante==1||irCuadrante==2||irCuadrante==3||irCuadrante==4)
                {
                    if(miCuadra==7||miCuadra==8){
                        if(this.sprite.position.y<=920&&(this.sprite.position.x<1200||this.sprite.position.y<=650))
                            this.seek(this.puntoCuadrante(irCuadrante),false);//irCuadrante
                        else
                            this.seek(this.puntoCuadrante(7),false);
                    }
                    else
                    if(miCuadra==5||miCuadra==6){
                        if(this.sprite.position.y<=930&&(this.sprite.position.x>600))
                            this.seek(this.puntoCuadrante(irCuadrante),false);//irCuadrante
                        else
                        this.seek(this.puntoCuadrante(6),false);
                    }
                    else
                        this.seek(this.puntoCuadrante(irCuadrante),false);
                }
                else
                    
                    this.seek(this.puntoCuadrante(irCuadrante),false);
            }
            else
            {
                //if(punt<=19)
                //{
                    if(miCuadra==7||miCuadra==8)
                        if(this.sprite.position.x>1100)
                            this.seek(new Phaser.Point(1096, 920),false);
                        else
                            this.seek(this.puntoCuadrante(3),false);
                    else
                    {
                    if(miCuadra==5||miCuadra==6)
                    {
                        if(this.sprite.position.x<640)
                            this.seek(new Phaser.Point(644, 920),false);
                        else
                            this.seek(this.puntoCuadrante(3),false);
                    }
                    else
                        this.seek(this.puntoCuadrante(this.masCercano().sprite.position),false);
                    }
                    
                //}
                //else
                //{
                    //if(this.sprite.position.y<=910&&(this.sprite.position.x<1200||this.sprite.position.x>=640))
                      //  this.seek(new Phaser.Point(1096, 367),false);
                //}
            }
        }
    }
    else
    {
        if(this.posclave)
        {
            this.seek(princes.sprite.body.position,false);
        }
        else
        {    
            //console.log(this.primerPaso);
            if(!this.primerPaso){
                if(miCuadra==7||miCuadra==8){
                    if(this.sprite.position.x<1050)
                    {//console.log("lalal");
                        this.seek(new Phaser.Point(1000, 367),false);
                    }
                    else    
                        this.seek(new Phaser.Point(1096, 920),false);
                }
                else
                    this.seek(new Phaser.Point(1096, 367),false);
                
            }
            else
                this.seek(new Phaser.Point(938, 360),false);
            
        }
    }

}
//SomblaNegla.prototype.terminar = function(){
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
SomblaNegla.prototype.seek = function (futuro,flee) {

    //console.log(mundo);
    
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
SomblaNegla.prototype.masCercano = function ()
{
    var menor=2000;
    var mong;
    for(var i=0;i<mongoles.length;i++)
    {
        var dist=this.distanciaA(mongoles[i]);
        if(dist<menor&&mongoles[i].sprite.alive)
        {
            mong=mongoles[i];
            menor=dist;
        }
        //this.cercanos.sort(function(a,{  return (a.z === b.z) ? (a.id - b.id) : (a.z - b.z);}));
    }
    return mong;
}
/*SomblaNegla.prototype.planeamiento=function(listVisitados,puntajeActual)
    {
        var mejorCamino=[];
        var menorDistancia;
        var puntajeActual;
        
        for(var i=0;i<mongoles.length;i++)
        {
            if(listVisitados.indexOf(mongoles[i])==-1)
            {
                listVisitados[listVisitados.lenght]=mongoles[i];
                puntajeActual=puntajeActual+mongoles[i].puntaje;
                
                this.planeamiento(listVisitados,puntajeActual)
            }
            
                //console.log(visitados.indexOf(mongoles[2]));
            
        }

    }*/
SomblaNegla.prototype.distanciaEntre=function(mongol1,mongol2)
{
    var dx = mongol1.sprite.x - mongol2.sprite.x;
    var dy = mongol1.sprite.y - mongol2.sprite.y;
    return Math.sqrt((dx * dx) + (dy * dy));
}
SomblaNegla.prototype.distanciaA=function(mongol)
{
    var dx = mongol.sprite.x - this.sprite.x;
    var dy = mongol.sprite.y - this.sprite.y;
    return Math.sqrt((dx * dx) + (dy * dy));
}
SomblaNegla.prototype.cuadrante=function()
{
    var c1=0,c2=0,c3=0,c4=0,c5=0,c6=0,c7=0,c8=0;
    
    
    for(var i=0;i<mongoles.length;i++)
    {
        var punto=new Phaser.Point(0, 0);
        var mong=mongoles[i].sprite;
        if(mong.x<940)
        {
            if(mong.x<470)
            {
                if(mong.y<495)
                    c1++;
                else
                    c5++;
            }
            else
            {
                 if(mong.y<495)
                    c2++;
                else
                    c6++;
            }
        }
        else
        {
            if(mong.x<1400)
            {
                if(mong.y<495)
                    c3++;
                else
                    c7++;
            }
            else
            {
                 if(mong.y<495)
                    c4++;
                else
                    c8++;
            }
        }
        
    }
    //console.log(c1+" . "+c2+" . "+c3+" . "+c4+" . "+c5+" . "+c6+" . "+c7+" . "+c8);
    var temp=[c1,c2,c3,c4,c5,c6,c7,c8];
    var mas=0,cua;    
    for(var i=0;i<8;i++)
    {
        if(temp[i]>mas)
        {
            mas=temp[i];
            cua=i;
        }
    }
    return cua+1;
};
SomblaNegla.prototype.puntoCuadrante=function(val)
{
    var cuad1=new Phaser.Point(270, 367);
//    var cuad2=new Phaser.Point(644, 367);
//    var cuad3=new Phaser.Point(1096, 367);
//    var cuad4=new Phaser.Point(1650, 367);
//    var cuad5=new Phaser.Point(270, 920);
//    var cuad6=new Phaser.Point(644, 920);
//    var cuad7=new Phaser.Point(1096, 920);
//    var cuad8=new Phaser.Point(1650, 920);
    
    if(val==1)
    {
        cuad1.x=270;
        cuad1.y=367;
    }
    if(val==2){
        cuad1.x=644;
        cuad1.y=367;
    }
    if(val==3){
        cuad1.x=1096;
        cuad1.y=367;
    }
    if(val==4)
        {
        cuad1.x=1650;
        cuad1.y=367;
    }
    if(val==5)
       {
        cuad1.x=270;
        cuad1.y=920;
    }
    if(val==6)
       {
        cuad1.x=644;
        cuad1.y=920;
    }
    if(val==7)
        {
        cuad1.x=1096;
        cuad1.y=920;
    }
    if(val==8)
        {
        cuad1.x=1650;
        cuad1.y=920;
    }
        
        return cuad1;
};
SomblaNegla.prototype.miCuadrante=function()
{
    var ret=0;
    if(this.sprite.x<940)
        {
            if(this.sprite.x<470)
            {
                if(this.sprite.y<495)
                    return 1;
                else
                    return 5;
            }
            else
            {
                 if(this.sprite.y<495)
                    return 2;
                else
                    return 6;
            }
        }
        else
        {
            if(this.sprite.x<1400)
            {
                if(this.sprite.y<495)
                    return 3;
                else
                   return 7;
            }
            else
            {
                 if(this.sprite.y<495)
                    return 4;
                else
                    return 8;
            }
        }
}

