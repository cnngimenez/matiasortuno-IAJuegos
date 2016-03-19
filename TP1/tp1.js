/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function alerta() {
    var band=true;
    var longitud = document.getElementById("i1").value.length;
    //Si la longitud del numero es menor a 4, debo seguir ingresando digitos
    if (longitud == 4) {
        //Si la longitud del numero ingresado llego a 4, entonces debo
        //generar el numero aleatorio,y luego realizar las verificaciones
        var x2 = document.getElementById("i1").value;
        band= verificar(x2);
        document.getElementById("i1").value="";
    }
    if(band==false){ 
        document.getElementById("intentosNum").value="";
        document.getElementById("num").value="";
        document.getElementById("intentosNum").innerHTML="";
        document.getElementById("jug").innerHTML="Felicitaciones!! Has ganado en "+document.getElementById("cont").value+" intentos!!";
        document.getElementById("val").value="";
        document.getElementById("cont").value=0;
    }
}

// Función que genera y retorna un número aleatorio de 4 cifras
function generarAleatorio() {
    var x = parseInt((Math.random() * 8999) + 1000);
    return x;
}

// Función que llama a realizar todas las verificaciones particulares entre nros
function verificar(n2) {
    document.getElementById("jug").innerHTML="Jugando...";
    var band=true;
    var bien = 0;
    var regular = 0;
    var mal = 0;
    
    //Si no se generó ya el número aleatorio, genero uno
    if((document.getElementById("val").value).length!=4){
    var n1=generarAleatorio(); 
    document.getElementById("val").value=n1;
    }
    
    //Separo los digitos (primero de los adivinados y luego del aleatorio,
    // y los almaceno en su respectivo arreglo
    var nAdivinados= separarDigitos(n2);
    document.getElementById("nAdivinado").innerHTML=nAdivinados;
//    console.log(nAdivinados);
    //Guardo el valor de el nro adivinado para mostrarlo antes de que se modifique
    document.getElementById("num").value=document.getElementById("num").value+" <br> "+"["+nAdivinados+"]";
    var num = document.getElementById("val").value;   
    var nAleatorios=separarDigitos(num);
//    console.log(nAleatorios);

    //verifico cuantos números están "bien"
    var res = verificarBien(nAdivinados, nAleatorios);
    bien = res[0].length;
//    console.log('Bien:'+ bien); 
    document.getElementById("bien").innerHTML=bien;
    nAdivinados = res[1];
//    console.log('nAdivinadosss despues de verificar bien:');
//    console.log(nAdivinados);
    
    //verifico cuántos números están "regulares"
    var res2 = verificarRegulares(nAdivinados, nAleatorios);
    regular = res2[0].length;
//    console.log('Regular:'+regular);
    document.getElementById("regular").innerHTML=regular;

    //Calculo cuántos números están mal
//    var mal = 4 - (res[0].length + res2[0].length);
    var mal = 4 - (bien + regular);
//    console.log('mal:'+ mal);
    document.getElementById("mal").innerHTML=mal;
    
    //Almacenando valores para mostrar por pantalla los datos
    document.getElementById("num").value=document.getElementById("num").value+"  "+"Bien:"+bien+" Regular:"+regular+ " Mal:"+mal;
    document.getElementById("num").innerHtml=document.getElementById("num").value;
//    console.log('valor de value:');
//    console.log(document.getElementById("num").value);
    
    console.log('valor de numerosIntenados:');
    document.getElementById("intentosNum").value=document.getElementById("num").value;
    document.getElementById("intentosNum").innerHTML=document.getElementById("intentosNum").value;
    console.log(document.getElementById("intentosNum").value);
    
    //Agrego la sección del contador
    document.getElementById("cont").value=parseInt(parseInt(document.getElementById("cont").value)+1);
    document.getElementById("nCont").innerHTML=document.getElementById("cont").value;
    
    //Si encontré que los 4 dígitos están bien, entonces corto
    if(bien==4){
        band=false;
    }
    return band;
}

//Función en la que ingresa un string con los 4 digitos de un número y 
//los separa almacenando cada uno en una posición distinta del arreglo, 
//retorna ese arreglo
function separarDigitos(n){
    var dad1 = parseInt(n % 10);
    var dad2 = parseInt((n % 100) / 10);
    var dad3 = parseInt((n / 100) % 10);
    var dad4 = parseInt(n / 1000);
    var nSeparados = [dad4, dad3, dad2, dad1];
    return nSeparados;
}

//Función que verifica cuántos dígitos del número a adivinar están bien, y los
//elimina del arreglo (nAdi) para verificar sólo los restantes luego, también
//retorna los dígitos que están bien en un arreglo nuevo (nBien).
function verificarBien(nAd, nAl) {
    var nBien = [];
    var nAdi = [], nAle = [];
    var resultados = [nBien, nAdi];
    var j = 0, k = 0;
    for (var i = 0; i < 4; i++) {
        if (nAd[i] == nAl[i]) {
            nBien[j] = nAd[i];
            j++;
        }
        else {
            nAdi[k] = nAd[i];
            k++;
        }
    }
    return resultados;
}

//Función que verifica cuántos números son regulares
function verificarRegulares(nAd, nAl) {
    var band=false;
    var nReg = [];
    var nAdi = [], nAle = [];
    var resultados = [nReg, nAd, nAl];
    var aux, k = 0;
    var longAd = nAd.length, longAl = nAl.length;
    for (var i = 0; i < longAd; i++) {
        for (var j = 0; j < longAl; j++) {
            if(band==false){
            if (nAd[i] == nAl[j]) {
                band=true;
                aux = nAd[i];
                nReg[k] = aux;
                k++;
            }
        }
        }
        band=false;
    }
    return resultados;
}