# Project 3: The Calm Before the Score
<img src="Image%20Resources/giphy.gif" width=100% height=10%>
Group Name - Third and Long

<hr>

## Table of Contents

* [Project Description](#project-description)
* [PART 1: ETL](#part-1-etl-the-data)

## **Project Description**
xxxxxxx (will fill this out later with the "story" once we are done with the website)

## **Part 1**: ETL the Data

### Extract
For this project, we used the sportsdata [API](https://sportsdata.io/nfl-api), which provides real-time data for every NFL game. We used a [Jupyter Notebook](NFL%20Dashboard.ipynb) to make 3 different calls to the API to get 2021 score [data](https://api.sportsdata.io/v3/nfl/scores/json/Scores/2021?key=ec966d78fab6468eaa542e1e7e883a44), stadium [data](https://api.sportsdata.io/v3/nfl/scores/json/Stadiums?key=ec966d78fab6468eaa542e1e7e883a44) and 2021 team [data](https://api.sportsdata.io/v3/nfl/scores/json/Teams/2021?key=ec966d78fab6468eaa542e1e7e883a44).

### Transform
- The score data was converted into a DataFrame which contained 272 rows (one for each game in the season). Unnecessary columns were dropped from the dataset.
- The stadium data (50 rows) was merged into the score data using the "Stadium ID" field. This allowed us to get stadium information for each game played.
- The team data (52 rows) was then merged into the new DataFrame using the "HomeTeam" field. This allowed us to get different hometeam stats for each game played.
- 
### Load
The final dataset was loaded into MongoDB using pymongo:

```season_data.insert_many(nflDataFinalDF.to_dict('records'))```





