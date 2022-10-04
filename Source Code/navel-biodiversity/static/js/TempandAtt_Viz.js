//Project 3 Group F - Visualizations App JavaScript file


//-----------------------------------------------------------------------------//
// VISUALIZATION - Attendance vs. Stadum Capacity by Game Week


// USE THIS CODE BELOW TO CONNECT TO FLASK API
// function data_pull(selectionID) {
//     d3.json("data/samples.json").then((data) => {
//         console.log("samples.json from data_pull function:", data)

        var nfl_db_var = nfl_db.GameKey;
        var cap_att_data = nfl_db_var.filter(
            (teamPick) => teamPick.HomeTeam == selectionID
        )[0];

        // Use the console to see what was saved in testSubject
        console.log("Home Team Selected:", cap_att_data);

        // Setting variables needed for Bar Chart
        var x_game_week = cap_att_data.Week;
        var y1_attendance = cap_att_data.Attendance;
        var y2_capacity = cap_att_data.Capacity;
        

        //-----------------------------------------------------------------------------//
        // GROUP BAR CHART - Trace1 for Attendance

        var trace_bar1 = {
            x: x_game_week.slice(0,10).reverse(),
            y: y1_attendance,
            type: "bar",
            //orientation: "h",
            marker: {
                color: "#483d8b",
                width: 800,
            }
        };
    
          // BAR CHART - Trace2 for capacity

          var trace_bar2 = {
            x: x_game_week.slice(0,10).reverse(),
            y: y2_capacity,
            type: "bar",
            //orientation: "h",
            marker: {
                color: "#483d8b",
                width: 800,
            }
        };  

        // Throw the bar chart data in an array
        var bardataArray = [trace_bar1, trace_bar2];

        // Formatting the bar plot
        var bar_plot_layout = {
            title: "<b>Attendance vs. Stadium Capacity by Game Week</b>",
            xaxis: { autorange: true },

            yaxis: { autorange: true },
            margin: { t: 60, 1: 120 }
        };

        // Do the plotting!
        Plotly.newPlot("bar", bardataArray, bar_plot_layout);

       


//-----------------------------------------------------------------------------//
//VISUALIZATION - LINE CHART - High and Low Forcast Temps by Game Week

//function metadata_pull(selectionID) {
  //  d3.json("data/samples.json").then((data) => {
        var high_low_db = nfl_db.Week;
        var high_low_data = high_low_db.filter(
            (teamPick) => teamPick.HomeTeam == selectionID
        )[0];

        // Setting variables needed for Line Chart
        var x_game_week = high_low_data.Week;
        var y1_high_temp = high_low_data.ForcastTempHigh;
        var y2_low_temp = high_low_data.ForcastTempLow;

        var trace_bar3 = {
            x: x_game_week,
            y: y1_high_temp,
            type: "scatter",
            marker: {
                color: "#483d8b",
                width: 800,
            }
        };
    
          // BAR CHART - Trace2 for capacity

          var trace_bar4 = {
            x: x_game_week,
            y: y2_low_temp,
            type: "scatter",
            marker: {
                color: "#483d8b",
                width: 800,
            }
        };  

        // Throw the bar chart data in an array
        var bardataArray = [trace_bar3, trace_bar4];

        // Formatting the bar plot
        var bar_plot_layout = {
            title: "<b>High vs. Low Temperature by Game Week</b>",
            xaxis: { autorange: true },

            yaxis: { autorange: true },
            margin: { t: 60, 1: 120 }

        };     
        
        // Do the Plotting
        Plotly.newPlot("scatter", data4gauge, gauge_plot_layout);
    });
}


//-----------------------------------------------------------------------------//
// Functions called in the index.html file

function init() {
    d3.json("data/samples.json").then(function(data) {
        console.log("samples.json from init function:", data);

        // Using D3 to select from a dropdown menu
        let DropDown = d3.select(`#selDataset`);

        // Enter the Sample Names into the dropdown menu
        data.names.forEach((name) => {
            DropDown.append(`option`).text(name).property(`value`, name);
        });

        // Get data from first sample to enter into the plots
        const first_sample = data.names[0];
        data_pull(first_sample);
        metadata_pull(first_sample);
    });
}

// When a new sample is selected, get new data
function optionChange(new_sample) {
    data_pull(new_sample);
    metadata_pull(new_sample);
}

// Dashboard Initialization
init();
