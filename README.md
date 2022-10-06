# **Project 3**: The Calm Before the Score
<img src="Image%20Resources/giphy.gif" width=100% height=10%>

#### **Group Name**: 
Third and Long.

#### **Members**: 
Maheen Abdulwaheed, Gautam Iyer, Ashley Moore, Marjorie Muñoz, Elena Ortiz, Ami Patel, Sheyla Perez Nazco, Dantrell Person, Fannie Polcari, Austin Skorb, Daniel Webber.

<hr>

## **Table of Contents**

* [Project Materials](#project-materials)
* [Project Description](#project-description)
* [PART 1: ETL](#part-1-etl-the-data)
* [PART 2: Working with the Clean Data](#part-2-working-with-the-clean-data)
* [Final Website](#final-website)

<hr>

## **Project Materials**

- The Jupyter folder, which contains the [notebook](Jupyter%20notebook/NFL%20Dashboard.ipynb) where the ETL process was completed.
- The Flask App [folder](Flask_app), which contains:
    - The [app.py](Flask_app/app.py) script.
    - The [static](Flask_app/static/) folder, which contains the [JS code](Flask_app/static/js/) and the [css](Flask_app/static/css/style.css).
    - The [templates](Flask_app/templates/index.html) folder, which contains the [index.html](Flask_app/templates/index.html) file.
- The images [folder](Image%20Resources).
- The final [presentation](Project%20Proposal%20and%20Presentation).

<hr>

## **Project Description**
Traveling can be a stressful experience, even when visiting your favorite NFL team! From issues with weather, sold out games, and packed stadiums, we want to take some of the stress out of the equation. Our focus will be on making sure Football fans don’t have to worry as much during their stay at an NFL game. How can we make it easier for fans? 

With data, OF COURSE!

Using data, we will create a website for our customers using data from the 2021 NFL season. 
Fans will be able to select an NFL team and see things like previous attendance, weather history, and how their team performs in their home stadium. 
- Past attendance can be used to show which games pack out a stadium to aid customers in deciding which games to attend. 
- The weather history can give our customers a better understanding of what to wear, when planning months in advance. 
- Finally, the previous scores of the respective home teams give the ability to go to a game their team will more likely win.

This dashboard will help travelers keep their focus on what is important to their trip, football! 

<hr>

## **Part 1**: ETL the Data

### **Extract**
- For this project, we used the sportsdata [API](https://sportsdata.io/nfl-api), which provides real-time data for every NFL game. We used a [Jupyter Notebook](Jupyter%20notebook/NFL%20Dashboard.ipynb) to make 3 different calls to the API to get 2021 score [data](https://api.sportsdata.io/v3/nfl/scores/json/Scores/2021?key=ec966d78fab6468eaa542e1e7e883a44), stadium [data](https://api.sportsdata.io/v3/nfl/scores/json/Stadiums?key=ec966d78fab6468eaa542e1e7e883a44) and team [data](https://api.sportsdata.io/v3/nfl/scores/json/Teams/2021?key=ec966d78fab6468eaa542e1e7e883a44).

### **Transform**
- The score data was converted into a DataFrame which contained 272 rows (one for each game in the season). 
- The stadium data (50 rows) was merged into the score data using the "Stadium ID" field. This allowed us to get stadium information for each game played.
- The team data (32 rows) was then merged into the new DataFrame using the "HomeTeam" field. This allowed us to get different HomeTeam stats for each game played.
- Unnecessary columns were dropped from the dataset.

### **Load**
- The final dataset was loaded into MongoDB using pymongo:

    ```season_data.insert_many(nflDataFinalDF.to_dict('records'))```

<hr>

## **Part 2**: Working with the Clean Data

#### **Step 1**: Created an [app.py](/Flask_app/app.py) to use a Python Flask API that calls info from MongoDB and renders the index.html template.

#### **Step 2**: Created an [app.js](/Flask_app/static/js/app.js) to define functions which:
- Pull data from our Flask Powered API.
- Allow users to select their team.
- Plot a line graph of team scores for each home game.
    - **NEW JAVASCRIPT LIBRARY USED**: [CHARTS.JS](https://www.chartjs.org/)
- Plot a scatter chart for previous high and low forecasted temperatures. 
- Plot a bar chart for stadium capacity vs. game day attendance. 

#### **Step 3**: Modified the [index.html](/Flask_app/templates/index.html) file to include:
- A drop-down menu to pick a home team.
- A bootstrap powered navigation bar.
- Images and facts about the selected team.
- Our 3 visualizations. 

<hr>

## **Final Website**: 

All you have to do is SELECT A TEAM (e.g. The Falcons) AND HERE'S THE WEBSITE:

![](Image%20Resources/full-screen-visual.png)

Below are close-ups of the 3 visualizations created:

- Home Team vs. Away Team Scores:

    ![](Image%20Resources/ATL-Vis-1.png)
   
- High vs. Low Temperature by Game Week:

    ![](Image%20Resources/ATL-Vis-2.png)
    
- Attendance vs. Capacity by Game Week:

    ![](Image%20Resources/ATL-Vis-3.png)


