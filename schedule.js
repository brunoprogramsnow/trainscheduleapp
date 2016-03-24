//Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new employees - then update the html + update the database
3. Create a way to retrieve employees from the employee database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed

*/
// 1. Link to Firebase
var TrainData = new Firebase("https://brunoapp12345.firebaseio.com/");

// 2. Button for adding Trains
$("#addTrain").on("click", function(){

    // Grabs user input
    var empName = $("#trainNameInput").val().trim();
    var empRole = $("#destinationInput").val().trim();
    var empStart = moment($("#startInput").val().trim(), "DD/MM/YY").format("X");
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
    

    var displayClock= moment().format('HH:MM');
    $('#display').text('Current Time: '+ displayClock);


    
    var calc= moment().diff(moment.unix(empStart),"minutes");
    var nextArrival= moment().diff(moment.unix(empStart),"minutes") % empRate;
    var minAway= empRate-nextArrival;


    // Add each train's data into the table 
    $("#trainTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empRate + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

});

