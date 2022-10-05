//Belly Button Biodiveversity App JavaScript file

//function to get the data and plot the charts
function data_pull(selectionID) {
  d3.json("/data").then((data) => {
    var gameData = data;
    console.log("NFL game data pulled from Flask API", data)
  var teamSelect = document.querySelector("#team_select");
  var type = document.querySelector("#type");
  console.log(teamSelect)
  teamSelect.addEventListener("change", function(event) {
    console.log(event)
    var team = event.target.value;
    var selectedType = type.value;
    var homeTeamGames = gameData.filter(function(game) {
      return team === game.HomeTeam
    });

    // var homeTeamScores = homeTeamGames.map(game => game.HomeScore);
    var selectedHomeTeamValue = homeTeamGames.map(game => game[selectedType])
    console.log(selectedHomeTeamValue)

    console.log("Home Team Games", homeTeamGames)
  })
  });


  var data = {
    // A labels array that can contain any sort of values
    labels: [gameData.Date],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      gameData.HomeScore
    ]
  };
  
  // As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
  // as you saw in the previous example
  var options = {
    width: 300,
    height: 200
  };
  
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object. As a third parameter we pass in our custom options.
  new Chartist.Line('.ct-chart', data, options);


}

data_pull()

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



