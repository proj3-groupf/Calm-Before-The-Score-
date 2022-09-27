# Module 14 Assignment: Navel Biodiversity

Create an interactive dashboard to explore the Navel Biodiversity dataset, which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (known as operational taxonomic units, OTUs) were present in more than 70% of people, while the rest were relatively rare.

## Instructions
(summarized for length)

1. Use the D3 library to read the json file provided
2. Create a horizontal chart that corresponds with the drop down selection menu and display the top 10 OTUs found for that subject. Use the sample_values, otu_ids, and otu_labels for this graph.
3. Create a bubble chart to display each sample. Use otu_ids, sample values, and otu_labels.
4. Display the metadata for the selected subject.
5. Display the key-value pair from the metadata JSON object.
6. Update all the plots when a new sample is selected.
7. Deploy the app to Github.

## Advanced Challenge
Create a gauge chart to plot the weekly washing frequency of a subject. The gauge must change with the selection and match the "wfreq" in the metadata panel.

---

<img src="marj_dashboard.png">


## Code Theory
1. Copied over the files/folders from the starter code folder.
2. Determined what I'd need for this to work: 
    * index.html - for the dashboard
    * style.css - for the formatting
    * app.js - where the functions live to get and plot the data
    * samples.json - the raw data pulled in to plot
3. Looked through the html file to see how the layout would be for each field. The Javascript file was called at the end, so all the plots would come up after the fields in the html. Only the title field, menu selection, and Metadata info were listed in the DIVs. I moved straight to the app.js file.
4. In the app.js file, I had to create functions to pull the data from the json file using d3.json.
5. The first function was for the data pull and chart drawings.

    <img src="d3_json_example.png">

6. To check my work along the way, I used console.log. This was helpful when i started up the Live Server and opened the developer console. Adding the point at which each log was coming from, like the example above, gave me a great way to troubleshoot where I had issues.  The Developer Console also gives the line number, but it's easier to find if you throw in the function name.
7. Next up was filling variables with the samples information and with a filtered view which said: pull the data if the sample ID was equal to the selection the user made on the website.
8. More variables were added so I could call the otu_ids, otu_labels and sample values.
9. Next up, the bar chart.
    * I created an object to hold the plot data for our bar chart
    * I used slice() to pull the top 10 cultures from each subject that was chosen.
    * Threw the object into an array then made some formatting changes
    * Used Plotly to draw the chart.
10. Bubble chart was next, somewhat similar to the Bar chart
    * Created an object to hold the plot data
    * Included some formatting for the markers
    * Threw the object into an array and formatted. Found it was best to not set the width or height so the size could be set automatically.
    * Used Plotly to draw the chart.
11. The next function was to pull the metadata and display that on the dashboard. D3.json was used again and the selection from the webpage user was set equal to the subject.
12. Also used D3.select to match up the key values.
13. Threw another console.log in there to troubleshoot in the dev console.
14. Took on the gauge chart challenge. 
    * attempted an object within an array all in one pass.
    * had lots of fun with the colors.
    * Used Plotly to draw the chart
15. The final functions would be initialized and called the functions from up above. 

## Troubleshooting 
* Semicolons, colons, and commas can really screw up your code if they're not in the right place.
* VS Code is an incredibly helpful tool when it comes to keeping track of your brackets and parentheses. in several places, I missed a closing bracket and that caused all types of errors.
* The developer console in Chrome is also helpful as it will give a line number to look back at where an issue remains.


     

 





