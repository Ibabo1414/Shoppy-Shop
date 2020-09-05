let secondes = 0;
let timer;
let pause = false;
let text = "";   
  
function IndiquerMinutes(min) {
  secondes = min * 60;
}


function Chrono(){
  if(secondes>0){ //******* SI TEMPS
    let minutes = Math.floor(secondes/60);
    let heures = Math.floor(minutes/60);
    secondes -= minutes * 60;
    
    if(heures>0){ // si c'est en heure
      minutes -= heures * 60;
      minutes = minutes + (heures * 60);
      secondes = secondes + (minutes * 60) - 1;
    }//if heures >0
    

    else if(minutes<10 && secondes>9) {
      text = '0' + minutes + ' : ' + secondes;
      secondes = secondes + (minutes * 60) - 1;
    }
    
    else if (minutes>9 && secondes<10){
      text = minutes + ' : ' + '0'+ secondes;
      secondes = secondes + (minutes * 60) - 1;
    }
    
    else if (minutes<10 && secondes<10){
      text = '0' + minutes + ' : ' + '0' + secondes;
      secondes = secondes + (minutes * 60) - 1;
    }
    
    //******* SI TEXTE = MINUTE + SECOND
    else {
      text = minutes + ' : ' + secondes;
      secondes = secondes + (minutes * 60) - 1;
    }
  }//if secondes>0


    else { //******* SI PAS TEMPS
      clearInterval(timer);
      text = "00 : 00";
    }//else

    $('#chrono').html(text);
  }//if final

//******* SI TIME = CHRONO
function DemarrerChrono(){
  timer = setInterval('Chrono()', 1000);
}
  IndiquerMinutes(timerPartie.temps.value);
  DemarrerChrono();
