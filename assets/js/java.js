
  // Initialize Firebase
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


  // 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstDepart = moment($("#firstDepart-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      firstDeparture: firstDepart,
      frequency: trainFreq
    };
    // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstDeparture);
  console.log(newTrain.frequency);

  //alert("New train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstDepart-input").val("");
  $("#frequency-input").val("");
});