
var TrainData = new Firebase("https://brunoapp12345.firebaseio.com/");


$("#addTrain").on("click", function(){
console.log('this sentence right here')
    // Grabs user input
    var empName = $("#trainNameInput").val().trim();
    var empRole = $("#destinationInput").val().trim();
    var empStart = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
    console.log(empStart)
    var empRate = $("#frequencyInput").val().trim(); 



    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name:  empName,
        destination: empRole,
        firsttrain: empStart,
        frequency: empRate
    }

    // Uploads employee data to the database
    TrainData.push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination); 
    console.log(newTrain.firsttrain);
    console.log(newTrain.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    // Prevents moving to new page
    return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
TrainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().destination;
    var empStart= childSnapshot.val().firsttrain;
    var empRate = childSnapshot.val().frequency;

    // Train Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);
    // 
    


    var displayClock= moment().format('HH:mm');
    $('#display').text('Current Time: '+ displayClock);

    
    var calc= moment().diff(moment.unix(empStart),"minutes");
    var  f= moment().diff(moment.unix(empStart),"minutes") % empRate;
    var minAway= empRate-f; 
    var nextArrival= moment(
        ).add(minAway,'m').format('HH:mm');


    // Add each train's data into the table 
    $("#trainTable").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empRate + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

});

