//function to get the data and plot the charts
function data_pull(selectionID) {
  d3.json("/data").then((data) => {
    var gameData = data;
    var teamSelect = document.querySelector("#team_select");
    var type = document.querySelector("#type");
    teamSelect.addEventListener("change", function (event) {
      var team = event.target.value;
      //var selectedType = type.value;
      var homeTeamGames = gameData.filter(function (game) {
        return team === game.HomeTeam
      });

      // home and away scores
      var homeScore = homeTeamGames.map(game => game.HomeScore);
      var awayScore = homeTeamGames.map(game => game.AwayScore);
  
      // -------------------------------------------Sessy Chart JS Graph Begin --------------------------------------------------------
      // Couldn't get Chart JS to work like plotly did below, so that's wha the code is here
      // setup block
      const data = {
        labels: ['wk1', 'wk2', 'wk3', 'wk4', 'wk5', 'wk6', 'wk7', 'wk8'],
        datasets: [
          {
            label: 'HomeTeam',
            data: homeScore,
            borderColor: 'rgb(255,192,203)',
            backgroundColor: 'rgb(255,105,180)',
          },
          {
            label: 'AwayTeam',
            data: awayScore,
            borderColor: 'rgb(255,250,205)',
            backgroundColor: 'rgb(255,228,196)',
          }
        ]
      
      }
  
      // config block
      const config = {
        type: 'line',
        data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
      }
      // destroy chart when new selection is chosen so it can rebuild canvas
      let chartStatus = Chart.getChart("myChart"); // <canvas> id
      if (chartStatus != undefined) {
        chartStatus.destroy();}
  
      // init block  
      myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
  
    // -------------------------------------------Sessy Chart JS Graph Begin--------------------------------------------------------
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

      var dataByTeam = scatterData.filter(
        (game) => game.HomeTeam == selectedTeam
      );
      // Setting variables needed for Line Chart
      var y1HighTemp = dataByTeam.map(game => game.ForecastTempHigh);
      var y2LowTemp = dataByTeam.map(game => game.ForecastTempLow);

      var traceLineHigh = {
        x: y1HighTemp.map((temp, index) => 'wk ' + (index + 1)),
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
        x: y2LowTemp.map((temp, index) => 'wk ' + (index + 1)),
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
        title: "<b>High vs. Low Temperature by Game Week</b>",
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
    var y1Attendance = dataByTeam.map(game => game.Attendance);
    var y2Capacity = dataByTeam.map(game => game.Capacity);

    var traceAttendance = {
      x: y1Attendance.map((temp, index) => 'wk ' + (index + 1)),
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
      x: y2Capacity.map((temp, index) => 'wk ' + (index + 1)),
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
      title: "<b>Attendance vs. Capacity by Game Week</b>",
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
    d3.select('#stadium_name').text("Stadium Name: " + dataByTeam[0].Name_x);
    d3.select('#capacity').text("Capacity: " + dataByTeam[0].Capacity);
    d3.select('#city_state').text("City, State: " + dataByTeam[0].City_y + ", " + dataByTeam[0].State);
    d3.select('#turf_type').text("Turf Type: " + dataByTeam[0].PlayingSurface);
    d3.select('#stadium_type').text("Stadium Type: " + dataByTeam[0].Type);
  });
}
  


}
data_pull()