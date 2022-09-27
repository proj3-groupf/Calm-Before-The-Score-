//Belly Button Biodiveversity App JavaScript file

//-----------------------------------------------------------------------------//

//function to get the data and plot the charts
function data_pull(selectionID) {
    d3.json("data/samples.json").then((data) => {
        console.log("samples.json from data_pull function:", data)

        var data4plots = data.samples;
        var testSubject = data4plots.filter(
            (sampleobject) => sampleobject.id == selectionID
        )[0];

        // Use the console to see what was saved in testSubject
        console.log("Samples from the testSubject filter:", testSubject);

        // Setting variables needed later
        var otuIDs = testSubject.otu_ids;
        var otuLabels = testSubject.otu_labels;
        var otuValues = testSubject.sample_values;

        //-----------------------------------------------------------------------------//
        // BAR CHART - trace for top 10 cultures

        var trace_bar = {
            x: otuValues.slice(0,10).reverse(),
            y: otuIDs
                .slice(0,10)
                .map((otuID) => `OTU ${otuID}`),
            text: otuLabels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: "#483d8b",
                width: 800,
            }
        };
    

        // Throw the bar chart data in an array
        var bardataArray = [trace_bar];

        // Formatting the bar plot
        var bar_plot_layout = {
            title: "<b>Top 10 Bacteria Cultures in the Navel</b>",
            xaxis: { autorange: true },

            yaxis: { autorange: true },
            margin: { t: 60, 1: 120 }
        };

        // Do the plotting!
        Plotly.newPlot("bar", bardataArray, bar_plot_layout);

        //-----------------------------------------------------------------------------//
        // BUBBLE CHART - display each sample

        var trace_bubble = {
            x: otuIDs,
            y: otuValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                color: otuIDs,
                size: otuValues,
                colorscale: "Jet",
            }
        };

        // Throw the bubble chart data in an array
        var bubbledataArray = [trace_bubble];

        // Formatting the bubble plot
        var bubble_plot_layout ={
            title: '<b>OTU Samples Collected</b>',
            xaxis: { title: "OTU ID "},
            yaxis: {title: "# of Collected Samples"},
            hovermode: "closest",
            //width: 1200,
            //height: 800,
            borderwidth: 20,
            bordercolor: "black",
        };

        // Do the plotting!
        Plotly.newPlot("bubble", bubbledataArray, bubble_plot_layout);
    });
}

//-----------------------------------------------------------------------------//
//METADATA - subject ID, ethnicity, gender, age, location, belly button type and wash frequency

function metadata_pull(selectionID) {
    d3.json("data/samples.json").then((data) => {
        var metadata4plots = data.metadata;
        var testSubjectmeta = metadata4plots.filter(
            (sampleobject) => sampleobject.id == selectionID
        )[0];

        var demo_info_box = d3.select("#sample-metadata");
        demo_info_box.html("");
        Object.entries(testSubjectmeta).forEach(([key, value]) => {
            demo_info_box.append("h5").text(`${key}: ${value}`);
        });
        //console.log("Samples from the demo_info_box:", demo_info_box);
        

        //-----------------------------------------------------------------------------//
        // GAUGE CHART - to show the wash frequency
        var data4gauge =  [{
            domain: { x: [0,1], y: [0,1]},
            value: testSubjectmeta.wfreq,
            text: testSubjectmeta.wfreq,
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 10 },
            gauge: {
                axis: { range: [0,9] },
                bar: { color: "white" },
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "red" },
                    { range: [1, 2], color: "firebrick" },
                    { range: [2, 3], color: "#ff8c00" },
                    { range: [3, 4], color: "yellow" },
                    { range: [4, 5], color: "green" },
                    { range: [5, 6], color: "blue" },
                    { range: [6, 7], color: "indigo" },
                    { range: [7, 8], color: "purple" },
                    { range: [8, 9], color: "violet" },
                ],
        },
    }, ]; 

        var gauge_plot_layout = {
            title: "<b>Navel Washing Frequency</b><br>(Scrubs Per Week)",
            //width: 600,
            //height: 400,
            margin: { t: 50, b: 5 },
            };
        
            // Do the Plotting
            Plotly.newPlot("gauge", data4gauge, gauge_plot_layout);
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
