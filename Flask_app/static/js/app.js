//function to get the data and plot the charts
function data_pull(selectionID) {
  d3.json("/data").then((data) => {
    var gameData = data;
    var teamSelect = document.querySelector("#team_select");
    var type = document.querySelector("#type");
    teamSelect.addEventListener("change", function (event) {
      var team = event.target.value;
      var selectedType = type.value;
      var homeTeamGames = gameData.filter(function (game) {
        return team === game.HomeTeam
      });

      var homeTeamScores = homeTeamGames.map(game => game.HomeScore);
      var selectedHomeTeamValue = homeTeamGames.map(game => game[selectedType])
      scatterdata_pull(team)
      bardata_pull(team)
      demodata_pull(team)
    })
  });

  //-----------------------------------------------------------------------------//
  //VISUALIZATION - SCATTER CHART - High and Low Forcast Temps by Game Day

  function scatterdata_pull(selectedTeam) {
    d3.json("/data").then((data) => {
      var scatterData = data;
      console.log("NFL data pulled for Scatter Plot", scatterData)

      var dataByTeam = scatterData.filter(
        (game) => game.HomeTeam == selectedTeam
      );
      // Setting variables needed for Line Chart
      var xGameWeek = dataByTeam.map(game => game.Date);
      var y1HighTemp = dataByTeam.map(game => game.ForecastTempHigh);
      var y2LowTemp = dataByTeam.map(game => game.ForecastTempLow);

      var traceLineHigh = {
        x: xGameWeek,
        y: y1HighTemp,
        type: "scatter",
        name: 'High Temp',
        marker: {
          color: "red",
          width: 800,
        }
      };

      // Line Chart - Trace2 for capacity

      var traceLineLow = {
        x: xGameWeek,
        y: y2LowTemp,
        type: "scatter",
        name: 'Low Temp',
        marker: {
          color: "blue",
          width: 800,
        }
      };
      // Throw the bar chart data in an array
      var lineDataArray = [traceLineHigh, traceLineLow];

      // Formatting the bar plot
      var linePlotLayout = {
        title: "<b>High vs. Low Temperature by Game Day</b>",
        xaxis: { autorange: true },

        yaxis: { autorange: true },
        margin: { t: 60, 1: 120 }

      };

      // Do the Plotting
      Plotly.newPlot("scatter", lineDataArray, linePlotLayout);
    });
  }
// ----------------------------------------------------------------------------------------//
//VISUALIZATION - BAR CHART - Attendance vs Capacity by Game Day
function bardata_pull(selectedTeam) {
  d3.json("/data").then((data) => {
    var barData = data;
    console.log("NFL data pulled for Bar Chart", barData)

    var dataByTeam = barData.filter(
      (game) => game.HomeTeam == selectedTeam
    );
    // Setting variables needed for Line Chart
    var xGameWeek = dataByTeam.map(game => game.Date);
    var y1Attendance = dataByTeam.map(game => game.Attendance);
    var y2Capacity = dataByTeam.map(game => game.Capacity);

    var traceAttendance = {
      x: xGameWeek,
      y: y1Attendance,
      type: "bar",
      name: 'Attendance',
      marker: {
        color: "pink",
        width: 800,
      }
    };

    // Line Chart - Trace2 for capacity

    var traceCapacity = {
      x: xGameWeek,
      y: y2Capacity,
      type: "bar",
      name: 'Capacity',
      marker: {
        color: "cyan",
        width: 800,
      }
    };
    // Throw the bar chart data in an array
    var barDataArray = [traceAttendance, traceCapacity];

    // Formatting the bar plot
    var barPlotLayout = {
      title: "<b>Attendance vs. Capacity by Game Day</b>",
      xaxis: { autorange: true },

      yaxis: { autorange: true },
      margin: { t: 60, 1: 120 }

    };

    // Do the Plotting
    Plotly.newPlot("bar", barDataArray, barPlotLayout);
  });
}

// ----------------------------------------------------------------------------------------//
//VISUALIZATION - BAR CHART - Attendance vs Capacity by Game Day
function demodata_pull(selectedTeam) {
  d3.json("/data").then((data) => {
    var demoData = data;
    console.log("NFL data pulled for Demo Table", demoData)

    var dataByTeam = demoData.filter(
      (game) => game.HomeTeam == selectedTeam
    );
    d3.select('#team_logo').attr("src", dataByTeam[0].WikipediaLogoUrl);
    d3.select('#team_name').attr("src", dataByTeam[0].WikipediaWordMarkUrl);
    //d3.select('#staidum_name').text("Stadium Name: " + dataByTeam[0].);
    d3.select('#capacity').text("Capacity: " + dataByTeam[0].Capacity);
    d3.select('#city_state').text("City, State: " + dataByTeam[0].City_y + ", " + dataByTeam[0].State);
    d3.select('#turf_type').text("Turf Type: " + dataByTeam[0].PlayingSurface);
    d3.select('#stadium_type').text("Stadium Type: " + dataByTeam[0].Type);
  });
}
  
  // var data = {
  //   // A labels array that can contain any sort of values
  //   labels: [gameData.Date],
  //   // Our series array that contains series objects or in this case series data arrays
  //   series: [
  //     gameData.HomeScore
  //   ]
  // };

  // // As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
  // // as you saw in the previous example
  // var options = {
  //   width: 300,
  //   height: 200
  // };

  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object. As a third parameter we pass in our custom options.
  //new Chartist.Line('.ct-chart', data, options);


//}

//data_pull()

// -------------------------------------- Creating Line Chart----------------------------------------------------------------------------

// // --------------------------------Creating Dropdown ----------------------------------

//-----------------------------------------------------------------------------//
// Functions called in the index.html file

// function init() {
//   d3.json("/data").then(function (data) {
//     // console.log("samples.json from init function:", data);

//     // Using D3 to select from a dropdown menu
//     let DropDown = d3.select(`#selDataset`);

//     // Enter the Sample Names into the dropdown menu
//     data[272].homeTeam.forEach((homeTeam) => {
//       DropDown.append(`option`).text(homeTeam).property(`value`, homeTeam);
//     });

//     // Get data from first sample to enter into the plots
//     const first_sample = data[272].HomeTeam[0];
//     data_pull(first_sample);
//     // metadata_pull(first_sample);
//   });
// }

// // When a new sample is selected, get new data
// function optionChange(new_sample) {
//   data_pull(new_sample);
//   // metadata_pull(new_sample);
// }

// // Dashboard Initialization
// init();
}
data_pull()