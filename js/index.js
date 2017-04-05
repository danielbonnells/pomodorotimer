

$("#startButton").on("click", go);
$("#pauseButton").on("click", pause);

var soundPomo = new Howl({
  src: ['http://www.danielbonnells.com/ding.wav']
});


var startMilliseconds, start, finish;
var myVar, graphCall;
var timerIsOn = false;// timer is off
var pomoIsOn = true; // true means pomo is running
var breakIsOn = true; // true means break is not running
var pomoTime = document.getElementById("minutes").innerHTML;
var breakTime = document.getElementById("bMinutes").innerHTML;;
var timeType;
var everPaused = false; // has the pause been called? no
var timeRemainingMilliseconds;
var timeInitialPomo = document.getElementById("minutes").innerHTML;
var timeInitialBreak = document.getElementById("bMinutes").innerHTML;


function go(){
  
 start = new Date(); 
 startMilliseconds = start.getTime();
  
  if(pomoIsOn == true){
    
    timeType = pomoTime;
    
  }
  if(breakIsOn == false){
    
    timeType = breakTime;
    
  }
  
  amount = timeType;
  
   if(timerIsOn === false) {
  
    finish = new Date(startMilliseconds + (60000*timeType)).getTime();
  
     
       if(everPaused === true){

         finish = new Date(startMilliseconds + timeRemainingMilliseconds).getTime();

        }
  
     
  var amount = (timeType / 20)*60000;

  //console.log(amount);

  graphCall = setInterval(graphCounter, amount);   
     
  myVar = setInterval(timer, 100);
     
  }
  
  
}

var timeInMinutes;
var timeRemaining;

function timer(){
 
  $("#bar").css("display", "block");
  
  timerIsOn = true;
  
  var currentTime = new Date().getTime();
  
  // in seconds
  var differenceInTime = Math.floor(((finish - currentTime)/60000)*60);
  
  console.log(differenceInTime);
  // in milliseconds
  timeRemainingMilliseconds = differenceInTime * 1000;
  
  //console.log(differenceInTime,differenceInTime/20);
  
  timeInMinutes = Math.floor(differenceInTime/60);
  
  timeRemaining = differenceInTime - timeInMinutes * 60;
  
  if(timeRemaining < 10){
    var timetimetime =  "0" + timeRemaining;
     timeRemaining = timetimetime;
    
  }

  if(breakIsOn == false){ //break is running
    document.getElementById("bMinutes").innerHTML = timeInMinutes;
    document.getElementById("bSeconds").innerHTML = timeRemaining;
  } else if(pomoIsOn) {
    document.getElementById("minutes").innerHTML = timeInMinutes;
    document.getElementById("seconds").innerHTML = timeRemaining;
    
  } 
  console.log(timeInMinutes);
  
  if(differenceInTime < 0){
       if(breakIsOn == false){// break is running
      breakDone();
   
      
    // when pomo finishes do this
    } else if (pomoIsOn == true){
      pomoDone();
    
    }
    
    
  }
  
  if(timeRemaining < 2 && timeInMinutes < 1){
    
    // when break finishes do this
    if(breakIsOn == false){// break is running
      breakDone();
   
      
    // when pomo finishes do this
    } else if (pomoIsOn == true){
      pomoDone();
    
    }
 
  }
  
}

var numberOfPomos = 0;

function pomoDone(){
     document.getElementById("seconds").innerHTML = "00";
      console.log("Pomo done.");
    numberOfPomos++;
      document.getElementById("numberOfPomos").innerHTML = "Sessions Completed: " + numberOfPomos;
      mybreak();
      soundPomo.play();
     
}

function breakDone(){
      clearInterval(myVar);
      graphClear(); // clears graph
      document.getElementById("bSeconds").innerHTML = "00";
      breakIsOn = true;// break is no longer running
      pomoIsOn = true;// pomo is set to start
      timerIsOn = false;
      everPaused = false;
      timeType = timeInitialPomo;
      document.getElementById("minutes").innerHTML = timeInitialPomo;
      console.log("Break done.");
      soundPomo.play();
      go();
}

function mybreak(){
  
  graphClear(); // clears the div for the counter graph
  
  document.getElementById("bMinutes").innerHTML = timeInitialBreak; //sets html to init val
  
  timeType = timeInitialBreak;
   
  everPaused = false; //so pausing can occur 
  
  timerIsOn = false; // time can start from the beginning
  
  breakIsOn = false; //break is running
  
  pomoIsOn = false; // pomo is not running
  
  clearInterval(myVar); // stops previous setInterval
  
  go(); // calls go function
  
  
}

function pause() {
  
  everPaused = true;
   
  clearInterval(myVar);
  
  clearInterval(graphCall);
  
  $("#bar").css("display", "none");
  
  timerIsOn = false; 
}  

$("#incrementP").click(function(){
  
  if(timerIsOn == false){
  timeType = document.getElementById("minutes").innerHTML;
  pomoTime = timeType;
  pomoTime++;
  timeInitialPomo = pomoTime;
  document.getElementById("seconds").innerHTML = "00";
  document.getElementById("minutes").innerHTML = pomoTime;
  graphClear();
  if(breakIsOn == true){
  everPaused = false;
  }
  }
});

$("#decrementP").click(function(){
  if(timerIsOn == false){
  timeType = document.getElementById("minutes").innerHTML;
  pomoTime = timeType;
  if(pomoTime > 1){
  pomoTime--;
  }
  timeInitialPomo = pomoTime;
  document.getElementById("seconds").innerHTML = "00";
  document.getElementById("minutes").innerHTML = pomoTime;
  graphClear();
  everPaused = false;
  }
  
  
});

$("#incrementB").click(function(){
  if(timerIsOn == false){
  timeType = document.getElementById("bMinutes").innerHTML;
  breakTime = timeType;
  breakTime++;
  timeInitialBreak = breakTime;
  document.getElementById("bSeconds").innerHTML = "00";
  document.getElementById("bMinutes").innerHTML = breakTime;
  graphClear();
  everPaused = false;
    
  }
  
});

$("#decrementB").click(function(){
  if(timerIsOn == false){
  timeType = document.getElementById("bMinutes").innerHTML;
  breakTime = timeType;
  if(breakTime > 1){
  breakTime--;
  }
  timeInitialBreak = breakTime;
  document.getElementById("bSeconds").innerHTML = "00";
  document.getElementById("bMinutes").innerHTML = breakTime;
  graphClear();
  if(pomoIsOn == true){
  everPaused = false;
  }
    
  }
});


 
 
  


var graphCount = 0;

function graphCounter() {
  
  if(graphCount < 20){
    
  $("#bar div").removeClass("animated fadeIn infinite");  
    
  graphCount++;
  
  $("#bar").append('<div class="step animated fadeIn infinite"><div>');
      
    
  }
}

function graphClear() {
  
  graphCount = 0;
  
  clearInterval(graphCall);
  
  $("#bar").html('');
  
  $("#bar").append('<div class="step animated fadeIn infinite"><div>');
}

/*
- if pause calls clearInterval(), start should resume where pause left off unless the time is incremented/decremented
- once the pomodoro is done, the div.html should clear
- each addition should add the classes animated and fadeIn and infinite to the new div and when another one is done, the last child should have those classes removed
- try: when the timer starts, a line goes horizontally from where the start is to the end
- since we are always doing 20 little boxes, these shouldn't be difficult to figure out, just a simple animation

*/