/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function alerta() {
    var band=true;
    //Repetir mientras la bandera esté en verdadero:
    //Obtengo la longitud del elemento que esta ingresando por teclado
    var longitud = document.getElementById("i1").value.length;
    //Si la longitud del numero es menor a 4, debo seguir ingresando digitos
    if (longitud == 4) {
        //Si la longitud del numero ingresado llego a 4, entonces debo
        //generar el numero aleatorio,y luego realizar las verificaciones
        var x2 = document.getElementById("i1").value;
        //Llamo a método para verificar igualdades
        //entre el número aleatorio generado, y el número ingresado por usuario
        band= verificar(x2);
        document.getElementById("i1").value="";
        //console.log('bandEnMain:'+band); 
    }
    if(band==false){ 
        //console.log('Finnnnn');
        document.writeln("Felicitaciones!! Has Ganado!!!");
    }
}

// Función que genera y retorna un número aleatorio de 4 cifras
function generarAleatorio() {
    var x = parseInt((Math.random() * 8999) + 1000);
    return x;
}


   // Función que llama a realizar todas las verificaciones particulares entre nros
function verificar(n2) {
    var band=true;
    var bien = 0;
    var regular = 0;
    var mal = 0;
    if((document.getElementById("val").value).length!=4){
    var n1=generarAleatorio();
        
    document.getElementById("val").value=n1;
//    console.log('valor del documento:');
//    console.log(document.getElementById("val").value);
    }
    
    //Separo los digitos y los almaceno en su arreglo
    var nAdivinados= separarDigitos(n2);
    document.getElementById("nAdivinado").innerHTML=nAdivinados;
    console.log(nAdivinados);
    
    //Guardo el valor de el nro adivinado para mostrarlo antes de que se modifique
    document.getElementById("num").value=document.getElementById("num").value+"  "+"["+nAdivinados+"]";

    var num = document.getElementById("val").value;   
    var nAleatorios=separarDigitos(num);
    
    console.log(nAleatorios);
    
    //NO MOSTRARR!!!
    //console.log(nAleatorios);
    
    var res = verificarBien(nAdivinados, nAleatorios);
    bien = res[0].length;
    console.log('Bien:'); 
    console.log(bien);
    document.getElementById("bien").innerHTML=bien;
    nAdivinados = res[1];
    
    var res2 = verificarRegulares(nAdivinados, nAleatorios);
    console.log('Regular:');
    console.log(res2[0].length);
    regular = res2[0].length;
    document.getElementById("regular").innerHTML=regular;

    var mal = 4 - (res[0].length + res2[0].length);
    console.log('mal:');
    console.log(mal);
    document.getElementById("mal").innerHTML=mal;
    
    
    //Almacenando valor para mostrar
    console.log('valor de value:');
    console.log(document.getElementById("num").value);
    document.getElementById("num").value=document.getElementById("num").value+"  "+"Bien:"+bien+" Regular:"+regular+ " Mal:"+mal;
    document.getElementById("num").innerHtml=document.getElementById("num").value;
    console.log('valor de value:');
    console.log(document.getElementById("num").value);
    
    console.log('valor de numerosIntenados:');
    document.getElementById("intentosNum").value=document.getElementById("num").value;
    document.getElementById("intentosNum").innerHTML=document.getElementById("intentosNum").value;
    console.log(document.getElementById("intentosNum").value);
    
    
    if(bien==4){
        band=false;
    }
    //console.log('band'+band);
    return band;

}

function separarDigitos(n){
    var dad1 = parseInt(n % 10);
    var dad2 = parseInt((n % 100) / 10);
    var dad3 = parseInt((n / 100) % 10);
    var dad4 = parseInt(n / 1000);
    var nSeparados = [dad4, dad3, dad2, dad1];
    return nSeparados;
}


function verificarBien(nAd,nAl){
    var nBien=[];
    var nAdi=[],nAle=[];
    var resultados=[nBien,nAdi,nAle];
    var j=0,k=0;
    for(var i=0;i<4;i++){
    if(nAd[i]==nAl[i]){
    nBien[j]=nAd[i];
    j++;
    }
    else{
        nAdi[k]=nAd[i];
        nAle[k]=nAl[i];
        k++;
    }
    
}
return resultados;
}

function verificarRegulares(nAd,nAl){
    var nReg=[];
    var nAdi=[],nAle=[];
    var resultados=[nReg,nAd,nAl];
    var aux,k=0;
    var longAd=nAd.length;
    console.log('longitud ad');
    console.log(longAd);
    for(var i=0;i<longAd;i++){
        for(var j=0;j<longAd;j++){
            if(nAd[i]==nAl[j]){
            aux=nAd[i];
            nReg[k]=aux;
            nAd.splice(i,1);
            console.log('---------')
            console.log(nAd);
            console.log('---------')
            nAl.splice(j,1);
            console.log('---------')
            console.log(nAl);
            console.log('---------')
            longAd=nAd.length;
            k++;
            i=0;
            j=0;
            }
            } 
        }
        return resultados;
        
   }
   