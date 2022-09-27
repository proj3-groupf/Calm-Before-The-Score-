# Web-Design-Challenge
Module 11 Web Design Challenge

### Background
Data becomes more powerful when you share it with others! That’s because people can use your data only if they can access it. So, you’ll use HTML and CSS to create a dashboard featuring the Latitude vs. X analysis of weather.
<img src=" /> latitude

### Instructions
Create a website by using either the visualizations that you created for your Python-APIs Challenge or the weather data and images that are provided for this Challenge. To do so, use the considerations and website requirements that the following subsections describe. Also, ensure that your repository has regular commits and a descriptive README.md file.

### Considerations
* Be aware that you must use Bootstrap. This includes using the Bootstrap navbar component for the header on every page, the Bootstrap grid for responsiveness on the comparison page, and the Bootstrap table component for the data page.

* Be aware that you must deploy your website to GitHub Pages, and that as a result, the website must work at a live, publicly accessible URL.

* Make sure to use a CSS media query that uses Bootstrap and/or @media for the navigation bar.

* Make sure that your website works at all window widths.

* Feel free to take some liberties with the visual aspects, but keep the core functionality the same as the instructions describe. (For example, keep the comparison visualizations on the comparison page.)

### Website Requirements

For reference, review the following ["Screenshots" section](#screenshots). 

The website must consist of seven pages in total, including:

* A [landing page](#landing-page) containing the following elements:

  * An explanation of the project

  * Links to each visualizations page. There should be a sidebar containing preview images of each plot. Clicking an image should take the user to that visualization.

* Four [visualization pages](#visualization-pages), stored in the `visualizations` folder, each with the following elements:

  * A descriptive title and heading tag.

  * The plot or visualization for the selected comparison (latitude vs: max temperature, humidity, cloudiness, or wind speed). The images displayed on these pages should be stored in the `assets/images` folder.

  * A paragraph describing the plot and its significance.

* A ["Comparisons" page](#comparisons-page) that does the following:

  * Contains all of the visualizations on the same page so they can easily be compared with each other.

  * Uses a Bootstrap grid for the visualizations.

    * The grid must be two visualizations across medium and large screens, and it must be one visualization across on extra-small or small screens.

* A ["Data" page](#data-page) that displays a responsive table containing the data used in the visualizations.

  * The table must be a Bootstrap table component. Refer to the [Bootstrap documentation](https://getbootstrap.com/docs/4.3/content/tables/#responsive-tables) for how to use responsive tables. 

  * The data must come from exporting the `.csv` file as HTML or by converting it to HTML. Try using a tool that you already know: Pandas. Pandas has a method, appropriately called `to_html`, that allows you to generate an HTML table from a Pandas DataFrame. To learn more, review the [documentation](https://pandas.pydata.org/pandas-docs/version/0.17.0/generated/pandas.DataFrame.to_html.html).

At the top of every page, the website must have a navigation menu with the following elements:

* It should have the name of the site on the left of the navigation bar, allowing users to return to the landing page from any page.

* It should contain a dropdown menu on the right of the navigation bar, named "Plots," to provide links to each individual visualization page.

* It should provide two more text links on the right: "Comparisons," which links to the comparisons page, and "Data," which links to the data page.

* It should be responsive (using media queries). The navigation bar must be similar to the screenshots in the ["Navigation Menu" section](#navigation-menu) (notice the background color change).

Finally, the website must be deployed to GitHub Pages.

Once finished, submit links to 1) the deployed app and 2) the GitHub repository.

Ensure your repository has regular commits and a descriptive `README.md` file.

### Considerations

* You may use the weather data you collected for the WeatherPy section of your Python-APIs Homework, or you may use the included [cities dataset](Resources/cities.csv) and pull the images from the [assets folder](Resources/assets).

* You must use Bootstrap. This includes using the Bootstrap `navbar` component for the header on every page, the Bootstrap table component for the data page, and the Bootstrap grid for responsiveness on the comparison page.

* You must deploy your website to GitHub Pages, with the website working on a live, publicly accessible URL as a result.

* Make sure to use a CSS media query that uses Bootstrap and/or `@media` for the navigation bar.

* Make sure that your website works at all window widths or sizes.

* Feel free to take some liberty in the visual aspects, but keep the  core functionality the same.
