//Belly Button Biodiveversity App JavaScript file

//function to get the data and plot the charts
function data_pull(selectionID) {
  d3.json("/data").then((data) => {
    console.log("NFL game data pulled from Flask API", data)
    console.log(data[272].homeTeams);

  // pull the data into a variable
  var data4plots = data[272].wklyScores;
  var selectedTeam= data4plots.filter(
    (sampleobject) => sampleobject.homeTeam == selectionID
  )[0];
  // Use the console to see what was saved in testSubject
  console.log("Weekly Scores documeny from Mongo", data4plots);
  // Setting variables needed later
  var score = selectedTeam.scores;
  var gameWeek = data[272].gameWeeks;
  console.log("game weeks", gameWeek);
  console.log("Weekly Scores", score);

  // -------------------------------------- Creating Line Chart----------------------------------------------------------------------------

// // --------------------------------Creating Dropdown ----------------------------------

//-----------------------------------------------------------------------------//
// Functions called in the index.html file

function init() {
    d3.json("/data").then(function(data) {
        console.log("samples.json from init function:", data);

        // Using D3 to select from a dropdown menu
        let DropDown = d3.select(`#selDataset`);

        // Enter the Sample Names into the dropdown menu
        data[272].homeTeams.forEach((homeTeam) => {
            DropDown.append(`option`).text(homeTeam).property(`value`, homeTeam);
        });

        // Get data from first sample to enter into the plots
        const first_sample = data[272].homeTeams[0];
        data_pull(first_sample);
        // metadata_pull(first_sample);
    });
}

// When a new sample is selected, get new data
function optionChange(new_sample) {
    data_pull(new_sample);
    // metadata_pull(new_sample);
}

// Dashboard Initialization
init();




