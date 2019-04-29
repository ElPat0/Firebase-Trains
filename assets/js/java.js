
  // firebase
  var config = {
    apiKey: "AIzaSyDIFUThU0RP9s6nXciNqnkXhl2eq9tvT0k",
    authDomain: "class-firebase-exercise.firebaseapp.com",
    databaseURL: "https://class-firebase-exercise.firebaseio.com",
    projectId: "class-firebase-exercise",
    storageBucket: "class-firebase-exercise.appspot.com",
    messagingSenderId: "165662759876"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  

    // time stuff
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

//var minTillDepart = trainFreq - timeRemain;
//console.log("MINUTES TILL DEPARTURE: " + minTillDepart);

//var nextTrain = moment().add(minTillDepart, "minutes");
//console.log("DEPARTURE TIME: " + moment(nextTrain).format("hh:mm"));




  


  // Button to add train
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstDepart = moment($("#firstDepart-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();

    var firstDepartPretty = moment.unix(firstDepart).format("HH:mm");

    var firstDepartConverted = moment(firstDepart, "HH:mm").subtract(1, "years");
    console.log(firstDepartConverted);
    var timeDiff = moment().diff(moment(firstDepartConverted), "minutes");
    console.log(timeDiff);
    var timeRemain = timeDiff % trainFreq;
    console.log(timeRemain);
    var minTillDepart = trainFreq - timeRemain;
    console.log("MINUTES TILL DEPARTURE: " + minTillDepart);

    var nextTrain = moment().add(minTillDepart, "minutes");
    console.log("DEPARTURE TIME: " + moment(nextTrain).format("HH:mm"));

    
  
    
    var newTrain = {
      name: trainName,
      destination: trainDest,
      firstDeparture: firstDepartPretty,
      frequency: trainFreq
    };
    
  database.ref().push(newTrain);


  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstDeparture)
  console.log(newTrain.frequency);

  

  // Clear input boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstDepart-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstDepart = childSnapshot.val().firstDeparture;
    var trainFreq = childSnapshot.val().frequency;
    
  
    
    console.log(trainName);
    console.log(trainDest);
    console.log(firstDepart);
    console.log(trainFreq);

    

    var firstDepartConverted = moment(firstDepart, "HH:mm").subtract(1, "years");
    console.log(firstDepartConverted);
    var timeDiff = moment().diff(moment(firstDepartConverted), "minutes");
    console.log(timeDiff);
    var timeRemain = timeDiff % trainFreq;
    console.log(timeRemain);
    var minTillDepart = trainFreq - timeRemain;
    console.log("MINUTES TILL DEPARTURE: " + minTillDepart);

    var nextTrain = moment().add(minTillDepart, "minutes");
    //nextTrain.format("HH:mm");
    console.log("DEPARTURE TIME: " + moment(nextTrain).format("HH:mm"));


   

  // make new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq + " minutes"),
    $("<td>").text(firstDepart),
    $("<td>").text(nextTrain),
    $("<td>").text(minTillDepart + " minutes"),
  );



  // Append new row
  $("#train-table > tbody").append(newRow);
});

