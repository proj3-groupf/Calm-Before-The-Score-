# Project 3: The Calm Before the Score
<img src="Image%20Resources/giphy.gif" width=100% height=10%>
<br>
Group Name: Third and Long.
<br>
Members: Maheen Abdulwaheed, Gautam Iyer, Ashley Moore, Marjorie Muñoz, Elena Ortiz, Ami Patel, Sheyla Perez Nazco, Dantrell Person, Fannie Polcari
Austin Skorb, Daniel Webber.

<hr>

## Table of Contents

* [Project Description](#project-description)
* [PART 1: ETL](#part-1-etl-the-data)

## **Project Description**
Traveling can be one of the most stressful experiences we can encounter. From issues with weather, airlines, the locals, we want to take some of that stress out of the equation.  Our focus will be on making sure our customers don’t have to worry during their stay at an NFL game.

This will be accomplished through the usage of a dashboard. Customers will be able to see things like attendance, previous weather history, and how the team performs in their home stadium. Past attendance can be used to show which games pack out a stadium to aid customers in deciding which games to attend. The weather history can give our customers a better understanding of what to wear, when planning months in advance. Finally, the previous scores of the respective home teams give the ability to go to a game their team will more likely win. This dashboard will help travelers keep their focus on what is important to their trip, football! 


## **Part 1**: ETL the Data

### Extract
- For this project, we used the sportsdata [API](https://sportsdata.io/nfl-api), which provides real-time data for every NFL game. We used a [Jupyter Notebook](NFL%20Dashboard.ipynb) to make 3 different calls to the API to get 2021 score [data](https://api.sportsdata.io/v3/nfl/scores/json/Scores/2021?key=ec966d78fab6468eaa542e1e7e883a44), stadium [data](https://api.sportsdata.io/v3/nfl/scores/json/Stadiums?key=ec966d78fab6468eaa542e1e7e883a44) and 2021 team [data](https://api.sportsdata.io/v3/nfl/scores/json/Teams/2021?key=ec966d78fab6468eaa542e1e7e883a44).

### Transform
- The score data was converted into a DataFrame which contained 272 rows (one for each game in the season). Unnecessary columns were dropped from the dataset.
- The stadium data (50 rows) was merged into the score data using the "Stadium ID" field. This allowed us to get stadium information for each game played.
- The team data (52 rows) was then merged into the new DataFrame using the "HomeTeam" field. This allowed us to get different hometeam stats for each game played.

### Load
- The final dataset was loaded into MongoDB using pymongo:

    ```season_data.insert_many(nflDataFinalDF.to_dict('records'))```





